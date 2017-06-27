<style lang="less">
  .composed-table {
    height: 800px;
    > .composed-content {
      height: 700px;
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
    <!--<table class="table center composed-content">
      <tr>
        <th class="active">排名</th>
        <th class="success">渠道</th>
        <th class="warning">参数</th>
        <th class="danger">访问占比</th>
        <th class="info">点击</th>
        <th class="warning">转化率</th>
        <th class="success">线索</th>
        <th class="info">转化率</th>
        <th class="danger">商机</th>
        <th class="info">转化率</th>
      </tr>
      <tr>
        <td class="active">1</td>
        <td class="success">展现-网盟-百度网盟</td>
        <td class="warning">溯源参数</td>
        <td class="info">28%</td>
        <td class="danger">834,445</td>
        <td class="info">28%</td>
        <td class="success">3,398</td>
        <td class="warning">29%</td>
        <td class="danger">423</td>
        <td class="info">10%</td>
      </tr>
      <tr>
        <td class="active">1</td>
        <td class="success">展现-网盟-百度网盟</td>
        <td class="warning">溯源参数</td>
        <td class="info">28%</td>
        <td class="danger">834,445</td>
        <td class="info">28%</td>
        <td class="success">3,398</td>
        <td class="warning">29%</td>
        <td class="danger">423</td>
        <td class="info">10%</td>
      </tr>
      <tr>
        <td class="active">1</td>
        <td class="success">展现-网盟-百度网盟</td>
        <td class="warning">溯源参数</td>
        <td class="info">28%</td>
        <td class="danger">834,445</td>
        <td class="info">28%</td>
        <td class="success">3,398</td>
        <td class="warning">29%</td>
        <td class="danger">423</td>
        <td class="info">10%</td>
      </tr>
      <tr>
        <td class="active">1</td>
        <td class="success">展现-网盟-百度网盟</td>
        <td class="warning">溯源参数</td>
        <td class="info">28%</td>
        <td class="danger">834,445</td>
        <td class="info">28%</td>
        <td class="success">3,398</td>
        <td class="warning">29%</td>
        <td class="danger">423</td>
        <td class="info">10%</td>
      </tr>
      <tr>
        <td class="active">1</td>
        <td class="success">展现-网盟-百度网盟</td>
        <td class="warning">溯源参数</td>
        <td class="info">28%</td>
        <td class="danger">834,445</td>
        <td class="info">28%</td>
        <td class="success">3,398</td>
        <td class="warning">29%</td>
        <td class="danger">423</td>
        <td class="info">10%</td>
      </tr>
      <tr>
        <td class="active">1</td>
        <td class="success">展现-网盟-百度网盟</td>
        <td class="warning">溯源参数</td>
        <td class="info">28%</td>
        <td class="danger">834,445</td>
        <td class="info">28%</td>
        <td class="success">3,398</td>
        <td class="warning">29%</td>
        <td class="danger">423</td>
        <td class="info">10%</td>
      </tr>
    </table>-->
    <div class="center composed-content">
      <el-table
        :data="tableData3"
        height="100%"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
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
  export default {
    data() {
      return {
        currentPage: 1,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods: {
      handleSizeChange() {

      },
      handleCurrentChange() {

      }
    },
    mounted() {
    },
  }

</script>