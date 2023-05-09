---
title: Redis基本数据类型及语法
date: 2023-04-02 14:06:18
tags: ["redis", "string", "list", "hash", "set", "zset"]
excerpt: 本文主要记录自己学习redis的这个过程，包含redis的安装、基础数据类型以及语法，redis更加具体的使用方法请参考redis官网。
---

# Redis基础-基本数据类型及语法
本文主要记录自己学习redis的这个过程，包含redis的安装、基础数据类型以及语法，redis更加具体的使用方法请参考redis官网。

redis官网文档：https://redis.io

redis中文文档：http://www.redis.cn

## 一、docker安装redis
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
docker run -d --name=redis --network=host --privileged=true -v /app/redis/redis.conf:/etc/redis/redis.conf -v /app/redis/data:/data redis redis-server /etc/redis/redis.conf

# 进入容器实例
docker exec -d redis /bin/bash

# 执行redis-cli
```
## 二、redis键（key）常用命令
1. 查看当前库所有key
```bash
Keys *
```
2. 判断某个key是否存在
```bash
Exists key
```
3. 查看key类型
```bash
Type key
```
3. 删除指定key
```bash
Del key
```
4. 非阻塞删除，仅仅将keys从keyspace元数据中删除，真正的删除会在后续异步中操作
```bash
Unlink key
```
5. 查看还有多少秒过期，-1表示永不过期，-2表示已过期
```bash
TTL key
```
6. 查看还有多少秒过期，-1表示永不过期，-2表示已过期
```bash
Expire key
```

7. 将当前数据库的 key移动到给定的数据库 db 当中
```bash
Move key dbIndex # dbIndex默认取证范围0-15
```
7. 切换数据库
```bash
Select dbIndex # dbIndex默认取证范围0-15，默认为0
```
8. 查看当前数据局key的数量
```bash
DBSize
```
9. 清空当前库
```bash
FlushDB
```
10. 清空所有库
```bash
FlushAll
```
```bash
# 查看具体数据类型的命令
help @string 
```
**更多命令查看官网：https://redis.io/commands/，**


## 三、redis常用数据类型及命令
redis常用的数据类型有string、list、hash、set、zset至于其他数据类型可以查看官网。
### Redis字符串（String）
String 单值单value
1. 设置字符串
```bash
Set key value [NX|XX] [GET] [EX seconds|PX milliseconds|EXAT unix-time-seconds|PXAT unix-time-milliseconds|KEEPTTL]
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

2. 获取字符串`Get key`
3. 同时设置获取多个键值
```bash
MSet key value [key value...]
MGet key [key...]
# 同时设置多个键值对当且仅当所有的key都不存在时
MSetNX key value [key value...]
```
4. 获取指定区间范围内的值
```bash
# 相当于字符串的截取相当于substr，从0到-1表示全部
GetRange name 0 2
SetRange name 0 hello
```
5. 数值增减，只能是数字才能进行加减
```bash
# 递增数字
Incr key
# 增加指定的整数
IncrBy key increment
# 递减数字
Decr key
# 减少指定的整数
DecrBy key decrement
```
6. 获取字符串长度和内容增加
```bash
StrLen key
Append key value
```
7. getset(先get再set)
```bash
GetSet key value
```

### Redis 列表（List）
List 单key多value，双端链表的结构，容量是2的32次方减1个元素，大概40多亿，主要功能有push/pop等，一般用在栈、队列、消息队列等场景。left、right都可以插入添加；如果键不存在，创建新的链表；如果键已存在，新增内容；如果值全移除，对应的键也就消失了。

1. 为列表添加值
```bash
LPush/RPush key value [value...]
```
2. 查看列表指定区间元素
```bash
#0到-1代表查看所有元素
LRange key start top
```
3. 移出并获取列表的第一个元素
```bash
LPop/RPop key 
```
4. 按照索引下标获取元素
```bash
LIndex key index 
```
5. 获取列表中元素的个数
```bash
LLen key
```
6. 删除N个数值等于xx的元素
```bash
# N为0代表指定值全部删除
LRem key N xx
```
7. 截取指定Key范围内的值再指定给key
```bash
LTrim key start stop
```
8. 移除列表的最后一个元素并将该元素添加到另一个列表并返回
```bash
RPopLPush 源列表 目标列表
```
9. 通过索引设置列表元素中的值
```bash
LSet key index value
```
10. 向列表中插入新值
```bash
LInsert key Before/After 已有值 新值
```

