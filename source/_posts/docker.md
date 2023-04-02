---
title: 前端开发者应该掌握的docker知识
date: 2023-03-03 17:01:39
tags: ['web','docker']
excerpt: 身为前端开发者的我们应该怎样理解、掌握docker？
---
身为前端开发者的我们应该怎样理解、掌握docker？
### docker的基本组成
Docker平台架构图解：docker的基本组成包含镜像（image）、容器（container）、仓库（respository）。![平台架构图-基础版](/images/docker/composition.png)
#### 镜像（image）
Docker 镜像（Image）就是一个只读的模板。镜像可以用来创建 Docker 容器，一个镜像可以创建很多容器。
它也相当于是一个root文件系统。比如官方镜像 centos:7 就包含了完整的一套 centos:7 最小系统的 root 文件系统。 相当于容器的“源代码”
#### 容器（container）
Docker 利用容器（Container）独立运行的一个或一组应用，应用程序或服务运行在容器里面，容器就类似于一个虚拟化的运行环境，容器是用镜像创建的运行实例。就像是Java中的类和实例对象一样，镜像是静态的定义，容器是镜像运行时的实体。容器为镜像提供了一个标准的和隔离的运行环境，它可以被启动、开始、停止、删除。每个容器都是相互隔离的、保证安全的平台.
#### 仓库（respository）
仓库（Repository）是集中存放镜像文件的场所。

