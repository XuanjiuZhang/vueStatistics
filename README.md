# 溯源


### 简介
运行方式  gulp dev  然后 node app

* SourceContainer是根组件.
* SourceRouter路由记录了sid, 之后的页面都是基于sid路由的子路由.

* header文件夹对应头部
* channel文件夹对应渠道列表
* effects文件夹对应效果统计

#### 
---
* /excel 批量导入渠道的模板文件
* /fonts 字体图标
* /images 静态图片资源
* /lib elementLib是修改过后的elementui组件, 使用时只引用了element-ui.common.js  如果要修改需要使用elementui官方的打包方法重新打包生成,需要打包的源代码是elementui-pacakges目录下的文件.
* /lib vue2-dropzone是上传渠道excel文件的第三方组件,进行了一些修改(修改的文件为vue2-dropzone/src/index.vue)
* /style 下放置了一些静态css文件
* /vuex 初始化store


---

![image](https://github.com/jiujiue99/vueStatistics/tree/masterCompany/src/images/sample-funnel.png)

![image](https://github.com/jiujiue99/vueStatistics/tree/masterCompany/src/images/sample-line.png)

![image](https://github.com/jiujiue99/vueStatistics/tree/masterCompany/src/images/sample-map.png)