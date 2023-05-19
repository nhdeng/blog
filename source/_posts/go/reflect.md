---
title: go仿射
date: 2023-05-17 14:16:26
tags: ["go", "reflect"]
excerpt: 在 Go 中，可以使用 reflect 包来实现反射。reflect 提供了一组函数和类型，可以在运行时获取对象的类型信息、字段值、调用方法等。
---
## reflect
在**运行时**动态获取或设置变量的各种信息，比如变量的类型（type），类别（kind），值（value）

## 典型方法
- reflect.TypeOf(变量)：专门用来处理类型，用于获取给定值的类型信息
- reflect.ValueOf(变量)：专门用来处理值，用于获取给定值的反射值对象
- t.NumField()：用来获取结构体（不能是结构体指针）的属性的个数
- t.ELem()用来获取指针指向的内容
- t.Kind()：用来获取变量的类型是int/string/array/func/ptr/struct
- t.Set(变量)：给仿射对象设置值

## 示例
1. 仿射实体 获取仿射struct所有属性
```golang
type User struct {
	UserId   int  
	UserName string
}

u := Object.User{}
t := reflect.TypeOf(u)
for i:= 0; i < t.NumField(); i ++ {
    fmt.Println(t.Field(i).Name, t.Field(i).Type)
} 
```
2. 仿射指针 获取仿射struct所有属性
```golang
type User struct {
    UserId int 
    Username string
}
u := &User{}
t := reflect.TypeOf(u)
// 使用Kind()方法判断当前变量是否为指针
if t.Kind() == reflect.Ptr {
    // 如果是指针使用Elem()方法获取当前指针指向的内容  
    t = t.Elem()
}
for i := 0; i < t.NumField(); i++ {
    fmt.Println(t.Field(i).Name, t.Field(i).Type)    
}
```
3. 将切片映射为struct
```golang
type User struct {
    UserId int
    Username string
}
values := []interface{}{1, "dengnanhao"}
u := &User{}
t := reflect.TypeOf(u)
t = t.Elem()
for i:=0; i<t.NumField();i++ {
    if t.Field(i).Kind() == reflect.ValueOf(values[i]).Kind() {
        t.Field(i).Set(reflect.ValueOf(values[i]))
    }
}
```
4. 将map映射为struct
```golang
type User struct {
    UserId int 
    Username string
    Age1 int `name:"age"`
}

m := map[string]interface{}{
    Id: 1,
    UserId: 10,
    Username: "dengnanhao",
    Age: "20"
}
// 将map转化为struct
func Map2Struct(m map[string]interface{}, u interface{}) {
    u1 := reflec.ValueOf(u)
    // 判断u是否为指针
    if u1.Kind() == reflect.Ptr {
        u1 := u1.Elem()
        // 判断u是否为结构体
        if u1.Kind() == reflect.Struct {
            findFromMap := func(key string, tag string) interface{} {
                for k, v := range map {
                    if k == key || key == tag {
                        return v
                    }
                }
                return nil
            }
            for i:=0; i < u1.NumField(); i ++ {
                // 将ValueOf与TypeOf进行转换
                // map的key匹配结构体的属性或者name标签，任意一个匹配上就进行返回，主要匹配属性
                val := findFromMap(u1.Type().Field(i).Name, u1.Type().Field(i).Tag.Get("name"))
                if val != nil && reflect.ValueOf(val).Kind() == u1.Field(i).Kind() {
                    u1.Field(i).Set(reflect.ValueOf(val))
                }
            }
        } else {
            panic("u must struce")
        }
    } else {
        panic("u must pointer")
    }
}

```