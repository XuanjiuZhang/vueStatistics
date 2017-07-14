<style lang="less">

</style>

<template>
  <div class="row params-row">
    <div class="col-sm-3 col-md-3 col-lg-3 params-name">
      <el-input class="param-input" v-model="pData.name" placeholder="请输入参数"></el-input>
      <el-popover ref="popoverDelete" placement="top" width="160" v-model="popoverDeleteShow">
        <p>您确定要删除该参数？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="closePop">取消</el-button>
          <el-button type="primary" size="mini" @click="confirmDel">确定</el-button>
        </div>
      </el-popover>
      <el-tooltip class="item" effect="dark" content="删除" placement="top">
        <span class="el-icon-delete2 param-delete" v-popover:popoverDelete></span>
      </el-tooltip>
      
    </div>
    <div class="col-sm-5 col-md-5 col-lg-5 params-qrc">
      <div class="qrcode" ref="qrcode"
        v-clipboard:copy="composedUrl"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"></div>
      <div class="params-link">
        &nbsp&nbsp&nbsp{{composedUrl | stringLength}}
      </div>
    </div>
    <div class="col-sm-2 col-md-2 col-lg-2">
      <button class="copy-btn"
        v-clipboard:copy="composedUrl"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">复制链接</button>
    </div>
    <div class="col-sm-2 col-md-2 col-lg-2">
      <el-select class="down-qrc" v-model="downInfo" placeholder="下载二维码" @change="downInfoSelect">
        <el-option v-for="item in downInfoOption" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'Vuex';
  import qrcanvas from 'qrcanvas'
  import { exportCanvasAsPNG } from './service'
  export default {
    data() {
      return {
        // paramsStr: '',
        popoverDeleteShow: false,
        downInfo: '',
        canvas: undefined,
        downInfoOption: [{value: '9', label: '256px'}, {value: '18', label: '512px'}, {value: '36', label: '1024px'}]
      }
    },
    props: ['pData', 'cData'],
    watch: {
      'pData.name'(name, oldName) {
        if(name === oldName) {
          return
        }
        const send = {
          id: this.cData._id,
          data: this.cData.params
        }
        this.debouncedUpdateParam(send, false)
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      ...mapActions(['initChannelSelectedData']),
      init() {
        if(this.canvas) {
          this.$refs.qrcode.removeChild(this.canvas)
        }
        this.canvas = qrcanvas({
          data: this.composedUrl,
          // size: 98,
          cellSize: 4
        });
        this.canvas.style.height = '100%'
        this.canvas.style.width = '100%'
        this.$refs.qrcode.appendChild(this.canvas);
      },
      closePop() {
        this.popoverDeleteShow = false
      },
      updateParam(send, refresh = false) {
        this.statisticApi.channel.modChannelParam(this.sid, send)
          .then(res => {
            this.Notification({
              // title: '成功',
              type: 'success',
              message: '渠道参数已更新',
              duration: 1000,
              offset: 100
            })
            this.init()
            refresh && this.initChannelSelectedData()
          })
      },
      confirmDel() {
        // this.$emit('confirmDel')
        const data = this.cData.params.filter(p => {
          return p.name != this.pData.name
        })
        const send = {
          id: this.cData._id,
          data
        }
        this.updateParam(send, true)
        this.closePop()
      },
      downInfoSelect(cellSize) {
        if(cellSize === ''){
          return
        }
        console.log(cellSize);
        this.downInfo = ''
        const canvas = qrcanvas({
          data: this.composedUrl,
          // size,
          cellSize
        });
        exportCanvasAsPNG(canvas, `${this.cData.name} - ${this.pData.name}`);
      },
      onCopy (e) {
        console.log('onCopy');
        this.Notification({
            // title: '成功',
            type: 'success',
            message: '已复制url到剪贴板',
            duration: 1000,
            offset: 100
          })
      },
      onError (e) {
        console.log('onError');
      }
    },
    computed: {
      ...mapState(['statisticApi', 'sid', 'Notification']),
      composedUrl() {
        return `${this.cData.url}?qrc=${this.cData._id}&src=${encodeURIComponent(this.pData.name)}`
      },
      debouncedUpdateParam() {
        return _lodash.debounce(this.updateParam, 1000)
      }
    },
  }

</script>