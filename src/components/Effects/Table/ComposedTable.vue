<style lang="less">
  @tableRowHeight: 45px;
  .composed-table {
    height: 800px;
    > .composed-content {
      max-height: 700px;
    }
    .even-row {
      height: @tableRowHeight;
      background: #f4f7fc;
    }
    .odd-row {
      height: @tableRowHeight;
      background: #fff;
    }
  }
  .table-pagination {
    float: right;
    margin-top: 20px;
    margin-right: 5%;
    font-size: 16px;
  }
  
</style>

<template>
  <div class="composed-table">
    <div class="center composed-content">
      <el-table
        :data="tableData"
        border
        max-height="700"
        :row-class-name="tableRowClassName"
        @sort-change="handleSortChange"
        style="width: 100%">
        <el-table-column
          type="index"
          label="排名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="channel"
          label="渠道"
          width="180">
        </el-table-column>
        <el-table-column
          prop="param"
          label="参数">
        </el-table-column>
        <el-table-column
          prop="visit"
          sortable
          :sortMethod="sortVisit"
          label="访问">
        </el-table-column>
        <el-table-column
          prop="hitsVisit"
          sortable
          :sortMethod="sortHitsVisit"
          label="访问占比(点击/访问)">
        </el-table-column>
        <el-table-column
          prop="hits"
          sortable
          :sortMethod="sortHits"
          label="点击">
        </el-table-column>
        <el-table-column
          prop="dataHits"
          sortable
          :sortMethod="sortDataHits"
          label="转化率(线索/点击)">
        </el-table-column>
        <el-table-column
          prop="data"
          sortable
          :sortMethod="sortData"
          label="线索">
        </el-table-column>
        <el-table-column
          prop="businessData"
          sortable
          :sortMethod="sortBusinessData"
          label="转化率(商机/线索)">
        </el-table-column>
        <el-table-column
          prop="business"
          sortable
          :sortMethod="sortBusiness"
          label="商机">
        </el-table-column>
        <el-table-column
          prop="businessVisit"
          :sortMethod="sortBusinessVisit"
          sortable
          label="转化率(商机/访问)">
        </el-table-column>
      </el-table>
    </div>
      
    <div class="table-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableRawData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'Vuex'
  export default {
    data() {
      return {
        currentPage: 1,
        // pageSizes: [10, 20, 50, 100],
        pageSizes: [1, 2, 5, 10],
        pageSize: 10,
        tableRawData: []
      }
    },
    computed: {
      ...mapState(['statisticApi']),
      tableData() {
        const pageData = this.tableRawData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        return pageData.map((raw, index) => {
          var hitsVisit, dataHits, businessData, businessVisit
          if(raw.visit === 0){
            hitsVisit = '0%'
          } else {
            hitsVisit = (raw.hits / raw.visit).toFixed(2) * 100  + '%'
          }

          if(raw.hits === 0){
            dataHits = '0%'
          } else {
            dataHits = (raw.data / raw.hits * 100).toFixed(2) + '%'
          }

          if(raw.data === 0){
            businessData = '0%'
          } else {
            businessData = (raw.business / raw.data).toFixed(2) * 100 + '%'
          }

          if(raw.visit === 0){
            businessVisit = '0%'
          } else {
            businessVisit = (raw.business / raw.visit * 100).toFixed(2) + '%'
          }
          return Object.assign({...raw}, { hitsVisit, dataHits, businessData, businessVisit})
        })
      }
    },
    activated() {
      console.log('5950796889898016bc711f1f');
      console.log(this.$route.params.id);
    },
    deactivated() {
      console.log('deactivated');
    },
    methods: {
      tableRowClassName(row, index) {
        return index % 2 === 0 ? 'even-row' : 'odd-row';
      },
      handleSortChange(headInfo) {
        console.log(headInfo);
      },
      sortHitsVisit(...params) {
        return parseFloat(params[0].hitsVisit) > parseFloat(params[1].hitsVisit)
      },
      sortVisit(...params) {
        return parseInt(params[0].visit) > parseInt(params[1].visit)
      },
      sortDataHits(...params) {
        return parseFloat(params[0].dataHits) > parseFloat(params[1].dataHits)
      },
      sortData(...params) {
        return parseInt(params[0].data) > parseInt(params[1].data)
      },
      sortBusinessData(...params) {
        return parseFloat(params[0].businessData) > parseFloat(params[1].businessData)
      },
      sortBusiness(...params) {
        return parseInt(params[0].business) > parseInt(params[1].business)
      },
      sortBusinessVisit(...params) {
        return parseFloat(params[0].businessVisit) > parseFloat(params[1].businessVisit)
      },
      sortHits(...params) {
        return parseInt(params[0].hits) > parseInt(params[1].hits)
      },
      handleSizeChange(size) {
        this.pageSize = size 
      },
      handleCurrentChange(current) {
        this.currentPage = current
      }
    },
    mounted() {
      this.statisticApi.effects.getChannelDetail(this.$route.params.id).then(res => {
        if(res.ok){
          return res.json()
        }
        return []
      }).then(data => {
        console.log(data)
        this.tableRawData = data
      })
    },
  }

</script>