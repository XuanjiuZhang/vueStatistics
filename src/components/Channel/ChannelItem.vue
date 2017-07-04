<template>
  <div class="channel-item">

    <el-dialog :title="dialogOption.title" v-model="dialogVisible"
       @close="dialogClose"
       :close-on-click-modal="dialogOption.closeOnClickModal"
       :close-on-press-escape="dialogOption.closeOnPressEscape"
       :modal="dialogOption.modal" :size="dialogOption.size">
      <div class="header">
        <span>请按照模板格式上传excel文档,</span><img :src="'/build/img/import-excel.png'" alt=""><a @click="downloadExcelTemplate">下载模板</a>
      </div>
      <div class="body">
        <!--<div class="up-excel-btn">
          <span class="el-icon-plus"></span><span class="text">上传文档</span>
        </div>-->
        <div v-show="upExcelTypeErr" class="up-excel-fail" @click="upExcelTypeErr = false">
          <span class="text-waring">文档格式错误,请重新上传!</span>
        </div>
        <dropzone
          :id="dropZoneId"
          url="/h5/service/channel/uploader"
          :acceptedFileTypes="acceptedFileTypes"
          :upExcelTypeErr="upExcelTypeErr"
          :uploadSuccess="uploadSuccess"
          @vdropzone-total-upload-progress="onUploadProgress"
          @vdropzone-files-added="vdropzoneFilesAdded"
          @vdropzone-error="vdropzoneError"
          @vdropzone-success="showUploadSuccess">
          <input type="hidden" name="id" :value="cData._id">
        </dropzone>

        <div class="up-excel-progress" v-show="showProgress">
          <div>上传中...</div>
          <div class="bar">
            <div class="loaded" :style="loadedStyle"></div>
            <div class="unloaded" :style="unloadedStyle"></div>
          </div>
        </div>

        
        <div class="up-excel-suc" v-show="uploadSuccess">
          <img :src="'/build/img/import-excel-suc.png'" alt="">
          <div>
            <span>上传成功!</span>
          </div>
        </div>
      </div>
    </el-dialog>

    <div class="container-fluid">
      <div class="row channel-row">
        <div class="channel-info col-sm-4 col-md-4 col-lg-4 clearfix">
          <div class="part-left">
            <img :src="cData.icon" class="img">
            <span class="text">{{cData.name}}</span>
          </div>
          <div class="part-right">
            <el-tooltip class="item" effect="dark" content="添加参数" placement="top">
              <span class="el-icon-plus first" @click="addParam"></span>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="批量导入" placement="top">
              <span class="second" @click="importExcel">
                <i class="icon iconfont icon-piliangdaoru"></i>
              </span>
              <!--<file-upload v-model="files"
                @input="handleMultiFiles"
                @input-file="handlesingleFile">
                <span class="second">
                  <i class="icon iconfont icon-piliangdaoru"></i>
                </span>
              </file-upload>-->
            </el-tooltip>

            <!--<span class="el-icon-plus first" @click="addParam"></span>
            <span class="second"><i class="icon iconfont icon-piliangdaoru"></i></span>-->

            <el-popover
                ref="popoverDelete"
                placement="top"
                width="160"
                v-model="showDelTip">
                <p>删除该渠道和参数?</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="hideDelTip">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteChannel">确定</el-button>
                </div>
              </el-popover>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <span v-popover:popoverDelete class="el-icon-delete2 third"></span>
            </el-tooltip>
          </div>

        </div>
        <div class="channel-params col-sm-8 col-md-8 col-lg-8">
          <div class="container-fluid">
            <Item-params v-for="param in cData.params" :key="param.id" :pData="param" :cData="cData"></Item-params>
            <Item0-params v-if="is0params" :cData="cData"></Item0-params>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'Vuex';
  import ItemParams from './ItemParams'
  import Item0Params from './ItemNoParams'
  import Dropzone from 'dropZone'
  export default {
    data() {
      const dropZoneId = 'dropZone-' + Math.round(Math.random() * 1000000)
      return {
        showDelTip: false,
        files: [],
        dialogVisible: false,
        dialogOption: {
          title: '批量添加参数',
          closeOnClickModal: true,
          closeOnPressEscape: true,
          modal: true,
          size: 'small'
        },
        upExcelTypeErr: false,
        uploadSuccess: false,
        dropZoneId,
        acceptedFileTypes: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .xlsx',
        showProgress: false,
        progressBarWidth: 220,
        loadedStyle: { width: '50px' },
        unloadedStyle: { width: '60px' },
      } 
    },
    props: ['cData'],
    mounted() {
      console.log(this.cData);
    },
    methods: {
      ...mapActions(['initChannelSelectedData', 'changeSelectedCount']),
      hideDelTip() {
        this.showDelTip = false
      },
      deleteChannel() {
        this.hideDelTip()
        const data = {
          id: this.cData.channelid
        }
        const selectedCount = this.selectedCount - 1
        this.statisticApi.channel.unselectChannel(this.sid, data).then(res => res.json()).then(data => {
          this.Notification({
              // title: '成功',
              type: 'success',
              message: '已取消该渠道',
              duration: 1000,
              offset: 100
            })
          this.changeSelectedCount({selectedCount})
          this.initChannelSelectedData()
        });
      },
      addParam() {
        console.log(this.cData);
        if(this.is0params){
          let data = [{name: Math.round(Math.random() * 1000000) + '', sort: 1}]
          let send = {
            id: this.cData._id,
            data
          }
          this.statisticApi.channel.modChannelParam(this.sid, send).then(res => res.json()).then(result => {
            console.log(result);
            this.Notification({
              // title: '成功',
              type: 'success',
              message: '添加成功',
              duration: 1000,
              offset: 100
            })
            this.initChannelSelectedData()
          })
        }else{
          let maxSort = 0
          console.log(this.cData.params);
          this.cData.params.forEach(p => {
            maxSort = Math.max(maxSort, p.sort)
          })
          let newParam = {name: Math.round(Math.random() * 1000000) + '', sort: maxSort + 1}
          this.cData.params.push(newParam)

          let send = {
            id: this.cData._id,
            data: this.cData.params
          }
          this.statisticApi.channel.modChannelParam(this.sid, send).then(res => res.json()).then(result => {
            this.Notification({
              // title: '成功',
              type: 'success',
              message: '添加成功',
              duration: 1000,
              offset: 100
            })
          })
        }
        
      },
      importExcel() {
        this.dialogVisible = true
      },
      downloadExcelTemplate() {
        window.open('/build/excel/上传渠道参数模板.xlsx')
      },
      vdropzoneFilesAdded(files) {
        if(!files.length) {
          return
        }
        if(files[0].type === 'application/vnd.ms-excel'
         || files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          this.upExcelTypeErr = false
        }else{
          this.upExcelTypeErr = true
        }
      },
      vdropzoneError() {
        this.upExcelTypeErr = true
      },
      showUploadSuccess() {
        this.uploadSuccess = true
        this.showProgress = false
        this.initChannelSelectedData()
      },
      onUploadProgress(totaluploadprogress, totalBytes, totalBytesSent) {
        // 一般情况下上传进度条太快, 瞬间消失效果不好
        console.log(totaluploadprogress);
        console.log('totalBytes: ' + totalBytes);
        /*this.showProgress = true
        const load = totaluploadprogress / 100 * this.progressBarWidth
        this.loadedStyle.width = load + 'px'
        this.unloadedStyle.width = this.progressBarWidth - load + 'px'*/
      },
      dialogClose() {
        this.uploadSuccess = false
      }
    },
    computed: {
      ...mapState(['statisticApi', 'sid', 'selectedCount', 'Notification']),
      is0params() {
        return !this.cData.hasOwnProperty('params')
      }
    },
    components: {
      ItemParams,
      Item0Params,
      Dropzone
    }
  }

