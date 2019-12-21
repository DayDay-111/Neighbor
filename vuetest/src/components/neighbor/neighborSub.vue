<template>
<div class='outside'>
    <div class="left"></div>
    <div class="center">
        <el-card style=" min-height:500px" class="box-card" shadow="hover">
            <div v-for="item in bslist"  >
                <div style="cursor: pointer;" @click="showDetail(item.sid)">{{item.title}}   <span style="margin-left: 50px;">{{item.stime}}</span>
                    <el-tag v-if="item.unread==1" type="danger" style="float:right">unread</el-tag>
                </div>

                <el-divider></el-divider>
            </div>
             <el-pagination v-if="bslist.length>0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="sizes, prev, pager, next"
      :total="100">
    </el-pagination>
    <el-alert v-else
    title="no subject"
    type="info"
    description="no suject currently"
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
              bslist:[],
              pagesize:10,
              page:1,
          }
      },
    methods: {
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
          this.$fetch(this._url.neighborSubject+`?uid=${this.profile.uid}&pagesize=${this.pagesize}&page=${this.page}`).then(res =>{
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