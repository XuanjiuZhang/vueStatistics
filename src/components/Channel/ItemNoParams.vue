<style lang="less">

</style>

<template>
  <div class="row params-row">
    <div class="col-sm-3 col-md-3 col-lg-3 params-name">
    </div>
    <div class="col-sm-5 col-md-5 col-lg-5 params-qrc">
      <div class="qrcode" ref="qrcode"></div>
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
  import { mapState } from 'Vuex';
  import qrcanvas from 'qrcanvas'
  import { exportCanvasAsPNG } from './service'
  export default {
    data() {
      return {
        downInfo: '',
        downInfoOption: [{value: '9', label: '256px'}, {value: '18', label: '512px'}, {value: '36', label: '1024px'}]
      }
    },
    props: ['cData'],
    mounted() {
      const canvas = qrcanvas({
        data: this.cData.composedUrl,
        // size: 98,
        cellSize: 4
      });
      canvas.style.height = '100%'
      canvas.style.width = '100%'
      this.$refs.qrcode.appendChild(canvas);
    },
    methods: {
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
        exportCanvasAsPNG(canvas, `${this.cData.name}`);
      },
      onCopy (e) {
        console.log('onCopy');
        this.Notification({
            // title: '成功',
            type: 'success',
            message: '已复制到剪贴板',
            duration: 1000,
            offset: 100
          })
      },
      onError (e) {
        console.log('onError');
      }
    },
    computed: {
      ...mapState(['Notification']),
      composedUrl() {
        return `${this.cData.url}`
      }
    },
  }

</script>