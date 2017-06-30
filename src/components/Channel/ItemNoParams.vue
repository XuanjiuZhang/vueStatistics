<style lang="less">

</style>

<template>
  <div class="row params-row">
    <div class="col-sm-3 col-md-3 col-lg-3 params-name">
    </div>
    <div class="col-sm-5 col-md-5 col-lg-5 params-qrc">
      <div class="qrcode" ref="qrcode"></div>
      <span>{{composedUrl | stringLength}}</span>
    </div>
    <div class="col-sm-2 col-md-2 col-lg-2">
      <button class="copy-btn" @click="copyLink">复制链接</button>
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
  import { mapGetters } from 'Vuex';
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
      copyLink() {
        console.log('copyLink');
      },
    },
    computed: {
      // ...mapGetters(['statisticApi', 'currentShowChannel', 'echarts'])
      composedUrl() {
        return `${this.cData.url}`
      }
    },
  }

</script>