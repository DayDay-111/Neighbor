<template>
<div class='outside'>
    <div class="left"></div>
    <div class="center" >
        <el-card style=" min-height:500px" class="box-card" shadow="hover">
            <div class="middle_x">
                <div style="width:300px;margin-right:10px">
                    <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
                </div>
            <el-button icon='el-icon-search' type="primary" @click="search">search</el-button>
            </div>
                
            
            <div v-for="item in list"  style="margin-top:50px">
                <div style="cursor: pointer;" @click="showDetail(item.sid)">{{item.title}}   {{item.stime}}
                    <el-tag v-if="item.unread==1" type="danger" style="float:right">unread</el-tag>
                </div>

                <el-divider></el-divider>
            </div>
           <el-pagination  v-if="list.length>0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="sizes, prev, pager, next"
      :total="100">
    </el-pagination>
    <el-alert v-else style="margin-top:50px"
    title="无内容"
    type="info"
    description="在上方输入框中输入你感兴趣的内容进行搜索"
    :closable="false"
    show-icon></el-alert >
        </el-card>
    </div>
    <div class="right"></div>
</div>
</template>
<script>
  export default {
      data(){
          return{
              input:'',
              list:[],
              pagesize:10,
              page:1,
          }
      },
    methods: {
        search(){
            this.$fetch(this._url.searchByKey+`?uid=${this.profile.uid}&keyword=${this.input}&pagesize=${this.pagesize}&page=${this.page}`).then(res =>{
            if(res.data=='fail'){
                this.$message.error(res.data);
            }else{
                this.list=res.data
            }
            })
        },
        showDetail(id){
            this.$router.push({
                path:`/blog/${id}`
            })
        },
      handleCurrentChange(currentPage){
            this.page = currentPage
            this.onSubmit()
        },
      handleSizeChange(pageSize){
        this.pageSize=pageSize
            this.onSubmit()
      },
      onSubmit(){
         this.$fetch(this._url.SubMessage+`?uid=${this.profile.uid}&sid=${this.$router.params.id}&pagesize=${this.pagesize}&page=${this.page}`).then(res =>{
            if(res.data=='fail'){
                this.$message.error(res.data);
            }else{
                this.msglist=res.data
            }
            })
      }
    },
    computed:{
      profile(){
        return this.$store.state.profile
      }
    },
    
    mounted(){
       this.onSubmit()
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