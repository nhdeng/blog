# Blog

基于[astro](https://astro.build/)、[react](https://react.docschina.org/)开发的简易版博客系统。

## 🚀 功能

- [x] 🚀 博客静态页面
- [x] 🚀 页面逻辑及数据填充
- [ ] 🚀 根据系统主题自动切换主题
- [ ] 🚀 文章搜索
- [ ] 🚀 国际化语言
- [ ] 🚀 自适应
- [ ] 🚀 部署文档

## 🧞 预览

博客系统中当前只有 6 个页面，分别为首页，文章列表页，文章详情页，标签列表，标签下的文章以及关于页面，预览效果参考下图：

#### 首页

![首页](/public/images/index.jpg)

#### 博客页

![首页](/public/images/blog.jpg)

#### 博客详情页

![首页](/public/images/blog-detail.jpg)

#### 标签页

![首页](/public/images/tag.jpg)

#### 标签列表

![标签列表](/public/images/tag-list.jpg)

#### 关于

![关于](/public/images/about.jpg)

## 🧞 运行

运行之前需要安装[node v17.x](https://nodejs.org/en/)，根目录运行终端命令

```bash
# 安装pnpm
npm install -g pnpm

# 安装依赖
pnpm i

# 本地运行 localhost:3000
pnpm dev

# 构建生成包 ./dist/
pnpm build
```

## 🚀 项目结构

在 Astro 项目中，您将看到以下文件夹和文件：

```bash
/
├── public/                       #静态资源文件
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Header.astro
│   │   └── Footer.astro
│   │   └── ui/                   #业务组件
│   ├── config/                   #配置（菜单、标题）
│   ├── layouts/
│   │   └── Layout.astro          #Layout布局
│   ├── content/                  #放置markdown内容
│   └── pages/
│       └── index.astro
└── package.json
```

- 在`src/pages/`下的每一个`.astro` 或 `.md`后缀的文件都可以作为项目的路由。
- 在`src/components/`中放置 `React` 或 `.astro` 相关组件。
- 在`src/content/`中放置 `markdown`内容，放置在`/src/content/blog`中的内容会被识别为博客文章，自动在博客列表中展示。
- 所有静态文件放置 `public/`目录中

## 🚀 MarkDown 属性说明

Astro 为 Markdown 页面提供了一个特殊的前言属性

```markdown
---
title: "测试demo文件"                             //标题
desc: "测试demo文件测试demo文件测试demo文件"       //简述
isDraft: false                                   //是否为草稿
sortOrder: 1                                     //排序
tags: ["web"]                                    //标签
publishDate: "2023-02-15 19:20"                  //发布时间
author: "dengnanhao"                             //作者
authorContact: "dengnanhao@163.com"              //邮箱
image: { alt: "cover", src: "/images/demo.png" } //封面图
---

# 测试 demo 文件

- hello
- markdown
- demo
```

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
