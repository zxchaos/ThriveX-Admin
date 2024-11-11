首先我想跟大家说一句话："国内做开源真的不容易，没有任何受益，纯为爱发电。如果大家觉得这个项目还不错，那么非常希望能够占用你 `10` 秒钟的宝贵时间点上一个免费的 `star` 支持一下开源"

 

# 🎉 ThriveX 现代化博客管理系统

🎉 `ThriveX` 是一个 `Next14` + `Spring Boot` 的产物，该项目专注于分享技术文章和知识，为技术爱好者和从业者提供一个分享、交流和学习的平台。用户可以在平台上发表自己的技术文章，或浏览其他用户分享的文章，并与他们进行讨论和互动。

🗂️ **项目预览：** [https://liuyuyang.net/](https://liuyuyang.net/)



🛠️ **技术架构：**

前端：React、**Nextjs**、TypeScript、Zustand、**TailwindCSS**、Antd、Scss、Echarts

后端：**Spring Boot**、Mybatis Plus、MySQL、Qiniu、Socket.io、Swagger



❤️ **项目初衷：**

一直对网站开发领域很感兴趣，从小就希望有一个属于自己的网站，因此踏上了 `Web` 全栈开发的旅途，立志有朝一日也能开发一款属于自己的网站。如今历时 `2` 年有余，一个人从 `0` 到 `1` 独立完成整个项目的全栈开发，也算是完成了从小的一个心愿



## 项目演示

### 前端

这里只演示部分前端界面，具体大家可以自行查看 **->** [https://liuyuyang.net](https://liuyuyang.net)
![首页](https://bu.dusays.com/2024/10/28/671f7a44631d7.png)
![足迹](https://bu.dusays.com/2024/09/17/66e97036dddcb.png)



### 控制端

![数据分析](https://bu.dusays.com/2024/09/17/66e97035726ae.png)
![文件系统](https://bu.dusays.com/2024/09/17/66e97031cd456.png)



## 项目运行

最近比较忙，过段时间写一篇详细的项目部署教程，这里先简单教大家在本地跑起来

**前端 or 控制端**

环境：Nodejs18 及以上

```
npm i
npm run dev
```

后台账号：`admin`   密码：`123456`



在控制端项目根目录下创建 `.env` 文件，添加如下配置

```bash
# 百度统计相关配置
VITE_BAIDU_TONGJI_KEY=
VITE_BAIDU_TONGJI_SECRET_KEY=
VITE_BAIDU_TONGJI_SITE_ID=
VITE_BAIDU_TONGJI_ACCESS_TOKEN=
VITE_BAIDU_TONGJI_REFRESH_TOKEN=

# 星火AI相关配置
VITE_AI_APIPassword=
VITE_AI_MODEL=
```

百度接口申请地址：[https://tongji.baidu.com/api/manual/Chapter2/openapi.html](https://tongji.baidu.com/api/manual/Chapter2/openapi.html)
星火大模型接口申请地址：[https://www.xfyun.cn/](https://www.xfyun.cn/)



**后端**

环境：Java8 + MySQL8

安装 `maven` 依赖，配置 `application-dev.yml` 相关的信息

```yml
lyy:
  email:
    host: smtp.qq.com
    port: 465
    username: 你的邮箱账号
    password: 你的邮箱授权码

  oss:
    accessKey: 七牛云的accessKey
    secretKey: 七牛云的secretKey
    bucket: thrive
```

导入后端根目录的 `ThriveX.sql` 数据库文件，最后运行项目即可



## 项目结构

```
├── public // 存放公共资源
├── src // 核心源码
│   ├── api // 所有API接口
│   ├── app
│   │   ├── error.tsx // 自定义错误页
│   │   ├── favicon.ico // 项目图标
│   │   ├── layout.tsx // 网站布局
│   │   ├── loading.tsx // 自定义加载页
│   │   ├── not-found.tsx // 自定义404页
│   │   ├── page.tsx // 首页
│   ├── assets // 存放项目所有资源
│   │   ├── font
│   │   ├── image
│   │   └── svg
│   ├── components // 公共组件
│   ├── stores // 数据全局共享
│   ├── styles // 全局样式
│   ├── types // 全局类型
│   └── utils // 通用方法
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```




## 开源地址

### 最新版（Nextjs + Spring Boot）

前端：[LiuYuYang01/ThriveX-Blog (github.com)](https://github.com/LiuYuYang01/ThriveX-Blog)

控制端：[LiuYuYang01/ThriveX-Admin (github.com)](https://github.com/LiuYuYang01/ThriveX-Admin)

后端：[LiuYuYang01/ThriveX-Service (github.com)](https://github.com/LiuYuYang01/ThriveX-Service)



### 旧版（Vue3 + Python Flask）

前端：[LiuYuYang01/Thrive_Blog (github.com)](https://github.com/LiuYuYang01/Thrive_Blog)

控制端：[LiuYuYang01/Thrive_Admin (github.com)](https://github.com/LiuYuYang01/Thrive_Admin)

后端：[LiuYuYang01/Thrive_Server (github.com)](https://github.com/LiuYuYang01/Thrive_Server)

![后台](https://bu.dusays.com/2024/09/17/66e96ca781d49.png)



## 开源协议

该项目仅针对个人或公司使用，请遵守开源协议：**AGPL-3.0 license** 
如果对该项目进行二次开发，需将项目进行开源，禁止任何商业行为

弘扬开源精神，从你我做起！



## 关于项目
这个项目是我一个人从设计 -> 产品 -> 前端 -> 控制端 -> 后端以及数据库从 `0` 到 `1` 创造的，一个人的精力有限在刚开始可能会有很多隐藏的 `BUG`，希望大家能够及时在 `GitHub` 向我反馈，这样我也好加以改正，不断改善，成为最佳！

当然我更希望大家能够提交 `PR` 成为 `ThriveX` 的贡献者，大家一起参与进来，构建一个强大的博客管理系统！

最后我想说该项目的风格借鉴了很多网站的灵感，下面我主要列举几个：

[https://blog.zwying.com/](https://blog.zwying.com/)
[https://www.blatr.cn/](https://www.blatr.cn/)
[https://poetize.cn/](https://poetize.cn/)