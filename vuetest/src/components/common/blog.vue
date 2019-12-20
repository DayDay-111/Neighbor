<template>
<div class='outside'>
    <div class="left"></div>
    <div class="center">
        <el-card style=" min-height:500px" class="box-card" shadow="hover">
            <div v-for="item in msglist"  >
              <div>{{item.FirstName+' '+item.LastName}} <span style="float:right">{{item.mtime}}</span></div>
                <div style="padding-left:20px">{{item.text}}   
                </div>
                <el-tag type="info" style="float:left;margin-left:100px;position:relative;top:10px" size='mini'>{{item.index}}楼</el-tag>
                <el-button style="float:right;margin-right:100px" size='mini' type="primary" @click="repVis=true;replymid=item.mid">回复</el-button>
                <div style="height:30px"></div>
                <el-divider ></el-divider>
            </div>

           <el-pagination v-if="msglist.length>0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="sizes, prev, pager, next"
      :total="100">
    </el-pagination>
  <div class="middle_xy" style="margin-top:20px;margin-bottom:20px">
                <div style="width:300px;margin-right:10px">
                    <el-input v-model="repmsg" type="textarea" placeholder="请输入评论内容"></el-input>
                </div>
            <el-button icon='el-icon-search' type="primary" @click="submitMessage">submit</el-button>
            </div>
    <el-alert  v-if="msglist.length==0"
    title="无评论"
    type="info"
    description="当前话题无评论"
    :closable="false"
    show-icon></el-alert>
        </el-card>
    </div>
    <div class="right"></div>
    <el-dialog
  title="replyMessage"
  :visible.sync="repVis"
  width="50%" >
    
    <el-input v-model="repmsg"  type="textarea"></el-input>
  
  <span slot="footer" class="dialog-footer">
    <el-button @click="repVis = false">取 消</el-button>
    <el-button type="primary" @click="replyMessage()">确 定</el-button>
  </span>
    </el-dialog>
    
</div>
</template>
<script>
  export default {
      data(){
          return{
            repVis:false,
            repSVis:false,
              msglist:[],
              replymid:'',
              pagesize:10,
              page:1,
              repmsg:'',
              repsmsg:'',
              input:''
          }
      },
    methods: {
      replyMessage(){
        this.$fetch(`replyMessage?uid=${this.profile.uid}&sid=${this.$route.params.id}&text=${this.repmsg}&replymid=${this.replymid}`).then(res =>{
            if(res.data=='fail'){
                this.$message.error(res.data);
            }else{
                this.$message({
                  message: '已回复',
                  type: 'success'
                });
                this.onSubmit()
            }
            })
      },
      submitMessage(){
        
        this.$fetch(`submitMessage?uid=${this.profile.uid}&sid=${this.$route.params.id}&text=${this.repsmsg}`).then(res =>{
            if(res.data=='fail'){
                this.$message.error(res.data);
            }else{
                this.$message({
                  message: '已回复',
                  type: 'success'
                });
                this.onSubmit()
            }
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
         this.$fetch(this._url.SubMessage+`?uid=${this.profile.uid}&sid=${this.$route.params.id}&pagesize=${this.pagesize}&page=${this.page}`).then(res =>{
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
    beforeMount(){

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