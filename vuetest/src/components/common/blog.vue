<template>
<div class='outside'>
    <div class="left"></div>
    <div class="center">
        <el-card class="box-card" shadow="hover">
            
        </el-card>
    </div>
    <div class="right"></div>
</div>
</template>
<script>
  export default {
      data(){
          return{
              msglist:[]
          }
      },
    methods: {
    },
    computed:{
      profile(){
        return this.$store.state.profile
      }
    },
    beforeMount(){

    },
    mounted(){
        this.$fetch(this._url.SubMessage+`?sid=${this.$router.params.id}`).then(res =>{
            if(res.data=='fail'){
                this.$message.error(res.data);
            }else{
                this.msglist=res.data
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