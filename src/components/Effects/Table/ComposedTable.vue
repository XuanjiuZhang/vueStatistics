<style lang="less">
  .composed-table {
    width: 90%;
    height: 800px;
    & .composed-content {
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
    <table class="table center composed-content">
      <tr>
        <th class="active">排名</th>
        <th class="success">渠道分类</th>
        <th class="warning">渠道标示</th>
        <th class="danger">访问数</th>
        <th class="info">占比</th>
        <th class="success">线索</th>
        <th class="warning">转化率</th>
        <th class="danger">商机</th>
        <th class="info">转化率</th>
      </tr>
      <tr>
        <td class="active">...</td>
        <td class="success">...</td>
        <td class="warning">...</td>
        <td class="danger">...</td>
        <td class="info">...</td>
        <td class="success">...</td>
        <td class="warning">...</td>
        <td class="danger">...</td>
        <td class="info">...</td>
      </tr>
      <tr>
        <td class="active">...</td>
        <td class="success">...</td>
        <td class="warning">...</td>
        <td class="danger">...</td>
        <td class="info">...</td>
        <td class="success">...</td>
        <td class="warning">...</td>
        <td class="danger">...</td>
        <td class="info">...</td>
      </tr>
      <tr>
        <td class="active">...</td>
        <td class="success">...</td>
        <td class="warning">...</td>
        <td class="danger">...</td>
        <td class="info">...</td>
        <td class="success">...</td>
        <td class="warning">...</td>
        <td class="danger">...</td>
        <td class="info">...</td>
      </tr>
      <tr>
        <td class="active">...</td>
        <td class="success">...</td>
        <td class="warning">...</td>
        <td class="danger">...</td>
        <td class="info">...</td>
        <td class="success">...</td>
        <td class="warning">...</td>
        <td class="danger">...</td>
        <td class="info">...</td>
      </tr>
      <tr>
        <td class="active">...</td>
        <td class="success">...</td>
        <td class="warning">...</td>
        <td class="danger">...</td>
        <td class="info">...</td>
        <td class="success">...</td>
        <td class="warning">...</td>
        <td class="danger">...</td>
        <td class="info">...</td>
      </tr>
    </table>
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
        currentPage: 0
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