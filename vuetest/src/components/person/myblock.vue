<template>
<div class='outside'>
    <div class="left"></div>
    <div class="center">
        <template v-if='state == 1'>
        <el-alert 
    title="has been refused"
    type="error"
    description="You can click on the button to choose new blcok to join"
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
  <el-card style="margin-bottom:20px;min-height:500px" class="box-card" shadow="hover">
    <el-table :data="blockList">
    <el-table-column
    prop="bname"
      label="name">
    </el-table-column>
    <!-- <el-table-column
    prop="address"
      label="address"> -->
    </el-table-column>
    <el-table-column
      label="opt"
      >
      <template slot-scope="scope">
        <el-button
          type="primary" @click="applyBlock(scope.row)" size="mini">apply</el-button>
      </template>
    </el-table-column>
  </el-table>
   
  </el-card>
  </template>
  <el-card style=" min-height:500px" class="box-card" shadow="hover"  v-else-if='state == 4'>
    <div>blockName:{{perBlock.bname}}
      <el-button style="float:right" type="primary" @click="BlockMemberList" size="mini">look member</el-button>
    </div>
            <el-divider></el-divider>
            <div>blockAddr:<address title="check" style="display:inline-block">{{blockaddr}}</address></div>
            <el-divider></el-divider>
            <div>hoodName:{{perBlock.hname}}
              <el-button style="float:right" type="primary" @click="HoodMemberList" size="mini">look member</el-button>
            </div>
            <el-divider></el-divider>
            <div>hoodAddr:<address title="check" style="display:inline-block">{{hoodaddr}}</address></div>
            <el-divider></el-divider>
            <div class="middle_x" style="width:100%">
              <el-button
          type="primary" @click="exitBlock" size="mini">exitBlock</el-button>
            </div>
            
        
  </el-card>
    </div>
    <div class="right"></div>
    <el-dialog
  title="modify personal infomation"
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
    <el-button @click="editPerVisible = false">cancel</el-button>
    <el-button type="primary" @click="dialogVisible = false">submit</el-button>
  </span>
</el-dialog>
<el-dialog
title="appList"
  :visible.sync="BlockMemberListVis"
  width="50%">
  <el-table :data="bmlist">
    <el-table-column width="100"
    prop="FirstName"
      label="FirstName">
      
    </el-table-column>
   
      <el-table-column width="100"
      prop="LastName"
        label="LastName">
        
      </el-table-column>
    <el-table-column
    prop="email"
      label="email">
      
    </el-table-column>
    <el-table-column
      label="opt"
      >
      <template slot-scope="scope">
        <el-button
          type="primary" @click="applyFriend(scope.row)" size="mini"> AddFriend</el-button>
        <el-button
          type="primary" @click="addNeighbor(scope.row)" size="mini"> addNeighbor</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-dialog >
<el-dialog
title="HoodMember"
  :visible.sync="HoodMemberListVis"
  width="50%">
  <el-table :data="hmlist">
    <el-table-column width="100"
    prop="FirstName"
      label="FirstName">
      
    </el-table-column>
   
      <el-table-column width="100"
      prop="LastName"
        label="LastName">
        
      </el-table-column>
    <el-table-column
    prop="email"
      label="email">
      
    </el-table-column>
    <el-table-column
      label="opt" 
      >
      <template slot-scope="scope">
        <el-button
          type="primary" @click="applyFriend(scope.row)" size="mini"> AddFriend</el-button>
        <el-button
          type="primary" @click="addNeighbor(scope.row)" size="mini"> addNeighbor</el-button>
      </template>
    </el-table-column>
    
  </el-table>
