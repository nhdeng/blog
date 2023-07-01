---
title:  Nodejs架构
tags: ["nodejs", "framework"]
excerpt: 了解nodejs的整体架构，才能更好的运用nodejs。笔记主要是介绍nodejs的核心架构组成不包括具体标准库的使用及业务代码。
---

# Nodejs基础架构
![Nodejs三层架构图](/images/node/framework/framework.png)

## Node标准库
Node标准库里面的内容全部是由js实现，主要是为业务程序提供了当前可以直接调用的库，例如：fs、path、http等。

## Node Bindings
Node Bindings(主要由C/C++实现)，是沟通js和C++的桥梁，主要是封装V8引擎和Libuv库的细节向上层提供基础API服务。

举个例子：C/C++ 实现了一个 http_parser 的库，非常高效，但是前端开发人员只会写 JavaScript，直接调用这个库肯定是不能成功的，所以就需要一个中间的桥梁。于是 Node.js 的作者就用 C++ 对 http_parser 库进行封装，使它符合某些要求（比如统一数据类型等），封装的文件叫做 http_parser_bindings.cpp。同时 Node.js 提供的编译工具可以将其编译为.node文件。这样 JavaScript 代码可以直接 require 这个 .node 文件，这样 JavaScript 就能调用 C++ 库。

中间的桥梁就是 binding，由于 Node.js 提供了很多 binding，多个 binding 就构成了 Node 基本架构中的 Node bindings 了。有了这个 Node Bindings 后，JavaScript 和 C++ 就可以进行一些相互调用的操作，进而实现功能上的一些通信。这里有官网提供的示例，便于大家理解 JS 和 C++ 是如何进行通信的：[JS 调用 C++ 代码](https://nodejs.cn/api/addons.html#addons_function_arguments)、[C++ 调用 JS 回调](https://nodejs.cn/api/addons.html#addons_callbacks)。

## 底层
- V8:执行js代码，提供桥梁接口。将js调用的模块功能转化为C/C++所编写的函数，这个转换的过程就是由V8引擎来完成的。
- libuv：是专门为 Node.js 开发的一个封装库，提供跨平台的异步 I/O 能力及事件循环、事件队列。
- C-ares：提供了异步处理 DNS 相关的能力。
- http_parser、OpenSSL、zlib 等：提供包括 http 解析、SSL、数据压缩等其他的能力。

# Nodejs工作流程
![Nodejs工作流程图](/images/node/framework/nodejs_worker.png)