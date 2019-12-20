<template>
<div class='outside'>
    <div class="left"></div>
    <div class="center">
        <el-card  style=" min-height:500px" class="box-card" shadow="hover" @mouseenter.native="isEdit = 'visibility:visible'" @mouseleave.native="isEdit = 'visibility:hidden'">
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
  <el-form ref="form" :model="editPerForm" label-width="100px">
  <el-form-item label="FirstName">
    <el-input v-model="editPerForm.FirstName"></el-input>
  </el-form-item>
  <el-form-item label="LastName">
    <el-input v-model="editPerForm.LastName"></el-input>
  </el-form-item>
  <el-form-item label="gender">
    <el-input v-model="editPerForm.gender"></el-input>
    <el-select style="width:100%" v-model="editPerForm.gender" placeholder="请选择">
    <el-option
      v-for="item in typelist"
      :key="item.val"
      :label="item.name"
      :value="item.val">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="address" >
    <el-input v-model="address" @keyup.enter="searchLocation" @input="searchLocation" id="tipinput"></el-input>

    <el-card v-if="cardShow" style="width:100%;position:absolute;z-index:1000" id="r-resultedit" >
            </el-card>
  </el-form-item>
  <el-form-item>
    <div id='map' style="width:100%;height:200px">
  </div>
  </el-form-item>
  <el-form-item label="introduction" >
    <el-input v-model="editPerForm.introduction" type="textarea"></el-input>
  </el-form-item>
  user/update?uid=1&password=123&FirstName=123&LastName=134&longitude=11.1&latitude=11&gender=1&introduction=123
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editPerVisible = false">取 消</el-button>
    <el-button type="primary" @click="update">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
  export default {
      data(){
          return{
            typelist:[{name:'male',val:1},{name:'female',val:1}],
            address:'',
            latitude:'',
        longitude:'',
        Lat:'',
        Lng:'',
        cardShow:false,
            editPerForm:{},
            editPerVisible:false,
            isEdit:'visibility:hidden',
              circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          }
      },
    methods: {
      update(){
        let {FirstName,LastName,gender,introduction}=this.editPerForm
        this.$fetch(`user/update?uid=${this.profile.uid}&password=${this.profile.password}&FirstName=${FirstName}
        &LastName=${LastName}&longitude=${this.longitude}&latitude=${this.latitude}&gender=${this.gender}
        &introduction=${introduction}`).then(res =>{
            if(res.data=='fail'){
                this.$message.error('fail');
            }else{
               this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.$fetch(`profile?uid=${this.profile.uid}`).then(res =>{
          if(res.data=='fail'){
                this.$message.error('获取个人信息失败');
            }else{
               this.$store.commit('setprofile',{profile:res.data})
            }
            })
                
            }
            })
      },
      editProfile(){
        this.editPerVisible = true
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
            var lnglatw  = [_this.profile.longitude,_this.profile.latitude]
            AMap.plugin("AMap.Geocoder", function(){
                var geocoder = new AMap.Geocoder({
                    radius: 1000 
                });
                geocoder.getAddress(lnglatw, function(status, result) {
                    if (status === 'complete'&&result.regeocode) {
                      let res = result.regeocode.addressComponent
                        _this.house.address = res.township+res.street+res.streetNumber
                    }else{
                        log.error('根据经纬度查询地址失败')
                    }
                });
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
                        _this.address = res.township+res.street+res.streetNumber
                    }else{
                        log.error('根据经纬度查询地址失败')
                    }
                });
              })
            })
             window.map = map
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
            autoComplete.search(_this.address, function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                _this.cardShow = true
              }
            })
            var placeSearch = new AMap.PlaceSearch({
              city:_this.adcode,
              map:map
            })
            AMap.event.addListener(autoComplete, "select",e => {
              debugger
              _this.address = e.poi.address
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
              
            })
      }
    },
    computed:{
      profile(){
        return this.$store.state.profile
      }
    },
    mounted(){
      this.editPerForm=JSON.parse(JSON.stringify(this.profile))
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