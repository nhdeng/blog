---
title: Rancher2.x + k8s快速搭建集群环境
date: 2023-06-03 21:46:14
tags: ["k8s", "架构", "集群", "运开"]
excerpt: k8s集群环境搭建
---

# Rancher2.x + k8s快速搭建集群环境
准备三台虚拟机一台master节点一台worker节点一台rancher节点

## 准备工作
1. rancher节点准备工作
```bash
#删除所有容器
docker stop $(docker ps -a -q)
#删除所有容器
docker rm $(docker ps -a -q)

#关闭防火墙
systemctl stop firewalld && systemctl disable firewalld

#关闭 SELinux
setenforce 0
sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config

#关闭swap
swapoff -a

#重启docker
sudo systemctl daemon-reload
sudo systemctl restart docker

#启动rancher2
sudo docker run --privileged -d --restart=unless-stopped -p 80:80 -p 443:443 -v /home/dengnanhao/rancher:/var/lib/rancher  rancher/rancher:stable

#访问rancher服务ip设置密码：rancher123456
```