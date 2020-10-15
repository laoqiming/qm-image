# 自定义图片显示组件
增强微信原生的image组件，支持加载出错重试功能

## 属性

| 属性名                 | 类型    | 默认值        | 说明                                 |
| ---------------------- | ------- | ------------- | ------------------------------------ |
| src                    | String  | ''            | 图片地址                             |
| mode                   | String  | 'scaleToFill' | 图片裁剪、缩放的模式                 |
| webp                   | Boolean | false         | 是否解析 webP 格式                   |
| lazy-load              | Boolean | false         | 是否启用图片懒加载                   |
| show-menu-by-longpress | Boolean | false         | 是否开启长按图片显示识别小程序码菜单 |
| retry                  | Number  | 1             | 出错重试加载次数，0为不重试          |
| style                  | String  | ''            | css样式表达式                        |
| error-image            | String  | 'error.png'   | 出错或重试后未成功的替代图片         |

## 事件

| 事件名 | 回调值                         | 说明                 |
| ------ | ------------------------------ | -------------------- |
| error  | event.detail = {errMsg}        | 当错误发生时触发     |
| load   | event.detail = {height, width} | 当图片载入完毕时触发 |

## 示例代码

```html
<qm-image src="{{imagePath}}" retry="2" mode="aspectFit" class="main-img" style="width:200rpx;height:200rpx;"></qm-image>
```

