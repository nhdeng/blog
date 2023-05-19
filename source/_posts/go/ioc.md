---
title: go实现IoC容器
tags:
  - go
  - ioc
  - 控制反转
  - 依赖注入
  - reflect
excerpt: 使用go写一个简单好用IoC容器的方法，主要演示的是思路及封装
date: 2023-05-19 14:00:18
---

## IoC
控制反转（Inversion of Control，IoC）是一种软件设计原则，用于实现松耦合的组件之间的交互。它的核心思想是将控制权从调用者转移到外部容器或框架，由容器负责创建和管理对象的生命周期以及它们之间的依赖关系，而不是由调用者直接控制。
所谓的容器在go里面就是map对象或者切片。

## 设计
设计Ioc初步雏形：基于类型的存储。使用map来充当容器key:reflect.Type value:reflect.value

```golang
type BeanMapper map[reflect.Type]reflect.Value
```
1. 容器定义
```golang
package injector

import "reflect"
// 定义容器类型 key使用仿射类型 value使用反射值
type BeanMapper map[reflect.Type]reflect.Value

// 往容器中添加元素
func (this BeanMapper) add(bean interface{}) {
	t := reflect.TypeOf(bean)
	if t.Kind() != reflect.Ptr {
		panic("require ptr object")
	}
	this[t] = reflect.ValueOf(bean)
}

// 获取容器中的bean
func (this BeanMapper) get(bean interface{}) reflect.Value {
	var t reflect.Type
	if bt, ok := bean.(reflect.Type); ok {
		t = bt
	} else {
		t = reflect.TypeOf(bean)
	}
	if value, ok := this[t]; ok {
		return value
	}
	// 处理接口继承（接口方式注入） service主要实现了接口就返回
	// FIXME 容器中如果有多个元素实现了该接口，这里只会返回容器中匹配到的第一个元素
	fmt.Println(t.Kind())
	fmt.Println(t)
	for k, v := range this {
		if t.Kind() == reflect.Interface && k.Implements(t) {
			return v
		}
	}
	return reflect.Value{}
}
```

2. 创建一个BeanFactory文件负责往容器中添加bean、获取bean以及依赖注入
```golang
package injector

import (
	"github.com/shenyisyn/goft-expr/src/expr"
	"log"
	"reflect"
)

var BeanFactory *BeanFactoryImpl

// 引用文件的时候初始化BeanFactory
func init() {
	BeanFactory = NewBeanFactory()
}

type BeanFactoryImpl struct {
	beanMapper BeanMapper
	// 字符串表达式解析
	ExprMap map[string]interface{}
}

// NewBeanFactory 初始化容器BeanMapper对象 初始化字符串表达式映射
func NewBeanFactory() *BeanFactoryImpl {
	return &BeanFactoryImpl{beanMapper: make(BeanMapper), ExprMap: make(map[string]interface{})}
}

func (this *BeanFactoryImpl) Set(beans ...interface{}) {
	if beans == nil || len(beans) == 0 {
		return
	}
	for _, bean := range beans {
		this.beanMapper.add(bean)
	}
}

func (this *BeanFactoryImpl) Get(val interface{}) interface{} {
	if val == nil {
		return nil
	}
	getVal := this.beanMapper.get(val)
	if getVal.IsValid() {
		return getVal.Interface()
	}
	return nil
}
```

2. 处理依赖注入，动态注入bean（BeanFactory.go）
![case](/images/go/ioc/case1.png)
```golang
// Apply 处理依赖注入 根据tag名inject以及元素类型进行注入
func (this *BeanFactoryImpl) Apply(bean interface{}) {
	if bean == nil {
		return
	}
	v := reflect.ValueOf(bean)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}
	if v.Kind() != reflect.Struct {
		return
	}
	for i := 0; i < v.NumField(); i++ {
		field := v.Type().Field(i)
		// 判断bean首字母是否为大写，并且拥有inject标签且不能为空字符
		if v.Field(i).CanSet() && field.Tag.Get("inject") != "" {
			if field.Tag.Get("inject") != "-" {
				// 多例模式
				// 表达式方式注入
				// 字符串表达式解析执行
				log.Println("使用了表达式的方式")
				// expr用来解析执行字符串
				ret := expr.BeanExpr(field.Tag.Get("inject"), this.ExprMap)
				if ret != nil && !ret.IsEmpty() {
					retValue := ret[0]
					if retValue != nil {
						//this.Set(retValue)
						v.Field(i).Set(reflect.ValueOf(retValue))
						// 递归执行依赖注入
						this.Apply(retValue)
					}
				}
			} else {
				// 单例模式
				// 兼容直接Set单个实例对象方式注入，比如Set(NewOrderService())
				if val := this.Get(field.Type); val != nil {
					v.Field(i).Set(reflect.ValueOf(val))
					// 递归执行依赖注入
					this.Apply(val)
				}
			}
		}
	}
}
```
3. 容器初始化
如果容器初始化bean很多，使用set方法创建bean，手动写很麻烦，如何优雅进行容器bean的加载？使用一个ConfigService.go文件用来配置所有的bean，再解析这个文件的方法，具体看如下的代码
![case](/images/go/ioc/case2.png)
```golang
package config

import "go-ioc/src/services"

type ServiceConfig struct {
}

func NewServiceConfig() *ServiceConfig {
	return &ServiceConfig{}
}

func (this *ServiceConfig) OrderService() *services.OrderService {
	return services.NewOrderService()
}
func (this *ServiceConfig) DBService() *services.DBService {
	return services.NewDBService()
}
```

加载ConfigService.go文件，容器加载所有config文件中配置的bean

```golang
func (this *BeanFactoryImpl) Config(cfgs ...interface{}) {
	for _, cfg := range cfgs {
		t := reflect.TypeOf(cfg)
		if t.Kind() != reflect.Ptr {
			panic("require ptr object")
		}
		this.Set(cfg)                       // config本身加入容器
		this.ExprMap[t.Elem().Name()] = cfg // 自动构建ExprMap

		v := reflect.ValueOf(cfg)
		for i := 0; i < v.NumMethod(); i++ {
			method := v.Method(i)
			callRet := method.Call(nil)
			if callRet != nil && len(callRet) == 1 {
				this.Set(callRet[0].Interface())
			}
		}
	}
}
```