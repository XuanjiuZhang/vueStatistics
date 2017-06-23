<style lang="less">

</style>

<template>
  <tr>
    <td width="250">
      <div class="channel-name">
        <p>{{linkData.name}}</p>
      </div>
    </td>
    <td width="65">
      <div class="cnl-name-operation" @click="addParams">
        <a href class="cnl-o-btn add-param b-tooltip hover">
          <i class="b-icon b-add-param"></i>
          <div class="tooltip top-left b-fade" role="tooltip">
            <div class="tooltip-arrow"></div>
            <div class="tooltip-inner">添加参数</div>
          </div>
        </a>
      </div>
    </td> 
    <td width="225">
      <div class="cnl-input-group"></div>
    </td>
    <td width="100">
      <div class="channel-qrcode">
        <div class="qr-code border1"></div>
        <div class="c-qr-mask dropdown">
          <a href @click="toggleShowDownload">
            <i class="b-icon b-download"></i>
          </a>
          <ul class="dropdown-menu hover-success">
            <li @click="downloadQrCode(100)"><a>100px</a></li>
            <li @click="downloadQrCode(200)"><a>200px</a></li>
            <li @click="downloadQrCode(1024)"><a>1024px</a></li>
          </ul>
        </div>
      </div>
    </td>
    <td width="240">
      <div class="channel-link ellipsis">{{linkData.url}}</div>
    </td>
    <td width="150" align="left">
      <button type="button" @click="copyLink" class="btn sm-radius co-link mr15">复制链接</button>
    </td>
    <td width="120" v-show="linkData.channelpromotion">
      <a :href="linkData.shareurl" class="btn btn-indigo-glow market-btn" target="_blank">
        <img class="app-img" :src="linkData.channelicon" alt="">推广
      </a>
    </td>
    <td width="120">
      <button type="button" class="btn btn-indigo-glow hover-red" @click="deleteExternalLink">
      <i class="b-icon b-del-cnl"></i>删除
    </button>
    </td>
  </tr>
</template>

<script>
  import { mapGetters } from 'Vuex';
  export default {
    data() {
      return {
      }
    },
    props: ['linkData', 'index'],
    mounted() {
    },
    methods: {
      addParams() {
        console.log('addParams');
      },
      deleteParams() {
        console.log('deleteParams');
      },
      toggleShowDownload() {
        console.log('toggleShowDownload');
      },
      downloadQrCode(size) {
        console.log(size);
      },
      copyLink() {
        console.log('copyLink');
      },
      deleteExternalLink() {

      }
    },
    computed: {
    },
  }

</script>