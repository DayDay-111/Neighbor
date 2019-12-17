<template>
<div class='outside'>
    <div class="left"></div>
    <div class="center">
        <blog></blog>
    </div>
    <div class="right"></div>
</div>
</template>
<script>
    import blog from '@/components/common/blog'
  export default {
      components:{
          blog
      },
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
.right{width: 14%;min-height:100px;float: left; }
.left{width: 14%;min-height:100px;float: left;  }
.center{width: 72%;min-height:100px;float: left;  }
.item {padding: 18px 0;}
</style>