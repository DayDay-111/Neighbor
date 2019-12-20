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
      <el-menu-item @click="goTo('/search')" index="5" >
        <i class="el-icon-document"></i>
        <span slot="title" >search</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="c">创建话题</el-dropdown-item>
         <el-dropdown-item command="a">查看社区加入申请</el-dropdown-item>
         <el-dropdown-item command="d">查看好友请求</el-dropdown-item>
          <el-dropdown-item command="b">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{profile.FirstName+' '+profile.LastName}}</span>
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
    <el-form-item  label="type">
    <el-select style="width:100%" v-model="addSubForm.type" @change="handlechange" placeholder="请选择">
    <el-option
      v-for="item in typelist"
      :key="item.val"
      :label="item.name"
      :value="item.val">
    </el-option>
  </el-select>
  </el-form-item>
  <template v-if="stype==1">
    <el-form-item label="friend">
    <el-select style="width:100%" v-model="addSubForm.touid" placeholder="请选择">
    <el-option
      v-for="item in friendList"
      :key="item.value"
      :label="item.FirstName+' '+item.LastName"
      :value="item.uid">
    </el-option>
  </el-select>
  </el-form-item>
  </template>
  <template v-else-if="stype==2">
    <el-form-item label="neighbor">
    <el-select style="width:100%" v-model="addSubForm.touid" placeholder="请选择">
    <el-option
      v-for="item in neighborList"
      :key="item.value"
      :label="item.FirstName+' '+item.LastName"
      :value="item.uid">
    </el-option>
  </el-select>
  </el-form-item>
  </template>
  <el-form-item label="title">
    <el-input v-model="addSubForm.title"></el-input>
  </el-form-item>
  <el-form-item label="text">
    <el-input v-model="addSubForm.text"></el-input>
  </el-form-item>
  <el-form-item label="address" >
    <el-input v-model="addSubForm.address" @keyup.enter="searchLocation" @input="searchLocation" id="tipinput"></el-input>
    <el-card v-if="cardShow" style="width:100%;position:absolute;z-index:1000" id="r-resultedit" >
            </el-card>
  </el-form-item>
  <el-form-item>
    <div id='map' style="width:100%;height:200px">
  </div>
  </el-form-item>
  
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addSubVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSub()">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="appList"
  :visible.sync="applyVisible"
  width="50%">
  <el-table :data="applylist" v-if="applylist.length>0">
    <el-table-column
    prop="name"
      label="name">
      
    </el-table-column>
    <el-table-column
    prop="title"
      label="block">
      
    </el-table-column>
    <el-table-column
      label="opt"
      >
      <template slot-scope="scope">
        <el-button
          type="primary" @click="agreeApply(1,scope.row)" size="mini">agree</el-button>
        <el-button
          type="danger" @click="agreeApply(2,scope.row)" size="mini">reject</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-alert 
    title="暂无申请"
    type="info"
    description="当前没有申请加入社区的人"
    :closable="false"
    show-icon></el-alert>
</el-dialog >
<el-dialog
  title="appList"
  :visible.sync="applyFriendListvis"
  width="50%">
  <el-table :data="applyFriendList" v-if="applyFriendList.length>0">
    <el-table-column
    prop="name"
      label="name">
      
    </el-table-column>
    <el-table-column
      label="opt"
      >
      <template slot-scope="scope">
        <el-button
          type="primary" @click="agreeFriend(1,scope.row)" size="mini">agree</el-button>
        <el-button
          type="danger" @click="agreeFriend(2,scope.row)" size="mini">reject</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div v-else>
  <el-alert 
    title="暂无申请"
    type="info"
    description="当前没有申请您为好友的人"
    :closable="false"
    show-icon></el-alert>
