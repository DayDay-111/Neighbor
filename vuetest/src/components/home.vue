<template>
<div style='background-color:rgb(238, 241, 246)'>
  <el-container style="min-height: 670px; border: 1px solid #eee">
  <el-aside width="200px">
    <el-menu :default-openeds="[]" style="background-color:#DCDFE6">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>Person</template>
          <el-menu-item index="1-1" >proflie</el-menu-item>
          <el-menu-item index="1-2">myblock</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>Hood&Block</template>
          <el-menu-item index="2-1" @click="goTo('/subject')">Block subject</el-menu-item>
          <el-menu-item index="2-2">Hood subject</el-menu-item>
          <el-menu-item index="2-3">create subject</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>friend</template>
          <el-menu-item index="3-1">FriendList</el-menu-item>
          <el-menu-item index="3-2" @click="goTo('/friendSub')">Friend subject</el-menu-item>
          <el-menu-item index="3-3">create subject</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>neighbor</template>
          <el-menu-item index="4-1">neighbor</el-menu-item>
          <el-menu-item index="4-2">neighbor subject</el-menu-item>
          <el-menu-item index="4-3">create subject</el-menu-item>
      </el-submenu>
      <el-menu-item index="5" >
        <i class="el-icon-document"></i>
        <span slot="title">search</span>
      </el-menu-item>
      <el-menu-item index="6" >
        <i class="el-icon-document"></i>
        <span slot="title">exit</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">修改个人信息</el-dropdown-item>
          <el-dropdown-item command="b">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</el-container>
</div>
</template>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    background-color:#DCDFE6;
    color: #333;
  }
</style>
<script>
  export default {
    data(){
      return{
        isCollapse:true
      }
    },
    methods: {
      handleCommand(command) {
        switch(command){
          case 'a':
            break;
          case 'b':
            this.goTo('/signin')
            break;
        }
      },
      goTo(path){
          this.$router.replace(path);
      },
      profile(){
        this.$fetch(this._url.login,this.ruleForm).then(res =>{
              debugger
              
            })
      }
    },
    mounted(){
      
    }
  }
</script>