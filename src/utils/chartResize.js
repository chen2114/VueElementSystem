import debounce from './debounce'

export default {
  data () {
    return {
      $_sidebarElm: null,
      $_resizeHandler: null
    }
  },
  mounted () {
    this.$_resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },
  beforeDestroy () {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  // 通过keep alive修复缓存时的错误
  // https://github.com/PanJiaChen/vue-element-admin/issues/2116
  activated () {
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },
  deactivated () {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  methods: {
    // 将$用于mixins属性
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_initResizeEvent () {
      window.addEventListener('resize', this.$_resizeHandler)
    },
    $_destroyResizeEvent () {
      window.removeEventListener('resize', this.$_resizeHandler)
    },
    $_sidebarResizeHandler (e) {
      if (e.propertyName === 'width') {
        this.$_resizeHandler()
      }
    },
    $_initSidebarResizeEvent () {
      this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
    },
    $_destroySidebarResizeEvent () {
      this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
    }
  }
}
