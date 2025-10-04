export default {
  title: 'light-di',
  description: 'A simple, lightweight dependency injection container for JavaScript and TypeScript.',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Examples', link: '/examples' },
      { text: 'Contributing', link: '/contributing' },
      { text: 'License', link: '/license' },
      { text: 'GitHub', link: 'https://github.com/boxheed/light-di' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Getting Started', link: '/guide/getting-started' }
          ]
        }
      ]
    }
  },
  base: '/light-di/',
}