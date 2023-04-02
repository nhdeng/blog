---
title: go高并发模式之管道模式
date: 2023-03-30 07:48:00
tags: ["go", "pipe", "channel"]
excerpt: go语言精髓之一就是高度支持并发性，以下就是结合设计模式的管道模式演绎下golang的高并发场景处理。
---

### 什么是管道模式？
白话解释就是前面每一个进程的输出（stdout)直接作为下一个进程的输入（stdin）。
```bash
#Linux命令举例
cat log.txt | grep "hello" | head xx
```

### go当中的管道模式形式
举例：

从一个数字切片中选出偶数，乘以2，再乘以5，最后输出，假设这个举例分为三步操作流程如下所示：

![流程图](/images/go/pipe/pipe1.png)

使用go编写类似于管道的形式的代码大概如下所示：
```golang
import "fmt"

// Events 找出偶数
func Events(input []int) []int {
    out := make([]int, 0)
    for i := 0; i < len(input); i++ {
        if input[i]%2 == 0 {
        out = append(out, input[i])
    }
    return out
}

// M2 数字乘2
func M2(input []int) []int {
    out := make([]int, 0)
    for i := 0; i < len(input); i++ {
        out = append(out, input[i]*2)
    }
    return out
}

// M5 数字乘5
func M5(input []int) []int {
    out := make([]int, 0)
    for i := 0; i < len(input); i++ {
        out = append(out, input[i]*5)
    }
    return out
}

// Cmd 定义管道函数的参数类型
type Cmd func(list []int) (ret []int)

// Pipe 管道函数
func Pipe(nums []int, f1 Cmd, f2 Cmd, f3 Cmd) []int {
    return f3(f2(f1(nums)))
}

// Test 示例调用管道函数
func Test() {
    nums := []int{1, 2, 3, 4, 6, 8, 9, 11, 32}
    res := Pipe(nums, Events, M2, M5)
    for _, val := range res {
        fmt.Printf("%d ", val)
    }
}
```
上述代码执行起来肯定没有问题，但是会一步一步进行执行：先找出所有偶数，再将所有偶数乘以2，最后将所有偶数乘以5；

### 使用channel优化
加入golang的channel使管道”流畅“（以channel的方式进行优化，不会造成堵塞），步骤一”找出偶数“每找出一个，就进入管道进入下一步”乘以2“的流程，而无需等到找出所有的偶数之后才进入下一步，如下图所示：

![加入chan的流程图](/images/go/pipe/pipe2.png)

约定：凡是支持管道模式的函数，其参数必须是channel，返回也是channel。
```golang
import (
    "fmt"
    "sync"
    "time"
)

// Events 从切片中找出偶数
func Events(input []int) chan int {
    ch := make(chan int)
    go func() {
        defer close(ch)
        for i := 0; i < len(input); i++ {
            if input[i]%2 == 0 {
                ch <- input[i]
            }
        }
    }()
    return ch
}

// M2 将偶数乘以2
func M2(input chan int) chan int {
    ch := make(chan int)
    go func() {
        defer close(ch)
        for i := range input {
            time.Sleep(time.Second * 2)
            ch <- i * 2
        }
    }()
    return ch
}
// M5 将偶数乘以5
func M5(input chan int) chan int {
    ch := make(chan int)
    go func() {
        defer close(ch)
        for i := range input {
            time.Sleep(time.Second * 2)
            ch <- i * 5
        }
    }()
    return ch
}

type Cmd func([]int) chan int
// PipeCmd 定义管道函数的参数类型
type PipeCmd func(ch chan int) (ret chan int)

// Pipe 管道函数
func Pipe(nums []int, f1 Cmd, f2 PipeCmd, f3 PipeCmd) chan int {
    return f3(f2(f1(nums)))
}

// Test 示例调用管道函数
func Test() {
    nums := []int{1, 2, 3, 4, 6, 8, 9, 11, 32}
    wg := sync.WaitGroup{}
    res := Pipe(nums, Events, M2, M5)
    for v := range res {
        wg.Add(1)
        go func() {
            defer wg.Done()
            fmt.Printf("%d ", v)
        }()
    }
    wg.Wait()
}

```

### 管道模式之多路复用
白话文解释：多个函数同时从同一个channel里读取数据，直到channel被关闭，假设”找出偶数“时间比较短，”偶数乘以2“这一步的处理流程时间比较长，可以考虑多开几个”偶数乘以2“的处理流程，则可以更好的利用多核。如下图所示：

![多路复用流程图](/images/go/pipe/pipe3.png)

```golang
import (
	"fmt"
	"sync"
	"time"
)

// Events 从切片中找出偶数
func Events(input []int) chan int {
	ch := make(chan int)
	go func() {
		defer close(ch)
		for i := 0; i < len(input); i++ {
			if input[i]%2 == 0 {
				ch <- input[i]
			}
		}
	}()
	return ch
}

// M2 将偶数乘以2
func M2(input chan int) chan int {
	ch := make(chan int)
	go func() {
		defer close(ch)
		for i := range input {
			time.Sleep(time.Second * 2)
			ch <- i * 2
		}
	}()
	return ch
}

type Cmd func([]int) chan int
type PipeCmd func(ch chan int) (ret chan int)

// Pipe 管道函数
func Pipe(nums []int, f1 Cmd, ps ...PipeCmd) chan int {
	wg := sync.WaitGroup{}
	evench := f1(nums) // 找偶数
	out := make(chan int)
	for _, p := range ps {
		getChan := p(evench)
		wg.Add(1)
		go func(ch chan int) {
			defer wg.Done()
			for c := range ch {
				out <- c
			}
		}(getChan)
	}
	go func() {
		defer close(out)
		wg.Wait()
	}()
	return out
}
// Test 示例调用管道函数
func Test() {
    nums := []int{1, 2, 3, 4, 6, 8, 9, 11, 32}
	res := Pipe(nums, Events, M2, M2)
	for v := range res {
		fmt.Printf("%d ", v)
	}
}

```

完整代码查看：https://github.com/nhdeng/gopipe