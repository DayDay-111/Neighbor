<template>
<div style='background-color:rgb(238, 241, 246)'>
  <el-container style="min-height: 670px; border: 1px solid #eee">
  <el-aside width="200px">
    <el-menu default-active="1-1" :default-openeds="[1-1]" style="background-color:#DCDFE6">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>Person</template>
          <el-menu-item index="1-1" @click="goTo('/profile')">proflie</el-menu-item>
          <el-menu-item index="1-2" @click="goTo('/myblock')">myblock</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>Hood&Block</template>
          <el-menu-item index="2-1" @click="goTo('/blockSubject')">Block subject</el-menu-item>
          <el-menu-item index="2-2" @click="goTo('/hoodSubject')">Hood subject</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>friend</template>
          <el-menu-item index="3-1" @click="goTo('/friendList')">FriendList</el-menu-item>
          <el-menu-item index="3-2" @click="goTo('/friendSub')">Friend subject</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>neighbor</template>
          <el-menu-item index="4-1" @click="goTo('/neighbor')">neighbor</el-menu-item>
          <el-menu-item index="4-2" @click="goTo('/neighborSub')">neighbor subject</el-menu-item>
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
          <el-dropdown-item command="c">创建话题</el-dropdown-item>
         
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
  title="add subject"
  :visible.sync="addSubVisible"
  width="50%" >
  <el-form ref="form" :model="addSubForm" label-width="100px" style="padding:0 50px">
  <el-form-item label="friend">
    <el-select style="width:100%" v-model="addSubForm.touid" placeholder="请选择">
    <el-option
      v-for="item in bslist"
      :key="item.value"
      :label="item.FirstName+' '+item.LastName"
      :value="item.uid">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item  label="type">
    <el-select style="width:100%" v-model="addSubForm.type" placeholder="请选择">
    <el-option
      v-for="item in typelist"
      :key="item.val"
      :label="item.name"
      :value="item.val">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="title">
    <el-input v-model="addSubForm.title"></el-input>
  </el-form-item>
  <el-form-item label="text">
    <el-input v-model="addSubForm.text"></el-input>
  </el-form-item>
  <el-form-item label="address">
    <el-input v-model="addSubForm.address"></el-input>
  </el-form-item>
  <el-form-item>
    <div id='map' style="width:100%;height:100px">
  </div>
  </el-form-item>
  
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addSubVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSub()">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
import { mapMutations,mapState } from 'vuex'
  export default {
    data(){
      return{
        typelist:[{name:'好友话题',val:'1'},{name:'邻居话题',val:'2'},{name:'block话题',val:'3'},{name:'hood话题',val:'4'}],
        bslist:[],
        addSubForm:{
          touid:'',title:'',text:'',type:'',address:''
        },
        addSubVisible:false,
        latitude:'',
        longitude:'',
        Lat:'',
        Lng:''
      }
    },
    methods: {
      ...mapMutations(['clearUid']),
      handleCommand(command) {
        switch(command){
          case 'b':
            this.goTo('/signin')
            this.$store.commit('clearUid')
            break;
          case 'c':
            this.addSubVisible = true
            let _this=this
            _this.$nextTick(() =>{
              let map = new AMap.Map("map", {
                zoom:18
              });
              var marker = new AMap.Marker()
            map.on('click',e => {
              _this.latitude = e.lnglat.getLat()
              _this.longitude = e.lnglat.getLng() 
              _this.Lat=e.lnglat.getLat()
              _this.Lng=e.lnglat.getLng() 
              var lnglat  = [_this.Lng,_this.Lat]
              map.add(marker);
              marker.setPosition(lnglat);
              AMap.plugin("AMap.Geocoder", function(){
                var geocoder = new AMap.Geocoder({
                    radius: 1000 
                });
                geocoder.getAddress(lnglat, function(status, result) {
                    if (status === 'complete'&&result.regeocode) {
                      let res = result.regeocode.addressComponent
                        _this.addSubForm.address = res.township+res.street+res.streetNumber
                    }else{
                        log.error('根据经纬度查询地址失败')
                    }
                });
              })
            })
            })
            
            break;
        }
      },
      addSub(){
        
      },
      goTo(path){
          this.$router.push(path);
      },
      profile(){
        this.$fetch(this._url.login+`?`).then(res =>{
              debugger
              
            })
      }
    },
    computed:{
      ...mapState(['profile'])
    },
    mounted(){
               this.$fetch(this._url.HoodMemberList+`?uid=${this.profile.uid}`).then(res =>{
          if(res.data=='fail'){
                this.$message.error('there is no message');
            }else{
               this.bslist=JSON.parse(JSON.stringify(res.data)) 
            }
            })
        
            
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