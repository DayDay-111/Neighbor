<template>
    <el-container style="min-height:650px ; border: 1px solid #eee">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
      </el-header>
      <el-main>
        <div class="left middle_xy">
            <img src="@/assets/img/login.jpg" alt="">
        </div>
        <div class="right middle_xy">
            <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
    export default{
    }
</script>
<style>
@import '../../assets/css/flex.css';
    .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
      
    }
    .el-aside {
      color: #333;
    }

    .left{float: left;width:65%;height: 560px;}
    .right{float: left;width: 35%;height: 560px;}
  </style>