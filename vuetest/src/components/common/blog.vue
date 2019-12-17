<template>
    <el-card class="box-card" shadow="hover">
        <div v-for="o in 4" :key="o" class="item">
            {{'列表内容 ' + o }}
        </div>
    </el-card>
</template>
<script>
export default {
    name:'blog'
}
</script>