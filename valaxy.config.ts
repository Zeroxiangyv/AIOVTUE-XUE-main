import { defineValaxyConfig } from 'valaxy'
import { addonVercount } from 'valaxy-addon-vercount'
import { addonBangumi } from 'valaxy-addon-bangumi'
import { addonMeting } from 'valaxy-addon-meting'
import { addonHitokoto } from 'valaxy-addon-hitokoto'
import { addonTwikoo } from 'valaxy-addon-twikoo'
import { vaFoucLoader } from './plugins/va-fouc-loader'
import { disableSsgHydration } from './plugins/disable-ssg-hydration'
import { albumWebdavConfigPlugin } from './plugins/album-webdav-config'
import { albumWebdavProxy } from './plugins/album-webdav-proxy'
import { twikooLocalPlugin } from './plugins/twikoo-local'
import siteConfig from './site.config'

const themePrimary = '#DF9193'   //主题色

const mainNavItems = [
  {
    text: '首页',
    icon: 'i-ant-design:home-filled',
    link: '/',
  },
  {
    text: '文章',
    icon: 'i-ant-design:read-filled',
    link: '/categories',
    collapsed: true,
    items: [
      {
        icon: 'i-ant-design:appstore-filled',
        locale: 'menu.categories',
        link: '/categories',
      },
      {
        icon: 'i-ant-design:container-filled',
        locale: 'menu.archives',
        link: '/archives',
      },
      {
        icon: 'i-ant-design:tags-filled',
        locale: 'menu.tags',
        link: '/tags',
      },
    ],
  },
  {
    text: '番剧',
    icon: 'i-ant-design:play-square-filled',
    link: '/anime',
  },
  {
    text: '相册',
    icon: 'i-ant-design:picture-filled',
    link: '/gallery',
  },
  {
    text: '社交',
    icon: 'i-ant-design:team-outlined',
    link: '/links',
    collapsed: true,
    items: [
      {
        text: '导航',
        icon: 'i-ant-design:compass-filled',
        link: '/navigation',
      },
      {
        text: '留言',
        icon: 'i-ant-design:message-filled',
        link: '/comment',
      },
      {
        text: '友链',
        icon: 'i-ant-design:global-outlined',
        link: '/links',
      },
    ],
  },
  {
    text: '关于',
    icon: 'i-ant-design:idcard-filled',
    link: '/about',
  },
]

/**
 * User Config
 */