</div>
</el-dialog >

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
          touid:'',title:'',text:'',type:'3',address:''
        },
        addSubVisible:false,
        latitude:'',
        longitude:'',
        Lat:'',
        Lng:'',
        stype:'3',
        neighborList:[],
        friendList:[],
        cardShow:false,
        adcode:'',
        applyVisible:false,
        applylist:[{name:'222',title:'333'}],
        applyFriendList:[],
        applyFriendListvis:false
      }
    },
    methods: {
      ...mapMutations(['clearUid']),
      handlechange(val){
        this.stype = val
      },
      agreeApply(agree,row){
        this.$fetch(`agreeApply?uid=${this.profile.uid}&applyuid=${this.row.applyuid}&agree=${agree}&bid=${this.row.bid}`).then(res =>{
          if(res.data=='fail'){
                this.$message.error('操作失败');
            }else{
              this.$fetch(`user/applyRequest?uid=${this.profile.uid}`).then(res =>{
          if(res.data=='fail'){
                this.$message.error('there is no message');
            }else{
               this.applylist=JSON.parse(JSON.stringify(res.data)) 
            }
            })
              if(agree==1){
                this.$message({
                  message: '已同意',
                  type: 'success'
                });
              }else{
                this.$message({
                  message: '已拒绝',
                  type: 'success'
                });
              }
               
            }
            })
      },
      agreeFriend(agree,row){
        this.$fetch(`agreeFriend?uid=${this.profile.uid}&applyuid=${this.row.replyuid}&agree=${agree}`).then(res =>{
          if(res.data=='fail'){
                this.$message.error('操作失败');
            }else{

              if(agree==1){
                this.$message({
                  message: '已同意',
                  type: 'success'
                });
              }else{
                this.$message({
                  message: '已拒绝',
                  type: 'success'
                });
              }
               
            }
            })
      },
      searchLocation(){
        var map = window.map
        let _this = this
          //搜索输入自动提示
          AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'], function(){
            var autoOptions = {
              city: _this.adcode,
              input: "tipinput",
              output:"r-resultedit",
            }
            var autoComplete= new AMap.Autocomplete(autoOptions);
            autoComplete.search(_this.addSubForm.address, function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                _this.cardShow = true
              }
            })
            var placeSearch = new AMap.PlaceSearch({
              city:_this.adcode,
              map:map
            })
            AMap.event.addListener(autoComplete, "select",e => {
              _this.addSubForm.address = e.poi.address
              _this.latitude = e.poi.location.lat
              _this.longitude = e.poi.location.lng
              placeSearch.setCity(e.poi.adcode);
              placeSearch.search(e.poi.name)
            });
          })
        
        
      },
      handleCommand(command) {
        switch(command){
          case 'a':
            this.applyVisible = true
            this.$fetch(`user/applyRequest?uid=${this.profile.uid}`).then(res =>{
          if(res.data=='fail'){
                this.$message.error('there is no message');
            }else{
               this.applylist=JSON.parse(JSON.stringify(res.data)) 
            }
            })
            break
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
              //ip定位
            AMap.plugin('AMap.CitySearch', function () {
              var citySearch = new AMap.CitySearch()
              citySearch.getLocalCity(function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  if (_this.adcode=='') {
                    _this.adcode=result.adcode
                  }
                  map.setCity(result.adcode)
                }
              })
            })
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
             window.map = map
            })
           
            break;
            case 'd':
              this.applyFriendListvis=true
              this.$fetch(`applyFriendList?uid=${this.profile.uid}`).then(res =>{
          if(res.data=='fail'){
                this.$message.error('there is no message');
            }else{
               this.applyFriendList=JSON.parse(JSON.stringify(res.data)) 
            }
            })
        }
      },
      addSub(){
        let {touid,title,type,text} = this.addSubForm
        if(this.stype<3){
           this.$fetch(this._url.createpersonSubject+`?uid=${this.profile.uid}&touid=${this.profile.touid}&title=${this.profile.title}&type=${this.profile.type}&text=${this.profile.text}&longitude=${this.longitude}&latitude=${this.latitude}`).then(res =>{
          if(res.data=='fail'){
                this.$message.error('fail');
            }else{
               this.$message({
                  message: 'send success',
                  type: 'success'
                });
            }
            })
        }else{
          this.$fetch(this._url.createScopeSubject+`?uid=${this.profile.uid}&title=${this.profile.title}&type=${this.profile.type}&text=${this.profile.text}&longitude=${this.longitude}&latitude=${this.latitude}`).then(res =>{
          if(res.data=='fail'){
                this.$message.error('fail');
            }else{
               this.$message({
                  message: 'send success',
                  type: 'success'
                });
            }
            })
        }
      },
      goTo(path){
          this.$router.push(path);
      },
      
    },
    computed:{
      ...mapState(['profile'])
    },
    mounted(){
               
               this.$fetch(this._url.neighborList+`?uid=${this.profile.uid}`).then(res =>{
          if(res.data=='fail'){
                this.$message.error('there is no message');
            }else{
               this.neighborList=JSON.parse(JSON.stringify(res.data)) 
            }
            })
               this.$fetch(this._url.friendList+`?uid=${this.profile.uid}`).then(res =>{
          if(res.data=='fail'){
                this.$message.error('there is no message');
            }else{
               this.friendList=JSON.parse(JSON.stringify(res.data)) 
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