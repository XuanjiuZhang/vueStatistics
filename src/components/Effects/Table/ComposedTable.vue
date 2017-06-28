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
        :data="tableData3"
        border
        max-height="700"
        :row-class-name="tableRowClassName"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="排名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="渠道"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="参数">
        </el-table-column>
        <el-table-column
          prop="address"
          sortable
          label="访问">
        </el-table-column>
        <el-table-column
          prop="address"
          sortable
          :sortMethod="sortClickVisit"
          label="访问占比(点击/访问)">
        </el-table-column>
        <el-table-column
          prop="address"
          sortable
          label="点击">
        </el-table-column>
        <el-table-column
          prop="address"
          sortable
          label="转化率(线索/点击)">
        </el-table-column>
        <el-table-column
          prop="address"
          sortable
          label="线索">
        </el-table-column>
        <el-table-column
          prop="address"
          sortable
          label="转化率(商机/线索)">
        </el-table-column>
        <el-table-column
          prop="address"
          sortable
          label="商机">
        </el-table-column>
        <el-table-column
          prop="address"
          sortable
          label="转化率(商机/线索)">
        </el-table-column>
      </el-table>
    </div>
      
    <div class="table-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'Vuex'
  export default {
    data() {
      const table = [{
          date: '2016-05-03',
          name: '王小虎',
          address: '84,226'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '44,226'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '446'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '48,226'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '464,226'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '84,226'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '674,226'
        }]
      return {
        currentPage: 1,
        tableData3: table
      }
    },
    computed: {
    },
    activated() {
      console.log('activated!');
      console.log(this.$route.params.id);
    },
    deactivated() {
      console.log('deactivated');
    },
    methods: {
      tableRowClassName(row, index) {
        return index % 2 === 0 ? 'even-row' : 'odd-row';
      },
      sortClickVisit(data, nextData) {
        console.log('sortClickVisit');
        console.log(this.$router.params);

      },
      handleSizeChange() {

      },
      handleCurrentChange() {

      }
    },
    mounted() {
    },
  }

</script>