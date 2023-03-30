---
title: fork之后的仓库如何同步源仓库的最新代码
date: 2023-03-10 09:38:28
tags: ["git", "fork"]
excerpt: git fork仓库之后， 源仓库代码进行了更新 fork后的仓库如何同步源仓库代码呢？
---
fork之后的仓库如何同步源仓库的最新代码

1. 首先进入项目根目录运行`git remote -v`查看本地仓库的远程路径。
2. 添加源仓库（上游仓库）的远程路径,命令格式`git remote add upstream ADDR`
```git 
git remote add upstream https://gitlab.hddata.cn/T-Series/Web/gw-web-react.git
```
3. 查看源仓库（上游仓库）是否关联成功`git remote -v`。
![git remote -v](/images/git/fork-remote.png)
4. `git status`查看本事是否有代码没有commit，若有改动及时commit或者回滚。
5. 执行`git fetch upstream`抓取源仓库（上游仓库）的最新代码。
6. 执行`git merge upstream/master`命令合并master分支的代码。
