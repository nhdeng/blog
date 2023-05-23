---
title: grpc
tags: ["go", "grpc"]
---
## Protobuf
- Protocol Buffers（简称为 Protobuf）是一种语言无关、平台无关、可扩展的数据序列化格式，由 Google 开发并开源。它可以用于结构化数据的序列化和反序列化，用于数据存储、通信协议等领域。
- Protobuf 使用 .proto 文件定义数据结构，然后使用特定的编译器将这些 .proto 文件编译成相应语言的源代码，从而在程序中使用生成的代码来进行数据的序列化和反序列化。它支持多种编程语言，包括但不限于 C++, Java, Python, Go, JavaScript 等。
- Protobuf 的设计目标是高效、简单、可扩展。它采用二进制编码格式，相比于其他文本格式（如 JSON、XML），序列化后的数据更加紧凑，传输效率更高。同时，Protobuf 支持定义复杂的数据结构，包括嵌套类型、枚举类型、默认值等，使得数据的描述更加灵活和丰富。
- 使用 Protobuf 的好处包括：
1. 代码生成：根据 .proto 文件生成代码，简化数据的序列化和反序列化操作，提高开发效率。
2. 紧凑的数据表示：相比文本格式，序列化后的数据更小，传输效率更高。
3. 跨平台、跨语言支持：支持多种编程语言，使得不同平台和语言之间的数据交换更加方便。
4. 可扩展性：支持版本升级和向后兼容，可以在不破坏现有数据的情况下进行结构的扩展和修改。

总结来说，Protobuf 是一种高效、简单、可扩展的数据序列化格式，适用于多种领域，包括网络通信、数据存储、RPC（远程过程调用）等。它提供了强大的数据描述能力和跨平台、跨语言的支持，是一种优秀的数据交换格式。


## 将`Protobuf`（.proto）转化为`go文件`（.go）
### protobuf环境搭建

1. **protoc**

protoc 是 Protocol Buffers（简称 Protobuf）的编译器命令行工具。[protoc下载地址](https://github.com/protocolbuffers/protobuf/releases)，下载解压完成之后将可执行文件加入系统的环境变量中。

2. **安装protobuf库**
```bash
go get github.com/golang/protobuf/proto@v1.5.3
```

3. **安装protoc-gen-go插件**
```bash
# go get 用于获取第三方包或模块并安装依赖项，go install 用于构建并安装指定包或模块的可执行文件或库。
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
```

4. 代码演示
- 项目目录
```bash
# go-grpc
├── protos                                  # protobuf
│   ├── models.proto                        # 模型
├── src
│   ├── pbfiles                             # 存放protobuf转化为go的文件
├── go.mod                                 
├── proto.bat                               # 命令文件
└── main.go                            
```
- 使用protobuf定义商品类型
```golang
# models.proto
syntax = "proto3";

option go_package = "go-grpc/src/pbfiles";

message ProdModel {
    int32 id = 1; // 商品ID
    string name = 2; // 商品名称
}
```
- 执行protoc命令
```bash
protoc --proto_path=protos --go_out=./../ models.proto
```
执行结束会在`src/pbfiles`下生成一个`models.pb.go`文件

```golang
# 在golang中使用models.pb.go
func main() {
	prod := &pbfiles.ProdModel{Id: 2, Name: "dengnanhao2"}
	b, _ := proto.Marshal(prod)
	fmt.Println(prod)
	prod2 := &pbfiles.ProdModel{}
	proto.Unmarshal(b, prod2)
	fmt.Println(prod2)
}

```

## rpc
- RPC（Remote Procedure Call）是一种通信协议，用于不同计算机之间的远程调用。它允许程序在网络上的不同节点之间相互通信，使得远程节点的程序能够像调用本地函数一样调用远程节点的函数或方法。
- RPC 的基本原理是客户端调用远程服务器上的函数，就像调用本地函数一样，而不需要关心网络通信的细节。客户端通过发送请求到服务器，并等待服务器的响应来完成远程调用。RPC 可以在不同的编程语言和不同的操作系统之间进行通信，使得分布式系统的构建和开发变得更加容易。
- RPC 的设计目标是提供一种简单、高效和统一的方法来实现远程调用。它通常使用了一些序列化协议来将函数参数和返回值进行编码和解码，以便在网络上传输。常见的 RPC 框架包括 gRPC、Thrift、Apache Dubbo 等，它们提供了一系列的工具和库来简化 RPC 的开发和集成。
- 通过使用 RPC，开发者可以将分布式系统中的各个组件连接起来，实现跨网络的函数调用，从而构建出更加灵活、可扩展和可维护的应用程序。RPC 在微服务架构、分布式计算和分布式系统中扮演着重要的角色，帮助开发者构建高效的分布式应用。

## grpc
- gRPC 是一种高性能、跨语言、跨平台的 RPC 框架，通过使用 Protobuf 进行接口定义和数据序列化，提供了简单易用的 API 和强大的功能，适用于构建分布式系统、微服务架构和高性能的客户端-服务器通信。
- gRPC 的主要特点和优势包括：
1. 高性能：gRPC 使用基于二进制的 Protobuf 进行数据序列化和传输，相比基于文本的传输格式（如 JSON、XML），传输效率更高，性能更好。
2. 多语言支持：gRPC 支持多种编程语言，包括 C++, Java, Go, Python, JavaScript 等，使得不同语言的服务可以相互调用，方便构建跨平台、跨语言的分布式系统。
3. 强大的IDL：通过 Protobuf 定义接口和消息类型，提供了强类型的接口定义和数据结构，使得接口和数据的描述更加清晰和灵活。
4. 支持流式通信：gRPC 支持基于流的请求和响应，使得客户端和服务器之间可以实现双向流式通信，适用于实时数据传输、长连接等场景。
5. 可插拔的拦截器：gRPC 提供拦截器机制，可以在请求和响应的不同阶段进行自定义操作，如认证、日志记录、流量控制等。
6. 支持多种传输协议：gRPC 默认使用 HTTP/2 作为底层传输协议，提供了高效的、多路复用的、双向通信的传输能力。同时也支持使用其他的传输协议，如 gRPC-Web 用于浏览器环境下的通信。

### grpc环境搭建
1. 安装`grpc`库
```bash
go get google.golang.org/grpc@v1.37
```
2. 安装`protoc-gen-go-grpc`库
```bash
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc
```
3. 生成代码
```bash
protoc --proto_path=protos --go-grpc_out=./../ service.proto
```