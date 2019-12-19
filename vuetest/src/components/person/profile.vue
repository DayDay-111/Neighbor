<template>
<div class='outside'>
    <div class="left"></div>
    <div class="center">
        <el-card   class="box-card" shadow="hover" @mouseenter.native="isEdit = 'visibility:visible'" @mouseleave.native="isEdit = 'visibility:hidden'">
          <i @click="editProfile" style='float:right;' title="edit" :style="isEdit" class="el-icon-edit"></i>
          <div style="width:100%" class="middle_x">
            <el-avatar size="large" :src="circleUrl"></el-avatar>
          </div>
          <div>firstName:{{profile.firstName}}</div>
            <el-divider></el-divider>
            <div>lastName:{{profile.lastName}}</div>
            <el-divider></el-divider>
            <div>email:{{profile.email}}</div>
            <el-divider></el-divider>
            <div>address:<address style="display:inline-block">{{profile.latitude}}</address></div>
            <el-divider></el-divider>
            <div>lastlogtime:{{profile.lastlogtime}}</div>
            <el-divider></el-divider>
            <div>introduction:{{profile.introduction}}</div>
    </el-card>
    </div>
    <div class="right"></div>
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
</div>
</template>
<script>
  export default {
      data(){
          return{
            editPerForm:{},
            editPerVisible:false,
            isEdit:'visibility:hidden',
              circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          }
      },
    methods: {
      editProfile(){

      },
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
    computed:{
      profile(){
        return this.$store.state.profile
      }
    }
  }
</script>
<style scoped>
@import '../../assets/css/flex';
.outside{width: 100%;min-height:100px }
.right{width: 14%;min-height:100px;float: left; }
.left{width: 14%;min-height:100px;float: left;  }
.center{width: 72%;min-height:100px;float: left;  }
.item {padding: 18px 0;}
</style>