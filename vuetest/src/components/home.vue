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
          <el-dropdown-item command="c">查看个人信息</el-dropdown-item>
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
<el-dialog
  title="修改个人信息"
  :visible.sync="editPerVisible"
  width="50%">
  <el-form ref="form" :model="editPerForm" label-width="80px">
  <el-form-item label="email">
    <el-input v-model="editPerForm.email"></el-input>
  </el-form-item>
  <el-form-item label="FirstName">
    <el-input v-model="editPerForm.FirstName"></el-input>
  </el-form-item>
  <el-form-item label="LastName">
    <el-input v-model="editPerForm.LastName"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editPerVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="查看个人信息"
  :visible.sync="editPerVisible"
  width="50%">
  <el-form ref="form" :model="editPerForm" label-width="80px">
  <el-form-item label="email">
    <el-input v-model="editPerForm.email"></el-input>
  </el-form-item>
  <el-form-item label="FirstName">
    <el-input v-model="editPerForm.FirstName"></el-input>
  </el-form-item>
  <el-form-item label="LastName">
    <el-input v-model="editPerForm.LastName"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editPerVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
import { mapMutations,mapState } from 'vuex'
  export default {
    data(){
      return{
        editPerForm:{
          FirstName:'',LastName:'',email:''
        },
        editPerVisible:false,
        isCollapse:true,
        checkPerVisible:false
      }
    },
    methods: {
      ...mapMutations(['clearUid']),
      handleCommand(command) {
        switch(command){
          case 'a':
            this.$fetch(this._url.profile,this.uid).then(res =>{
              if(res.data=='success'){
                this.editPerVisible = true
            
              }
            })
            break;
          case 'b':
            this.goTo('/signin')
            this.$fetch(this._url.exit).then(res =>{
              if(res.data=='success'){
                this.$store.commit('clearUid')
            
              }
            })

            break;
          case 'c':
            this.checkPerVisible = true
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
    computed:{
      ...mapState(['uid'])
    },
    mounted(){
      
    }
  }
</script>
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