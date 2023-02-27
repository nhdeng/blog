# Blog

## 效果展示

![basics](https://user-images.githubusercontent.com/4677417/186188965-73453154-fdec-4d6b-9c34-cb35c248ae5b.png)

## 🧞 运行

根目录运行终端命令

```bash
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
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

- 在`src/pages/`下的每一个`.astro` 或 `.md`后缀的文件都可以作为项目的路由

- 在`src/components/`中放置 `React` 或 `.astro` 相关组件

- 所有静态文件防止 `public/`目录中

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
