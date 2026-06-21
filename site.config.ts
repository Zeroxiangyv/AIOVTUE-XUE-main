import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://aiovtue-xue-main.pages.dev',   //换成你自己的网站地址
  lang: 'zh-CN',
  title: 'ZERO-VFX',
  subtitle: '零',
  author: {
    name: 'ZERO-VFX',
    avatar: '/touxiang.png',
    status: {
      emoji: '🌸',
      message: '发呆ing...',
      },
  },
  description: '雨是神的烟花',

  favicon: '/touxiang.png',  //文件在public文件夹

  social: [
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/AIOVTUE',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: '微信公众号',
      link: 'https://r2tc.20030327.xyz/file/博客/主题/1780654223927_mmexport1780654189207.jpeg',
      icon: 'i-ri-wechat-2-line',
      color: '#1AAD19',
    },
    {
      name: 'E-Mail',
      link: 'mailto:x@yybb.us',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
    {
      name: 'Travelling',
      link: 'https://www.travellings.cn/go.html',
      icon: 'i-ri-train-line',
      color: '#8cb1b3',
    },
  ],



  search: {
    enable: true,  //启用搜索
    provider: 'fuse',
    type: 'fuse',   //主题组件通过 search.type 判断搜索类型
  },
  fuse: {
    /**
     * 设置搜索的文件路径
     */
    // pattern: 'pages/**/*.md',
    options: {
      keys: ['title', 'tags', 'categories', 'excerpt', 'content'],
      /**
       * @default 0.6
       * @see https://www.fusejs.io/api/options.html#threshold
       * 设置匹配阈值，越低越精确
       */
      // threshold: 0.6,
      /**
       * @default false
       * @see https://www.fusejs.io/api/options.html#ignoreLocation
       * 忽略位置
       * 这对于搜索文档全文内容有用，若无需全文搜索，则无需设置此项
       */
      ignoreLocation: true,
    },
  },

  sponsor: {
    enable: true,
    title: '我很可爱，请给我钱！',
    methods: [
      {
        name: '支付宝',
        url: 'https://i.postimg.cc/fyYTncnJ/IMG-20240915-155521.jpg',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: '微信支付',
        url: 'https://i.postimg.cc/26s8KHts/IMG-20240915-155547.png',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },

  // 文章图片点击放大预览（自定义画廊，支持左右切换）
  mediumZoom: {
    enable: false,  //禁用默认图片预览，本项目使用自建图片预览，需要禁用内置
  },

  // 代码块超过该高度（px）时自动折叠，点击底部按钮可展开
  codeHeightLimit: 360,
})