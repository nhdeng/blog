# 基于 Vite 构建 React npm 包

## 前言

本文主要记录自己使用 vite 开发 react npm 包的全过程，便于自己查阅。

## 开发步骤

1. 创建 vite 工程

```bash
# 这里直接使用了react，方便组件开发过程中的调试
pnpm create vite project-name --template react-ts
```

2. 工程目录修改

- 直接将`src`目录改为`example`目录，新建 packages 目录，在 packages 目录下编写自己的组件，将`index.html`中`script`引入 js 代码更改为

```javascript
<script type="module" src="/example/main.tsx"></script>
```

3. 修改 vite 配置文件，详情参考 vite[库模式](https://cn.vitejs.dev/guide/build.html#library-mode)

```typescript
// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "packages/index.ts"),
      name: "MyLib",
      // the proper extensions will be added
      fileName: "my-lib",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["react", "react-dom"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: "React",
          "react-dom": "ReactDom",
        },
      },
    },
  },
});
```

4. 配置`vite-plugin-libcss`插件，解决 css 样式引入问题
5. 由于 vite 本身不会生成类型声明文件，需要配置`vite-plugin-dts`在构建时自动生成 ps: vite-plugin-dts 默认生成的类型文件会用 src 目录包裹起来，想要生成的位置在 dist 文件夹同级，可做以下配置：

```typescript
dts({
  beforeWriteFile: (filePath, content) => ({
    filePath: filePath.replace(/src/, ""),
    content,
  }),
});
```

6. 修改`package.json`文件

```json
{
  "files": ["dist"], // npm包作为依赖安装时要包括的文件
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "main": "./dist/image-label.umd.js", //npm包作为依赖安装时要包括的文件
  "module": "./dist/image-label.es.js", //es module 模式入口文件
  "./dist/style.css": "./dist/style.css", // css文件
  "exports": {
    ".": {
      "import": "./dist/image-label.es.js",
      "require": "./dist/image-label.umd.js"
    }
  }
}
```

## 上传 npm 仓库

1. 注册 npm 账户，参考[npm](https://docs.npmjs.com/)文档
2. 终端运行`npm login`登录
3. `npm publish`发布