</script>

<style lang="less">
  @channelHeight: 122px;
  .channel-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
    .channel-row {
    }
    .channel-info {
      text-align: center;
      .img {
        vertical-align: sub;
      }
      .text {
        margin-left: 10px;
        line-height: @channelHeight;
      }
      .first{
        width:25px;
        height:25px;
        border:1px solid #c0ccde;
        background:#fff;
        color:#c0ccde;
        &:hover {
          background:#46befc;
          border:1px solid #46befc;
          color:#fff;
        }
        line-height:25px;
        text-align:center;
      }
      .second{
        width:25px;
        height:25px;
        border:1px solid #c0ccde;
        display:inline-block;
        background:#fff;
        color:#c0ccde;
        line-height:23px;
        text-align:center;
        &:hover {
          background:#46befc;
          border:1px solid #46befc;
          color:#fff;
        }
      }
      .third{
        width:25px;
        height:25px;
        border:1px solid #c0ccde;
        background:#fff;
        color:#c0ccde;
        line-height:25px;
        text-align:center;
        &:hover {
          background:#fe5656;
          border:1px solid #fe5656;
          color:#fff;
        }
      }
    }
    .channel-params {
    }
    .params-row {
      height: @channelHeight;
    }
  }
  .params-name {
    height: @channelHeight / 3;
    margin-top: @channelHeight / 3;
  }
  .qrcode {
    @size: @channelHeight * .8;
    width: @size;
    height: @size;
    float: left;
  }
  .params-qrc {
    height: @channelHeight * .8;
    margin-top: @channelHeight * .1;
  }
  .params-link {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: @channelHeight * .8;
    margin-left: -15px;
  }
  .copy-btn {
    background: #fff;
    border: 1px solid #ccc;
    margin-top: (@channelHeight - 36) / 2;
    height: 36px;
    line-height: 32px;
    width: 100%;
    border-radius: 5px;
  }
  .down-qrc {
    margin-top: (@channelHeight - 36) / 2;
  }
  .param-input{
    width: 85%;
  }
  .param-delete {
    margin-left: 4px;
    cursor: pointer;
  }
  .clearfix:after{
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0
  } 
  .clearfix{
  zoom:1
  } 
  .part-left {
    float: left;
  }
  .part-right {
    float: right;
    line-height: @channelHeight;
    .file-uploads {
      height: 25px;
      font-weight: inherit;
      overflow: inherit;
    }
    > span {
      cursor: pointer;
    }
  }
  .el-dialog__body {
    .header {
      text-align: center;
      img {
        margin-left: 20px;
      }
      a {
        margin-left: 8px;
      }
    }
    .body {
      @margin: 40px auto;
      @margin-top: 15px;
      font-size: 16px;
      text-align: center;
      .text-waring {
        color: #fe5656;
      }
      .up-excel-btn{
        /*float: left;*/
        cursor: pointer;
        width: 195px;
        height: 80px;
        line-height: 80px;
        margin: @margin;
        border:1px solid #CCC;
        border-radius:3px;
        &:hover{
          border:1px solid #46befc;
          color:#46befc;
          .el-icon-plus {
            color: #46befc;
          }
        }
        .el-icon-plus {
          color: #bfcbdd;
        }
        .text {
          margin-left: 10px;
          /*position: absolute;
          opacity: 0;
          width: 195px;
          top: 150px;*/
        }
      }
      .up-excel-suc{
        margin: @margin;
        div {
          margin-top: @margin-top;
        }
      }
      .up-excel-progress {
        margin: @margin;
        @border-radius: 3px;
        .bar {
          margin: @margin-top auto;
          width: 280px;
          height: 20px;
          .loaded {
            float: left;
            height: 100%;
            background: #44b120;
            width: 100px;
            border-radius: @border-radius 0 0 @border-radius;
          }
          .unloaded {
            float: left;
            height: 100%;
            width: 180px;
            border-radius: 0 @border-radius @border-radius 0;
            background: #dee3ed;
          }
        }
      }
      .up-excel-fail {
        margin: @margin;
      }
    }
  }

</style>