### Redis 哈希（Hash）
KV模式，V也是一个键值对。Redis hash 是一个 string 类型的 field（字段） 和 value（值） 的映射表，hash 特别适合用于存储对象。

1. 基本操作
```bash
HSet/HGet/HMSet/HMGet/HGetAll/HDel key [field value]
```
2. 获取某个key中的键值对数量
```bash
HLen key
```
3. 查看hash指定字段是否存在
```bash
HExists key field
```
4. 查看hash中所有field或者value
```bash
HKeys/HVals key
```
5. 为hash表中的指定字段整加/浮点加
```bash
HIncrBy/HIncrByFloat key field value
```
6. 不存在就赋值，存在就无效
```bash
HSetNX key field value
```
### Redis 集合（Set）
单值多value且value不能重复；Redis 的 Set 是 String 类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。集合对象的编码可以是 intset 或者 hashtable。 Redis 中集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。 集合中最大的成员数为 232 - 1 (4294967295, 每个集合可存储40多亿个成员)。
1. 向集合中添加一个/多个元素
```bash
SAdd key member [member...]
```
2. 遍历集合key中的所有元素
```bash
SMembers key 
```
3. 判断元素是否存在于集合中
```bash
SISMember key value 
```
4. 移除集合中的元素
```bash
SRem key value 
```
5. 获取集合中元素的个数
```bash
SCard key
```
6. 从集合中随机展现N个元素，元素不删除
```bash
SRandMember key N 
```
6. 从集合中随机弹出N个元素，元素删除
```bash
SPop key N 
```
6. 将集合中A中的某个值移入B集合中
```bash
SMove A B Avalue 
```
7. 集合运算
```bash
# A、B集合的差集运算 A-B：只存在于A集合不存在于B集合中的元素
SDiff key [key...]

# A、B集合的并集运算
SUnion key [key...]

# A、B集合的交集运算 属于A、B两个集合中共有的元素组成的集合
SInter key [key...]

# 给定集合的交集产生的集合的基数，N代表key的个数
SInterCard N key [key...]
```

### Redis 有序集合（ZSet）
Redis 有序集合和集合一样也是 string 类型元素的集合,且不允许重复的成员。不同的是每个元素都会关联一个 double 类型的分数。redis 正是通过分数来为集合中的成员进行从小到大的排序。有序集合的成员是唯一的,但分数(score)却可以重复。

1. 添加元素
```bash 
ZAdd key score member [score member...]
```
2. 通过索引区间返回有序集合中指定区间内的成员
```bash 
# 按照元素分数从小到大，[withscores]是否带上分数
ZRange key start stop [withscores]
```
3. 通过索引区间返回有序集合中指定区间内的成员，倒序排列
```bash 
# 按照元素分数从大到小，[withscores]是否带上分数
ZRevRange key start stop [withscores]
```
4. 指定分数范围内的元素
```bash
ZRangeByScore key min max [withScores] [limit offset count]
```
5. 获取元素的分数
```bash
ZScore key member
```
6. 获取集合中元素的数量
```bash
ZCard key
```
7. 移除元素
```bash
ZRem key member
```
8. 增加某个元素的分数
```bash
ZIncrBy key increment member
```
9. 获取指定分数范围内的元素个数
```bash
ZCount key min max
```
10. **从键名列表中的第一个**非空排序集中弹出一个或者多个元素，它们是成员分数对
```bash
# 从多个有序集合中弹出2个元素
ZMPop numKeys key [key...] min/max count 2
```
11. 获取有序集合中的元素下标值
```bash
ZRank key values member
```
12. 获取有序集合中的逆序元素下标值
```bash
ZRevRank key values member
```

## 四、基础数据类型的基本使用场景

| 数据类型   | 经典使用场景                                   |
|--------|------------------------------------------|
| string | 抖音视频/商品的无限点赞，点一下加一下；文章的阅读数量；（Intr 商品:id） |
| List   | 微信公众号消息订阅；                               |
| Hash   | 简单的购物车；                                  |
| Set    | 抽奖小程序；微信朋友圈点赞查看同赞好友；QQ内推可能认识的人           |
| ZSet   | 根据商品销售对商品进行排名                            |





