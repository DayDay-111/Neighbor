<template>
    <div >
        <div class="out">
          <template v-if="isLogin">
            <el-form :model="ruleForm" class="relaForm" status-icon :rules="rules" ref="ruleForm" label-width="80px">
              <h4 style="text-align: center;">Please Use acoount to Login</h4>
              <div style="width: 100%;height:40px"></div>
              <el-form-item label="email" prop="email">
                <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="password" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item class="middle_x ">
                <el-button type="primary" @click="submitForm('ruleForm')">login</el-button>
                <el-button @click="resetForm('ruleForm')">reset</el-button>
              </el-form-item>
            </el-form>
            <div class="bottom"><span>No account?</span><span style="color:blue;cursor:pointer" @click="isLogin=!isLogin">clock to register</span></div>
          </template>
          <template v-else>
            <el-form :model="regForm" class="relaForm" status-icon :rules="regrules" ref="regForm" label-width="80px">
              <div style="width: 100%;height:40px"></div>
              <el-form-item label="FirstName" prop="FirstName">
                <el-input type="text" v-model="regForm.FirstName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="LastName" prop="LastName">
                <el-input type="text" v-model="regForm.LastName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="email" prop="email">
                <el-input type="text" v-model="regForm.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="password" prop="password">
                <el-input type="text" v-model="regForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item class="middle_x ">
                <el-button type="primary" @click="register('regForm')">注册</el-button>
                <el-button @click="isLogin=!isLogin">登录</el-button>
              </el-form-item>
            </el-form>
            </template>
        </div>
    </div>
    
  </template>
  <script>
    export default {
        name : "login",
        mounted(){
          document.title = 'signin';
        },
        data() {
          var emailcheck = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('请输入邮箱'));
            }
            setTimeout(() => {
              this.$fetch(this._url.emailcheck+`?email=`+value).then(res =>{//,{email:value}
                alert(res.data)
                if(res.data == 'success'){
                callback()
              }else if(res.data == 'fail'){
                callback(new Error('邮箱已被注册'));
              }
              })
            }, 300);
          };
          return {
            isLogin:true,
            ruleForm: {
          email: '',
          password: '',
        },
            rules: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        },
        regrules: {
          email: [
            {validator: emailcheck,required: true, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          FirstName: [
            { required: true, message: '请输入名', trigger: 'blur' }
          ],
          LastName: [
            { required: true, message: '请输入姓', trigger: 'blur' }
          ],
        },
            loading: false,
            regForm:{
              email:'',password:'',FirstName:'',LastName:''
            }
          }
        },
        methods: {
            submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.replace({ path: '/' })
            this.$fetch(this._url.login+`?email=${this.ruleForm.email}&password=${this.ruleForm.password}`).then(res =>{
              if(res.data == 'fail'){
                this.$message.error(res.data);
              }else{
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                this.$store.commit('setprofile',{profile:res.data})
                this.$router.replace({ path: '/home' })
              }
            })
          } else {
            this.$message.error('fail');
          }
        });
      },
      register(formName) {
        let {email,password,FirstName,LastName} = this.regForm
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$fetch(this._url.register+`?email=${email}&password=${password}&FirstName=${FirstName}&LastName=${LastName}`).then(res =>{
              if(res.data == 'success'){
                this.$message({
                  message: '注册成功',
                  type: 'success'
                });
                this.isLogin = true
              }else if(res.data == 'fail'){
                this.$message.error(res.data);
              }
            })
          } else {
            this.$message('fail');
          }
        });
      },
      resetForm(formName) {
        this.ruleForm = {}
      }
        }
      }
  </script>
  <style>
    @import '../../assets/css/flex';
    .out{width: 340px; height: 400px;border-radius: 10px;background-color:#B3C0D1;padding: 30px 30px;}
    .fc{color: #333;}
    .relaForm{position: relative;top: 20px}
    .bottom{float: right;font-size: 12px;position: relative;top:70px}
  </style>