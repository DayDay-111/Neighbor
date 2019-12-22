<template>
<div class='outside'>
    <div class="left"></div>
    <div class="center">
        <el-card style=" min-height:500px" class="box-card" shadow="hover">
            <div v-for="item in bslist"  >
                <div style="cursor: pointer;">{{item.FirstName}}   {{item.LastName}}  
                    <el-button style="float:right" type="primary" @click="deleteFriend(item.uid)" size="mini">delete</el-button>
                </div>
                <el-divider></el-divider>
            </div>
            <el-alert v-if="bslist.length==0"
    title="No friend"
    type="info"
    description="no firend, you can apply in the myblcok"
    :closable="false"
    show-icon></el-alert>
        </el-card>
    </div>
    <div class="right"></div>
</div>
</template>
<script>
  export default {
      data(){
          return{
              bslist:[]
          }
      },
    methods: {
        showDetail(id){
            this.$router.push({
                path:`/blog/${id}`
            })
        },
        deleteFriend(uid){
          this.$fetch(`deleteFriend?uid=${this.profile.uid}&frienduid=${uid}`).then(res =>{
            if(res.data=='fail'){
                this.$message.error('fail');
            }else{
               this.$message({
                  message: 'success delete',
                  type: 'success'
                });this.$fetch(this._url.friendList+`?uid=${this.profile.uid}`).then(res =>{
            if(res.data=='fail'){
                this.$message.error('there is no message');
            }else{
                
               this.bslist=JSON.parse(JSON.stringify(res.data)) 
            }
            })
            }
            })
      },
      geilist(){
        this.$fetch(this._url.friendList+`?uid=${this.profile.uid}`).then(res =>{
            if(res.data=='fail'){
                this.$message.error('there is no message');
            }else{
               this.bslist=JSON.parse(JSON.stringify(res.data)) 
            }
            })
      }
    },
    computed:{
      profile(){
        return this.$store.state.profile
      },
      
    },
    mounted(){
        this.geilist()
    }
  }
</script>
<style scoped>
@import '../../assets/css/flex';
.outside{width: 100%;min-height:100px }
.right{width: 14%;min-height:100px;float: left; }
.left{width: 14%;min-height:100px;float: left;  }
.center{width: 72%;min-height:100px;float: left;  }
.item {padding: 18px 0; }
</style>