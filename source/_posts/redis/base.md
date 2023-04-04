---
title: Redis基础-基本数据类型及语法
date: 2023-04-02 14:06:18
tags: ["redis", "string", "list", "hash", "set", "zset"]
excerpt: 本文主要记录自己学习redis的这个过程，包含redis的安装、基础数据类型以及语法，redis更加具体的使用方法请参考redis官网。
---

# Redis基础-基本数据类型及语法
本文主要记录自己学习redis的这个过程，包含redis的安装、基础数据类型以及语法，redis更加具体的使用方法请参考redis官网。

redis官网文档：https://redis.io

redis中文文档：http://www.redis.cn

## docker安装redis
1. 建立宿主机redis容器目录
```bash
mkdir -p /app/redis
```
2. 拷贝redis配置文件redis.conf到/app/redis目录下（redis配置文件官网下载地址：https://redis.io/download/）
```bash
# 修改redis.conf默认配置
# 1. 【必须】允许redis外地连接, 注释掉 # bind 127.0.0.1
# 2. 【必须】将daemonize yes注释起来或者 daemonize no设置，因为该配置和docker run中-d参数冲突，会导致容器一直启动失败
# 3. 【可选】开启redis数据持久化 appendonly yes 
# 4. 【可选】开启redis验证 requirepass 123456
```
3. 创建redis容器实例
```bash
# 拉取redis镜像
docker pull redis

# 运行实例并挂载容器数据卷
docker run -d --name=redis -host --privileged=true -v /app/redis/redis.conf:/etc/redis/redis.conf -v /app/redis/data:/data redis redis-server /etc/redis/redis.conf

# 进入容器实例
docker exec -d redis /bin/bash

# 执行redis-cli
```
## redis键（key）常用命令
1. 查看当前库所有key
```bash
keys *
```
2. 判断某个key是否存在
```bash
exists key
```
3. 查看key类型
```bash
type key
```
3. 删除指定key
```bash
del key
```
4. 非阻塞删除，仅仅将keys从keyspace元数据中删除，真正的删除会在后续异步中操作
```bash
unlink key
```
5. 查看还有多少秒过期，-1表示永不过期，-2表示已过期
```bash
ttl key
```
6. 查看还有多少秒过期，-1表示永不过期，-2表示已过期
```bash
expire key
```

7. 将当前数据库的 key移动到给定的数据库 db 当中
```bash
move key dbIndex # dbIndex默认取证范围0-15
```
7. 切换数据库
```bash
select dbIndex # dbIndex默认取证范围0-15，默认为0
```
8. 查看当前数据局key的数量
```bash
dbsize
```
9. 清空当前库
```bash
flushdb
```
10. 清空所有库
```bash
flushall
```
```bash
# 查看具体数据类型的命令
help @string 
```
**更多命令查看官网：https://redis.io/commands/，**


## redis常用数据类型及命令
redis常用的数据类型有string、list、hash、set、zset至于其他数据类型可以查看官网。
### Redis字符串（String）
String 单值单value
1. 设置字符串
```bash
set key value [NX|XX] [GET] [EX seconds|PX milliseconds|EXAT unix-time-seconds|PXAT unix-time-milliseconds|KEEPTTL]
```
Options说明：
- EX seconds:以秒为单位设置过期时间；
- PX milliseconds:以毫秒为单位设置过期时间；
- EXAT timestamp:设置以秒为单位的Unix时间戳所对应的时间为过期时间；
- PXAT millisecond-timestamp:设置以毫秒为单位的UNIX时间戳所对应的时间为过期时间；
- NX:键不存在时设置键值；
- XX:键存在时设置键值；
- KEEPTTL:保留设置前的指定键的生存时间；
- GET:返回指定键原本的值，若键不存在时返回nil

2. 获取字符串`get key`
3. 同时设置获取多个键值
```bash
MSET key value [key value...]
MGET key [key...]
# 同时设置多个键值对当且仅当所有的key都不存在时
MSETNX key value [key value...]
```
4. 获取指定区间范围内的值
```bash
# 相当于字符串的截取，从0到-1表示全部
GETRANGE name 0 2
SETRANGE name 0 hello
```
5. 数值增减，只能是数字才能进行加减
```bash
# 递增数字
INCR key
# 增加指定的整数
INCRBY key increment
# 递减数字
DECR key
# 减少指定的整数
DECRBY key decrement
```
6. 获取字符串长度和内容增加
```bash
STRLEN key
APPEND key value
```
7. getset(先get再set)
```bash
GETSET key value
```

### Redis 列表（List）
List 单key多value，双端链表的结构，容量是2的32次方减1个元素，大概40多亿，主要功能有push/pop等，一般用在栈、队列、消息队列等场景。left、right都可以插入添加；如果键不存在，创建新的链表；如果键已存在，新增内容；如果值全移除，对应的键也就消失了。

1. 为列表添加值
```bash
LPUSH/RPUSH key value [value...]
```
2. 查看列表指定区间元素
```bash
#0到-1代表查看所有元素
lrange key start top
```
3. 移出并获取列表的第一个元素
```bash
lpop/rpop key 
```
4. 按照索引下标获取元素
```bash
lindex key index 
```
5. 获取列表中元素的个数
```bash
llen key
```
6. 删除N个数值等于xx的元素
```bash
# N为0代表指定值全部删除
lrem key N xx
```
7. 截取指定范围内的值再指定给key
```bash
ltrim key start stop
```
8. 移除列表的最后一个元素并将该元素添加到另一个列表并返回
```bash
rpoplpush 源列表 目标列表
```
9. 通过索引设置列表元素中的值
```bash
lset key index value
```
10. 向列表中插入新值
```bash
linsert key before/after 已有值 新值
```

### Redis 哈希（Hash）
KV模式，V也是一个键值对。Redis hash 是一个 string 类型的 field（字段） 和 value（值） 的映射表，hash 特别适合用于存储对象。Redis 中每个 hash 可以存储 232 - 1 键值对（40多亿）。

1. 基本操作
```bash
hset/hget/hmset/hmget/hgetall/hdel key [field value]
```
2. 获取某个key中的键值对数量
```bash
hlen key
```
3. 查看hash指定字段是否存在
```bash
hexists key field
```
4. 查看hash中所有field或者value
```bash
hkeys/hvals key
```
5. 为hash表中的指定字段整加/浮点加
```bash
hincrby/hincrbyfloat key field value
```
6. 不存在就赋值，存在就无效
```bash
hsetnx key field value
```































