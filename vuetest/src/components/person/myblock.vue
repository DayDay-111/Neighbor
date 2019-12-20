<template>
<div class='outside'>
    <div class="left"></div>
    <div class="center">
        <template v-if='state == 1'>
        <el-alert 
    title="已被拒绝"
    type="error"
    description="可以点击下方按钮选择新block加入"
    :closable="false"
    show-icon>
  </el-alert>
  <br>
  <div style="width:100%" class="middle_x">
      <el-button @click='state = 2' type="primary" round size="small"> chooseBlock</el-button>
  </div>
    </template>
  <el-alert v-else-if='state == 3'
    title="申请中"
    type="info"
    description="耐心等待审核"
    :closable="false"
    show-icon>
  </el-alert>
  <template v-else-if='state == 2'>
  <el-card style="margin-bottom:20px" class="box-card" shadow="hover" v-for="item in blockList">
    <div>blockName:{{item.bname}}</div>
            <el-divider></el-divider>
            <div>blockAddr:<address title="check" style="display:inline-block">{{item.latitude}}</address></div>
            <el-divider></el-divider>
            <div>hoodName:{{item.hid}}</div>
            <el-divider></el-divider>
            <div>hoodAddr:<address title="check" style="display:inline-block">{{item.latitude}}</address></div>
            <el-divider></el-divider>
  </el-card>
  </template>
  <el-card class="box-card" shadow="hover"  v-else-if='state == 4'>
    <div>blockName:{{perBlock.bname}}</div>
            <el-divider></el-divider>
            <div>blockAddr:<address title="check" style="display:inline-block">{{profile.latitude}}</address></div>
            <el-divider></el-divider>
            <div>hoodName:{{perBlock.hid}}</div>
            <el-divider></el-divider>
            <div>hoodAddr:<address title="check" style="display:inline-block">{{profile.latitude}}</address></div>
            <el-divider></el-divider>

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
              blockList:[],
              perBlock:{},
              state:'4',
            editPerForm:{},
            editPerVisible:false,
            isEdit:'visibility:hidden',
              circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          }
      },
    methods: {
      editProfile(){

      },
      
    },
    computed:{
      profile(){
        return this.$store.state.profile
      }
    },
    mounted(){
        var map = new AMap.Map("block", {
              zoom:18
            });
        this.$fetch(this._url.blockstate+`?uid=${this.profile.uid}`).then(res =>{
              this.state=res.data
            })
        this.$fetch(this._url.findblock+`?uid=${this.profile.uid}`).then(res =>{
              this.perBlock=res.data
            })
        this.$fetch(this._url.blockList).then(res =>{
              this.blockList=res.data
            })
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