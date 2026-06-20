# AIOVTUE-XUE

一个基于 [Valaxy](https://github.com/YunYouJun/valaxy) 工具和 [sakura](https://github.com/WRXinYue/valaxy-theme-sakura) 主题构建的个人博客

#### 站点示例：https://daily.yybb.us

#### 站点截图

![](https://img.naixiai.cn/2026/06/12/1781198705620.png)
![](https://img.naixiai.cn/2026/06/12/1781198721956.png)
![](https://img.naixiai.cn/2026/06/12/1781198737767.png)
![](https://img.naixiai.cn/2026/06/12/1781198755823.png)


# 快速开始-本地预览

## 安装依赖

```bash
pnpm i
```

## 本地运行

```bash
pnpm dev
```

访问：

```text
http://localhost:4859
```

## 构建项目

```bash
pnpm build
```

## 预览构建

```bash
pnpm run serve
```

---

# 项目目录结构

```text
.
├─ pages/                 页面目录
│  ├─ about/              关于页面
│  ├─ gallery/            相册页面
│  ├─ links/              友情链接页面
│  ├─ navigation/         导航页面
│  └─ posts/              文章页面
│
├─ posts/                 博客文章
├─ components/            Vue组件
├─ public/                静态资源
├─ valaxy.config.ts       Valaxy配置
├─ site.config.ts         站点配置
└─ .env                   环境变量
```

---

# 页面配置说明

## 1. 文章

文章存放位置：

```text
posts/
```

新建 Markdown 文件即可发布文章。

---

## 2. 番剧页面

配置文件：

```text
valaxy.config.ts
```

找到：

```ts
addonBangumi({
})
```

修改为自己的 Bilibili UID。

---

## 3. 相册页面

配置位置：

```text
pages/gallery
```

具体配置说明请查看：

```text
pages/gallery/README.md
```

---

## 4. 导航页面

### 抽卡视频

配置位置：

```text
valaxy.config.ts
```

### 导航网站

配置位置：

```text
pages/navigation/index.md
```

按照现有格式添加即可。

---

## 5. 留言页面

配置文件：

```text
components/layouts/SakuraCommentLayout.vue
```

默认使用以下图片：

```js
images: {
  cover: 'https://pic1.imgdb.cn/item/6a26e5483c9809430d376f88.png',
  line: 'https://pic1.imgdb.cn/item/6a26e5483c9809430d376f86.png',
  beforeimg: 'https://pic1.imgdb.cn/item/6a26e5483c9809430d376f85.png',
  afterimg: 'https://pic1.imgdb.cn/item/6a26e5483c9809430d376f87.png',
}
```

建议下载后上传至自己的图床或放入本地资源目录，避免第三方链接失效。

当然也可以替换成自己喜欢的图片。

---

## 6. 友情链接页面

### 页面内容

配置位置：

```text
pages/links/index.md
```

---

### 页面公告

配置位置：

```text
components/FriendLinkNotice.vue
```

修改：

```ts
const rules = [
  ...
]
```

即可自定义申请规则。

---

### 本站信息

配置位置：

```text
components/FriendLinkNotice.vue
```

修改以下内容：

```vue
<li>
  站点名称：
</li>

<li>
  站点链接：
</li>

<li>
  站长头像：
</li>

<li>
  站点描述：
</li>

<li>
  站点截图：
</li>
```

将默认内容替换为自己的站点信息即可。

---

## 7. 关于页面

配置位置：

```text
pages/about/index.md
```

本质上是一个普通文章页面。

---

## 8. 评论系统（Twikoo）

配置位置：

```text
valaxy.config.ts
```

找到：

```ts
addonTwikoo({
  envId: 'https://your.com/',
})
```

替换为自己的 Twikoo 服务地址。

---

## 9. 站点基础信息

以下文件务必修改：

```text
site.config.ts
valaxy.config.ts
```

包括：

* 网站名称
* 网站描述
* 网站地址
* 作者信息
* 社交链接
* 导航配置

---

# WebDAV 相册配置

如果启用 WebDAV 相册功能，需要自行准备 WebDAV 存储服务。

例如：

* Alist
* OpenList
* Nextcloud
* 坚果云
* InfiniCLOUD
* WebDAV 挂载网盘

配置环境变量：

```env
WEBDAV_PASSWORD=your_password
```

请勿将密码直接写入代码仓库。

---

# 部署教程

## Netlify（推荐）

### 新建站点

导入 GitHub 仓库。

### 构建设置

Build Command：

```bash
npm run build
```

Publish Directory：

```text
dist
```


### 环境变量

如果使用 WebDAV 相册：

```env
WEBDAV_PASSWORD=your_password
```

添加后重新部署。

---

## Cloudflare Pages（推荐）

### 创建项目

进入 Cloudflare Pages。

连接 GitHub 仓库。

### 构建配置

Build command：

```bash
npm run build
```

Build output directory：

```text
dist
```

### 环境变量

进入：

```text
Settings
→ Environment Variables
```

添加：

```env
WEBDAV_PASSWORD=your_password
```

保存后重新部署。

---

## Vercel

### 构建配置

Build Command：

```bash
npm run build
```

Output Directory：

```text
dist
```

### 注意事项

Vercel部署

* WebDAV 相册无法正常工作

如果需要完整使用 WebDAV 功能，推荐使用：

* Cloudflare Pages
* Netlify

---
