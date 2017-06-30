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
      <span class="el-icon-delete2 param-delete" v-popover:popoverDelete></span>
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
  import { mapState, mapActions } from 'Vuex';
  import qrcanvas from 'qrcanvas'
  import { exportCanvasAsPNG } from './service'
  export default {
    data() {
      return {
        // paramsStr: '',
        popoverDeleteShow: false,
        downInfo: '',
        downInfoOption: [{value: '9', label: '256px'}, {value: '18', label: '512px'}, {value: '36', label: '1024px'}]
      }
    },
    props: ['pData', 'cData'],
    watch: {
      'pData.name'(name) {
        console.log(name);
      }
    },
    mounted() {
      const canvas = qrcanvas({
        data: this.composedUrl,
        // size: 98,
        cellSize: 4
      });
      canvas.style.height = '100%'
      canvas.style.width = '100%'
      this.$refs.qrcode.appendChild(canvas);
    },
    methods: {
      ...mapActions(['initChannelSelectedData']),
      closePop() {
        this.popoverDeleteShow = false
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
        this.statisticApi.channel.modChannelParam(this.sid, send).then(res => res.json()).then(result => {
          console.log(result);
          this.initChannelSelectedData()
        })
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
      copyLink() {
        console.log('copyLink');
      },
    },
    computed: {
      ...mapState(['statisticApi', 'sid']),
      composedUrl() {
        return `${this.cData.url}?qrc=${this.cData._id}&src=${this.pData.name}`
      }
    },
  }

</script>