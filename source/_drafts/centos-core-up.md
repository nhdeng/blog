---
title:  CentOS 的内核升级
tags: ["linux", "centos", "docker"]
---

要将 CentOS 的内核升级，您可以按照以下步骤进行操作：
1. 在进行任何内核升级之前，确保您的系统已经进行了完整的备份，以防出现意外情况。
2. 在 CentOS 7 上，您可以使用 ELRepo 仓库来获取更新的内核版本。ELRepo 是一个社区维护的第三方软件仓库，提供了新的内核版本。
- 首先，安装 ELRepo 仓库的 RPM 包。打开终端并运行以下命令：
```bash
sudo rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
sudo rpm -Uvh https://www.elrepo.org/elrepo-release-7.el7.elrepo.noarch.rpm
```
- 安装新的内核。运行以下命令：
```bash
sudo yum --enablerepo=elrepo-kernel install kernel-ml
```
此命令将安装最新的稳定版内核。如果您想要安装特定版本的内核，可以在命令末尾指定具体的内核版本号，例如 `kernel-ml-4.19.0`
- 配置 GRUB 引导加载程序。运行以下命令：
```bash
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```
此命令将重新生成 GRUB 配置文件，以包含新安装的内核。
- 重启系统。运行以下命令来重启系统：
```bash
sudo reboot
```
系统重启后，GRUB 将显示可用的内核选项。选择新安装的内核并启动系统。
