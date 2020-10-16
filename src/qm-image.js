Component({
  options: {
    virtualHost: true, // 设置组件为虚拟节点，让组件第一级子节点直接插入DOM中
    styleIsolation: 'apply-shared', // 让组件可以应用外部级联样式
  },
  externalClasses: ['class'], // 让组件可以接受class属性
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: '',
    },
    style: {
      type: String,
      value: '',
    },
    mode: {
      type: String,
      value: 'scaleToFill'
    },
    webp: {
      type: Boolean,
      value: false,
    },
    lazyLoad: {
      type: Boolean,
      value: false,
    },
    showMenuByLongpress: {
      type: Boolean,
      value: false,
    },
    retry: {
      type: Number,
      value: 1
    },
    errorImage: {
      type: String,
      value: './assets/error.png'
    },
    hidden: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loadCount: 0,
    errorMessage: ''
  },
  observers: {
    src() {
      this.checkEmpty()
    }
  },
  attached() {
    this.checkEmpty()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    checkEmpty() {
      this.data.src = this.data.src || ''
      if (this.data.src === '') {
        // src 为空时不会触发error事件，直接使用错误图片替换
        this.setData({
          src: this.data.errorImage
        })
      }
    },
    onError(e) {
      const imagePath = this.data.src.replace(/[&?]r-[.\d]+$/g, '')
      if (!/^https?:\/\/[^/]+\/?$/i.test(imagePath)) {
        // 正常路径图片
        this.data.errorMessage = e.detail.errMsg
        if (this.data.retry > 0) {
          if (this.data.loadCount < this.data.retry) {
            this.data.loadCount++
            const path = imagePath + (imagePath.indexOf('?') === -1 ? '?' : '&') + 'r-' + Math.random()
            this.setData({
              src: path
            })
          } else {
            this.setData({
              src: this.data.errorImage
            })
            this.triggerEvent('error', e)
          }
        } else {
          this.triggerEvent('error', e)
        }
      } else {
        // 非正常路径图片，直接设置为错误图片
        this.data.loadCount++
        this.setData({
          src: this.data.errorImage
        })
        this.triggerEvent('error', e)
      }
    },
    onLoaded(e) {
      this.triggerEvent('load', e)
    }
  }
})
