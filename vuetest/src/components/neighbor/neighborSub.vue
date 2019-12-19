<template>
<div class='outside'>
    <div class="left"></div>
    <div class="center">
        <el-card class="box-card" shadow="hover">
            <div v-for="item in bslist"  >
                <div style="cursor: pointer;" @click="showDetail(item.sid)">{{item.title}}   {{item.stime}}</div>
                <el-divider></el-divider>
            </div>
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
        }
    },
    computed:{
      profile(){
        return this.$store.state.profile
      }
    },
    mounted(){
        this.$fetch(this._url.neighborSubject+`?uid=${this.profile.uid}`).then(res =>{
            if(res.data=='fail'){
                this.$message.error('there is no message');
            }else{
               this.bslist=JSON.parse(JSON.stringify(res.data)) 
            }
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
.item {padding: 18px 0; }
</style>