export default defineValaxyConfig({
  // site config see site.config.ts

  vite: {
    plugins: [twikooLocalPlugin(), disableSsgHydration(), vaFoucLoader({
      avatar: '/favicon.png',
      title: siteConfig.title,
      subtitle: siteConfig.subtitle,
      primary: themePrimary,
    }), albumWebdavConfigPlugin(), albumWebdavProxy()],
  },

  modules: {
    rss: {
      enable: true,
      fullText: false,
      // 当设置为 true 时，会从构建后的 HTML 中提取图片的实际路径（包含 hash）
      // When set to true, it will extract actual image paths (with hash) from built HTML
      extractImagePathsFromHTML: true,
    },
  },
  
  build: {
    ssgForPagination: false,
    foucGuard: {
      enabled: true,
      maxDuration: 6000,
    },
  },
  
  
  
  
  siteConfig: {
    // 启用评论
    comment: {
      enable: true
    },
  },



  theme: 'sakura',    //主题设置

  themeConfig: {
    notice: {                      //公告栏内容
      rotateInterval: 5000,
      title: '公告栏',
      sections: [
        {
          label: '--- 主域名 ---',
          lines: [
            'daily.yybb.us',
            // 'daily.20030327.xyz',
            // 也支持对象：{ text: '显示文字', url: 'https://example.com' }
          ],
        },
        // {
        //   label: '--- 备用域名 ---',
        //   lines: [
        //     'daily.aiovt.cloudns.ch',
        //     'daily.yybb.dpdns.org',
        //     'daily.aiovtue.dpdns.org',
        //   ],
        // },
      ],
    },
    // 导航页「随机网站跳转」抽卡视频：weight 越大越容易抽到
    navigation: {
      randomDrawVideos: [
        {
          url: 'https://img.naixiai.cn/2026/06/09/_compressed.mp4',
          weight: 1,
        },
        {
          url: 'https://img.naixiai.cn/2026/06/09/_compresseddbc6ff3507fddbf4.mp4',
          weight: 2,
        },
        {
          url: 'https://img.naixiai.cn/2026/06/09/_compressedf1fc8ccd127613ac.mp4',
          weight: 3,
        },
      ],
    },
    ui: {
      primary: themePrimary,
      postList: {
        responsive: {
          xl: 1,
        }
     }  
    },

    postList: {
      defaultImage: '/default-cover.png',  //文章默认封面，本地路径在public文件夹
    },

    
    sidebar: [...mainNavItems],
    sidebarOptions: {
      position: 'left',
      offset: true,
      initialState: false,
      // null：不从 session/localStorage 恢复，避免 SSG hydration 不一致
      persistence: null,
    },    
    
    
    
    hero: {
      title: 'AIOVTUE',
      motto: '雨是神的烟花',
      urls: [
        '/hero/awdsv.jpg',    //也可以换成连接，本地文件在public文件夹
        '/hero/cover.png',
        '/hero/wallhaven-5geqr5.jpg',
        '/hero/rwcgf.mp4',
        '/hero/adev.mp4',
      ],
      randomUrls: true,
      // 自定义视频播放器
      playerUrl: '/hero/player.mp4',
      style: 'dot', // 使用扫描线效果
      fixedImg: true, // 固定背景图片
      typewriter: true, // 启用打字机效果
      enableHitokoto: true, // 启用一言
      waveTheme: 'horizontal', // 设置水平波纹主题
    },
    
  postFooter: {
    navigationMerge: true // 合并导航显示
  }, 
    
   footer: {
      powered: false,
      since: 2026,
      runtimeSince: '2026-6-01',    //网站运行开始时间
      icon: {
        animated: true,
        url: 'https://your-website.com',
        title: 'Your Name',
      },
      icp: '<a href="https://icp.gov.moe/?keyword=20260258" target="_blank" rel="noopener">萌ICP备20260258号</a>',  //网站底部备案号
    }, 
  
    navbar: [...mainNavItems],
    navbarOptions: {
      title: ['AIOVTUE-', '雪'],
      subTitle: '雨是神的烟花',
      offset: 0,
      invert: ['home'],
      showMarker: false,
      autoHide: ['home'],
    },

 
    pagination: {
      type: 'standard',
      itemsPerPage: 8,
    },
 
    
    scrollDamping: true, // 启用滚动阻尼
    scrollAnimation: true, // 启用滚动动画
    scrollIndicator: true, // 显示滚动指示器
    scrollLock: false, // 禁用滚动锁定
    scrollToTop: false,
    scrollDown: {
      enable: true,
    },             //首页下滑按钮

    // 分类页样式：list 列表 / chart 环状图（玫瑰图或旭日图）
    categories: {
      style: 'chart',
    },

    // 归档页样式：list 时间线 / chart 发布统计折线面积图
    archives: {
      style: 'chart',
      startMonth: '2026-01',
    },

    // 标签页样式：list 按钮列表 / chart 柱状统计图
    tagsPage: {
      style: 'chart',
      chartLength: 10,
    },

    tags: {
      rainbow: false,
    },
  },

  addons: [
    addonTwikoo({
      envId: 'https://your.com/',  //你的twikoo地址',
    }),
    addonVercount({
      api: 'cn'   //访问统计
    }),
    addonMeting({
      global: false,
      props: {
        id: '2489775340',
        server: 'netease',
        type: 'playlist',
      },
      options: {
        autoHidden: true,
        animationIn: true,
        lyricHidden: true,
      },
    }),
    addonBangumi({
      api: 'https://yi_xiao_jiu-bangumi.web.val.run',
      bilibiliUid: '334423445',   //番剧页面，这里放你b站uid
      bgmEnabled: false,
    }),
    // addonBackgrounds({}),
    addonHitokoto({
      api: 'intl',
    }),
  ],
})