### 下载
1.[官网地址](https://www.docker.com/)
2.[仓库地址](https://hub.docker.com/)

### 基本命令
1. 启动docker
```bash
systemctl start docker
```
2. 停止docker
```bash
systemctl stop docker
```
3. 重启docker
```bash
systemctl restart docker
```
4. 查看docker状态
```bash
systemctl status docker
```
5. 开机启动
```bash
systemctl enable docker
```
6. 查看docker概要信息
```bash
docker info
```
7. 帮助命令
```bash
# 查看总体帮助
docker help
# 查看具体命令帮助
docker 命令 --help
```
### 镜像常用命令
1. 查看本地镜像
```bash
docker images [options]

options:
-a 列出本地所有镜像
-q 只显示镜像ID
```
2. 查找镜像
```bash
docker search [options] 镜像名称

options:
--limit N 列出n个
```
3. 拉取镜像
```bash
# 不带tag默认拉取最新的镜像等同于:latest
docker pull 镜像名称[:tag] 
```
4. 查看镜像/容器/数据卷所占的空间
```bash
# 不带tag默认拉取最新的镜像等同于:latest
docker system df
```
5. 镜像删除
```bash
# 删除某个镜像
docker rmi -f 镜像ID

# 删除多个镜像
docker rmi -f 镜像名1:tag 镜像名2:tag

# 删除全部
docker rmi -f ${docker images -qa}
```
6. 提交容器副本使之成为新的镜像
```bash
docker commit -m=描述信息 -a=作者 容器ID 要创建的目标镜像名:[标签名]
```
7. 将指定镜像保存成 tar 归档文件
```bash
docker save [OPTIONS] IMAGE [IMAGE...]

OPTIONS：
-o :输出到的文件
```
8. 导入使用 docker save 命令导出的镜像
```bash
docker load [OPTIONS]
举例 docker load < 镜像文件名

OPTIONS：
--input , -i : 指定导入的文件，代替 STDIN
--quiet , -q : 精简输出信息
```
### 容器常用命令
1. 新建/启动容器
```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...] 

OPTIONS:有些是一个减号有些是两个减号
--name="容器新名字" 为容器指定一个名称
-d: 后台运行容器并返回容器ID也即启动守护式容器(后台运行)
-i：以交互模式运行容器，通常与 -t 同时使用
-t：为容器重新分配一个伪输入终端，通常与 -i 同时使用，也即启动交互式容器(前台有伪终端，等待交互)
-P: 随机端口映射，大写P
-p: 指定端口映射，小写p
```
![container-options](/images/docker/container-options.png)
2. 列出当前正在运行的容器
```bash
docker ps [OPTIONS]

OPTIONS:
-a :列出当前所有正在运行的容器+历史上运行过的
-l :显示最近创建的容器
-n :显示最近n个创建的容器
-q :静默模式，只显示容器编号
```
3. 退出容器
```bash
exit run进入exit退出 容器停止
ctrl+p+q run进入ctrl+p+q退出 容器不停止
```
4. 启动已停止运行的容器
```bash
docker start 容器ID/容器name
```
5. 重启容器
```bash
docker restart 容器ID/容器name
```
6. 停止容器
```bash
docker stop 容器ID/容器name
```
7. 强制停止容器
```bash
docker kill 容器ID/容器name
```
8. 删除已停止的容器
```bash
docker rm 容器ID/容器name
```
9. 启动守护式容器（后台服务器）
```bash
docker run -it -d 容器ID
```
10. 查看容器日志
```bash
docker logs 容器ID
#跟踪查看最近100条日志
docker logs -f -n100
```
11. 查看容器内运行的进程
```bash
docker top 容器ID
```
12. 查看容器内部细节
```bash
docker inspect 容器ID
```
13. 进入正在运行的容器并以命令行交互
```bash
docker exec -it 容器ID /bin/bash
```
14. 从容器内拷贝文件到主机上
```bash
docker cp 容器id:容器内路径 宿主机路径
```

15. 常用命令总结
![container-command](/images/docker/container-command.png)
```bash
attach    # 当前 shell 下 attach 连接指定运行镜像

build     # 通过 Dockerfile 定制镜像

commit    # 提交当前容器为新的镜像

cp        #从容器中拷贝指定文件或者目录到宿主机中

create    # 创建一个新的容器，同 run，但不启动容器

diff      # 查看 docker 容器变化

events    # 从 docker 服务获取容器实时事件

exec      # 在已存在的容器上运行命令

export    # 导出容器的内容流作为一个 tar 归档文件[对应 import ]

history   # 展示一个镜像形成历史

images    # 列出系统当前镜像

import    # 从tar包中的内容创建一个新的文件系统映像[对应export]

info      # 显示系统相关信息

inspect   # 查看容器详细信息

kill      # kill 指定 docker 容器

load      # 从一个 tar 包中加载一个镜像[对应 save]

login     # 注册或者登陆一个 docker 源服务器

logout    # 从当前 Docker registry 退出

logs      # 输出当前容器日志信息

port      # 查看映射端口对应的容器内部源端口

pause     # 暂停容器

ps        # 列出容器列表

pull      # 从docker镜像源服务器拉取指定镜像或者库镜像

push      # 推送指定镜像或者库镜像至docker源服务器

restart   # 重启运行的容器

rm        # 移除一个或者多个容器

rmi       # 移除一个或多个镜像[无容器使用该镜像才可删除，否则需删除相关容器才可继续或 -f 强制删除]

run       # 创建一个新的容器并运行一个命令

save      # 保存一个镜像为一个 tar 包[对应 load]

search    # 在 docker hub 中搜索镜像

start     # 启动容器

stop      # 停止容器

tag       # 给源中镜像打标签

top       # 查看容器中运行的进程信息

unpause   # 取消暂停容器

version   # 查看 docker 版本号

wait      # 截取容器停止时的退出状态值
```

### 容器数据卷
将docker容器中的数据保存到宿主机的磁盘中
```bash
# 一定要带上--privileged=true不然没有权限
docker run -it --privileged=true -v /宿主机绝对路径目录:/容器内目录 镜像名
```

### DockerFile
Dockerfile是用来构建Docker镜像的文本文件，是由一条条构建镜像所需的指令和参数构成的脚本。
#### DockerFile基础说明
- 每条保留字指令都必须为大写字母且后面要跟随至少一个参数
- 指令按照顺序，从上到下顺序执行
- #表示注释
- 每条指令都会创建一个新的镜像层并对镜像进行提交

#### docker执行DockerFile流程
1. docker从基础镜像运行一个容器
2. 执行一条指令并对容器进行修改
3. 执行类似docker commit的操作提交一个新的镜像层
4. docker再基于刚提交的镜像运行一个新容器
5. 执行docker中的下一条指令直至所有指令完成

#### 常用保留字指令
1. FROM： 基础镜像
2. MAINTAINER： 镜像维护者姓名和邮箱
3. RUN： docker build时需要运行的命令
4. EXPOSE：当前容器对外暴露的端口
5. WORKDIR：指定在创建容器后，终端默认登录进来的工作目录，一个落脚点
6. USER：指定容器以什么样的用户去执行，默认root
7. ENV：用来在构建镜像过程中设置环境变量
8. ADD：将宿主机目录下的文件拷贝进镜像且会自动处理URL和解压tar压缩包
9. COPY：类似ADD拷贝文件和目录到镜像中
10. VOLUME：容器数据卷用于保存数据和数据持久化
11. CMD：指定容器启动后要干的事情
12. ENTRYPOINT：用来指定一个容器启动时要运行的命令，类似于 CMD 指令，但是ENTRYPOINT不会被docker run后面的命令覆盖，而且这些命令行参数会被当作参数送给 ENTRYPOINT 指令指定的程序
![](/images/docker/dockerfile.png)