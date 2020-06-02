<template>
    <div class="header">
        <el-row>
            <router-link to="/"><el-col class="icon" :span='3' :offset="4"><i class="el-icon-magic-stick"></i><span v-text="title"></span></el-col></router-link>
            <el-col class="saying" :span='3' v-text="saying"></el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Wills的博客',
      saying: '笃志，励前行'
    }
  }
}
</script>

<style lang="less" scoped>
.header{
    padding: 20px 0;
    background-color: rgba(255,255,255,0.7);
    margin-bottom: 10px;
    .icon{
        font-weight: bold;
        font-size: 23px;
        background: linear-gradient(to left, pink, blue) !important;
        -webkit-background-clip: text !important;
        color: transparent;
        i{
            color: black;
            margin-right: 5px;
        }
    }
    .saying{
        padding-top: 5px;
        font-family: 'KaiTi';
        font-size: 19px;
        color: #0088f5;
    }
    .music{
        margin-top: -20px;
        opacity: 0.3;
    }
}
</style>
