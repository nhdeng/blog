---
title: go 日志记录最佳实践
date: 2023-03-10 10:44:27
tags: ["go", "gorus", "rotatelogs", "ifshook"]
excerpt: golang项目中使用gorus + rotatelogs + ifshook实现日志记录
---
- [logrus](https://github.com/sirupsen/logrus)是一个用于Go（golang）的结构化记录器，与标准库记录器完全API兼容。
- [file-rotatelogs](https://github.com/lestrrat-go/file-rotatelogs)实现了 io.Writer 接口，并且提供了文件的切割功能。
- [lfshook](https://github.com/rifflock/lfshook)决定哪些级别的日志可以使用rotatelogs的切割设置，并决定输出格式（TEXT / JSON）。

- 完整示例代码
```golang
package pkg

import (
	rotatelogs "github.com/lestrrat-go/file-rotatelogs"
	"github.com/rifflock/lfshook"
	"github.com/sirupsen/logrus"
	"go-package/config"
	"os"
	"path"
	"time"
)

var (
	Logger      *logrus.Logger
	logFileName string = "server_log"
	Location, _        = time.LoadLocation("Asia/Shanghai")
)

func InitLogger() {
	// 实例化logrus
	Logger = logrus.New()
	// 设置日志级别
	level, err := logrus.ParseLevel(config.Cfg.Server.LogLevel)
	if err != nil {
		level = logrus.InfoLevel
	}
	Logger.SetLevel(level)

	logFileStat()

	fileName := path.Join(config.Cfg.Server.LogPath, logFileName)
	// 使用rotatelogs进行日志切割
	logWriter, err := rotatelogs.New(
		fileName+".%Y%m%d%H%M.log",
		// 生成软链，指向最新日志文件
		rotatelogs.WithLinkName(fileName),
		rotatelogs.WithMaxAge(time.Duration(config.Cfg.Server.LogExpired)*time.Hour*24),
		rotatelogs.WithRotationTime(24*time.Hour),
	)
	if err != nil {
		logrus.Fatal("logger rotatelogs.New error:", err)
	}
	debugWriter, err := rotatelogs.New(
		fileName+"_debug"+".%Y%m%d%H%M.log",
		rotatelogs.WithMaxAge(time.Duration(config.Cfg.Server.LogExpired)*time.Hour*24),
		rotatelogs.WithRotationTime(24*time.Hour),
	)
	if err != nil {
		logrus.Fatal("logger rotatelogs.New error:", err)
	}

	// 使用lfshook设置不同类型日志进行不同的切割方式
	writeMap := lfshook.WriterMap{
		logrus.InfoLevel:  logWriter,
		logrus.FatalLevel: logWriter,
		logrus.DebugLevel: debugWriter,
		logrus.WarnLevel:  logWriter,
		logrus.ErrorLevel: logWriter,
		logrus.PanicLevel: logWriter,
	}
	Logger.AddHook(lfshook.NewHook(writeMap, &logrus.JSONFormatter{
		TimestampFormat: "2006-01-02 15:04:05",
	}))
}

/**
 * 检测日志文件是否存在
 */
func logFileStat() {
	logPath := path.Join(config.Cfg.Server.LogPath)
	if _, err := os.Stat(logPath); os.IsNotExist(err) {
		os.Mkdir(logPath, os.ModePerm)
		os.Chmod(logPath, 0755)
	}
}
```