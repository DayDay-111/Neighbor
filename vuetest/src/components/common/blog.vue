<template>
    <el-card class="box-card" shadow="hover">
        <el-avatar size="large" :src="circleUrl"></el-avatar>
    </el-card>
</template>
<script>
export default {
    name:'blog',
    data(){
        return{
            circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        }
    }
}
</script>