</el-dialog >
</div>
</template>
<script>
  export default {
      data(){
          return{
            hmlist:[],
            bmlist:[],
              blockList:[],
              perBlock:{},
              perHood:{},
              state:'4',
            editPerForm:{},
            editPerVisible:false,
            isEdit:'visibility:hidden',
              circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              HoodMemberListVis:false,
              BlockMemberListVis:false,
              blockaddr:'',
              hoodaddr:''
          }
      },
    methods: {
      editProfile(){

      },
      exitBlock(){
        this.$fetch(`exitBlock?uid=${this.profile.uid}`).then(res =>{
            if(res.data=='fail'){
                this.$message.error('fail');
            }else{
               this.$message({
                  message: '已退出',
                  type: 'success'
                });
                this.$fetch(this._url.blockstate+`?uid=${this.profile.uid}`).then(res =>{
              this.state=res.data
            })
            }
            })
      } ,
      applyBlock(row){
        alert(111)
        alert(row.bid)
        this.$fetch(`applyBlock?uid=${this.profile.uid}&bid=${row.bid}`).then(res =>{
            if(res.data=='fail'){
                this.$message.error('fail');
            }else{
               this.$message({
                  message: '已申请',
                  type: 'success'
                });
            }
            })
      },
      addNeighbor(row){
        this.$fetch(`addNeighbor?uid=${this.profile.uid}&touid=${row.uid}`).then(res =>{
            if(res.data=='fail'){
                this.$message.error('you have already add this neighor');
            }else{
               this.$message({
                  message: 'successfully apply',
                  type: 'success'
                });
            }
            })
      },
      HoodMemberList(){
        this.$fetch(this._url.HoodMemberList+`?uid=${this.profile.uid}`).then(res =>{
          if(res.data=='fail'){
                this.$message.error('there is no message');
            }else{
              this.HoodMemberListVis = true
               this.hmlist=JSON.parse(JSON.stringify(res.data)) 
            }
            })
      },
      BlockMemberList(){
        this.$fetch(`BlockMemberList?uid=${this.profile.uid}`).then(res =>{
          if(res.data=='fail'){
                this.$message.error('there is no message');
            }else{
              
              this.BlockMemberListVis =true
               this.bmlist=JSON.parse(JSON.stringify(res.data)) 
            }
            })
      },
      applyFriend(row){
        this.$fetch(`applyFriend?uid=${this.profile.uid}&replyuid=${row.uid}`).then(res =>{
          if(res.data=='fail1'){
                this.$message.error('this person has applied you,please check the apply list');
            }
            else if(res.data=='fail2'){
              this.$message.error('you are friend already');
            }
            else if(res.data=='fail3'){
              this.$message.error('you have applied');
            }
            else{
              this.$message({
                  message: 'successfully apply',
                  type: 'success'
                });
            }
            })
      },
     getaddr(lng,lat){
        var that =this
       
        AMap.plugin("AMap.Geocoder", function(){
                var geocoder = new AMap.Geocoder({
                    radius: 1000 
                });
                geocoder.getAddress([lng,lat], function(status, result) {
                    if (status === 'complete'&&result.regeocode) {
                      
                      let res = result.regeocode.addressComponent
                      that.hoodaddr = res.township+res.street+res.streetNumber
                      
                    }else{
                      
                        that.$message.error('根据经纬度查询地址失败')
                    }
                });
              })
              
              
      },
       getaddrb(lng,lat){
        var that =this
       
      AMap.plugin("AMap.Geocoder", function(){
                var geocoder = new AMap.Geocoder({
                    radius: 1000 
                });
                geocoder.getAddress([lng,lat], function(status, result) {
                    if (status === 'complete'&&result.regeocode) {
                      
                      let res = result.regeocode.addressComponent
                      that.blockaddr = res.township+res.street+res.streetNumber
                      
                    }else{
                      
                        that.$message.error('根据经纬度查询地址失败')
                    }
                });
              })
              
              
      }
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
              console.log(this.perBlock)
             
                this.hoodaddr=this.getaddr(res.data.hlonggitude1,res.data.hlatitude1)
               this.getaddrb(res.data.longitude1,res.data.latitude1)
          
              
            })
            this.$fetch(this._url.findhood+`?uid=${this.profile.uid}`).then(res =>{
              this.perHood=res.data
              
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