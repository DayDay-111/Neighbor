<template>
<div class='outside'>
    <div class="left"></div>
    <div class="center">
        <el-card class="box-card" shadow="hover">
        <div v-for="o in 4" :key="o" class="item">
            {{'列表内容 ' + o }}
        </div>
    </el-card>
    </div>
    <div class="right"></div>
</div>
</template>
<script>
  export default {
    methods: {
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
    mounted(){
      
    }
  }
</script>
<style scoped>
.outside{width: 100%;min-height:100px }
.right{width: 10%;min-height:100px;float: left; }
.left{width: 10%;min-height:100px;float: left;  }
.center{width: 80%;min-height:100px;float: left;  }
.item {padding: 18px 0;}
</style>