---
title: 从零搭建gitlab ci/cd流水线
date: 2023-07-15 09:24:14
tags: ["ci", "cd", "gitlab"]
excerpt: 打通开发、测试、运维的壁垒，实现开发、测试、运维一体化
---

# 从零搭建gitlab ci/cd流水线

## 环境准备

1. [ubuntu-20.04](https://www.releases.ubuntu.com/jammy/) 
2. [docker容器](https://zhuanlan.zhihu.com/p/632732853) 

## 部署gitlab
1. 拉取社区版镜像
```bash
docker pull gitlab/gitlab-ce
```

2. 在宿主机上创建gitlab数据卷
```bash
# data保存数据 logs保存日志 config保存配置
sudo mkdir -p /gitlab/data /gitlab/logs /gitlab/config
```
3. 创建gitlab实例
```bash
sudo docker run -d --publish 8443:443 --publish 80:80 --publish 2222:22 --hostname 192.168.150.150 --name gitlab-app --privileged=true --restart unless-stopped --volume gitlab/config:/etc/gitlab --volume gitlab/logs:/var/log/gitlab --volume gitlab/data:/var/opt/gitlab -log-driver=none gitlab/gitlab-ce:latest
```
- -d 指定容器以守护进程的形式运行，即后台运行
- --publish 端口映射，将容器的443、80、22端口映射到宿主机的8443、80、2222端口
- --hostname 指定宿主机的ip，如果采用ip访问，则启动后访问地址为"http://192.168.150.150"
- --name 指定镜像的名称
- --privileged=true 以特权模式运行，即容器内的进程拥有主机的root权限
- --restart unless-stopped 指定容器在退出时自动重启，除非容器被手动停止
- --volume 指定挂载目录，将创建的目录挂载到容器的指定位置（宿主机目录:容器目录）
- -log-driver=none： 禁用Docker的日志记录功能。

(1) 由于gitlab的镜像比较大，要启动的服务比较多，因此启动比较耗时，大概需要3分钟左右，在启动过程中，镜像的状态是starting，启动成功后镜像的status是healthy。

(2) 容器启动成功后，直接访问指定的宿主机ip地址 192.168.150.150

(3) gitlab默认账户为root，root的默认密码在/gitlab/config/initial_root_password

## 部署gitlab-runner
1. 拉取镜像
```bash
docker pull gitlab/gitlab-runner:latest
```
2. 创建实例
```
docker run -d --name gitlab-runner --restart always -v /var/run/docker.sock:/var/run/docker.sock gitlab/gitlab-runner:latest
```
- --restart always: 表示容器退出后总是重启。
- -v /var/run/docker.sock:/var/run/docker.sock:将主机的docker.sock文件挂载到容器中，从而使容器可以与宿主机Docker引擎通信，这个配置很关键，因为只有增加了这个配置，gitlab-runner才能将构建产生的容器部署到宿主机，这里可以将gitlab-runner容器视为宿主机的GUI。

3. 注册gitlab-runner
- 注册前需要使用root账户登录gitlab-app创建runner（入口/管理中心/cicd/runner），获取token及url地址
![创建runner](/images/cicd/runner-create.png)
- 进入容器内部，执行gitlab-runner register命令开始注册流程，注册的时候填入token及url和一些runner的描述信息
![注册runner](/images/cicd/runner-register.png)