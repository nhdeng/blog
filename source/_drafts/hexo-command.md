---
title: hexo-command
tags: ["hexo"]
---

### 基本命令

```bash
# 生成静态文件
hexo g 
# 启动本地服务
hexo s
# 提交到gitee
hexo d
# 清除缓存
hexo clean

# 通过模板生成文章
hexo new page --path "redis/base"

# 创建草稿
hexo new draft <filename>

# 本机预览草稿
hexo S --draft

# 草稿发布为正式文章
hexo P <filename>
```