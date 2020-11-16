const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Test in Javascript',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    sidebar: 'auto',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Vue-Test-Utils',
        link: '/vue-test-utils/'
      },
      {
        text: 'Le manuel de lmiller1990',
        link: '/vue-testing-handbook/'
      },
      {
        text: 'Jest',
        link: '/jest/'
      },
      {
        text: 'Mocha',
        link: '/mocha/'
      }
    ],
    sidebar: {
      '/vue-test-utils/': [
        {
          title: 'Vue-Test-Utils',
          sidebarDepth: 1,
          children: [
          '',
          'installation.md',
          'guides',
          'api',
          'wrapper',
          'wrapper-array',
          'moutingOptions',
          'components'
          ]
        }
      ],

      '/jest/': [
        {
          title: 'Jest',
          sidebarDepth: 2,
          children: [
            '',
            'introduction',
            'guides',
            'framework',
            'api',
          ]
        }
      ],

      '/mocha/': [
        {
          title: 'Mocha',
          sidebarDepth: 1,
          children: [
            '',
            'installation',
            'getting-started',
            'run-cycle',
            'detect-multiple',
            'assertions',
            'asynchronous-code',
            'synchronous-code',
            'arrow-functions',
            'hooks',
            'pending-tests',
            'exclusive-tests',
            'inclusive-tests',
            'retry-tests',
            'dynamically-generating',
            'timeouts',
            'diffs',
            'command-line',
            'parallel-tests',
            'root',
            'interfaces',
            'reporters',
            'node-js',
            'running-mocha',
            'desktop',
            'configuring-mocha',
            'the-test',
            'error-code',
            'editor-plugin',
            'examples',
            'testing-mocha'
          ]
        }
      ],
      '/vue-testing-handbook/': [
        {
          title: 'Manuel sur les tests de vue',
          children: [
            '',
            ['setting-up-for-tdd', 'Mise en place pour tdd'],
            ['rendering-a-component', 'Rendre un composant'],
            ['wrapper', 'Les méthodes avec wrapper'],
            ['components-with-props', 'Les composants avec props'],
            ['computed-properties', 'Les propiétés calculées'],
            ['simulating-user-input', 'Simuler la saisie utilisateur'],
            ['testing-emitted-events', 'Test des éléments émis'],
            ['mocking-global-objects', 'Simuler les objets globaux'],
            ['stubbing-components', 'Les composants stub'],
            ['finding-elements-and-components', 'Trouver les éléments et les composants'],
            ['testing-vuex', 'Tester Vuex'],
            ['vuex-mutations', 'Les mutations de Vuex'],
            ['vuex-actions', 'Les actions de Vuex'],
            ['vuex-getters', 'Les getteres de Vuex'],
            ['vuex-in-components', 'Vuex dans les composants'],
            ['vuex-in-components-mutations-and-actions', 'Vuex dans les mutations et les actions des composants '],
            ['vue-router', 'Vue Router'],
            ['composition-api', 'Composition de l\'API'],
            ['reducing-boilerplate-in-tests', 'Réduction standard dans les tests'],
            ['jest-mocking-modules', 'Les modules de simulations de Jest']
          ]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
