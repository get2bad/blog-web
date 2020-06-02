<template>
  <div class="index">
    <el-container>
      <el-header>
        <willsHeader></willsHeader>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="3" :offset='3'>
            <willsNavBar></willsNavBar>
          </el-col>
          <!-- <el-col :span="10"><willsBody></willsBody></el-col> -->
          <el-col :span="10"><router-view></router-view></el-col>
          <el-col :span="4"><willsOption></willsOption></el-col>
        </el-row>
      </el-main>
      <willsFooter></willsFooter>
    </el-container>
  </div>
</template>

<script>
import willsHeader from '../components/foreground/header.vue'
import willsNavBar from '../components/foreground/navBar.vue'
import willsFooter from '../components/foreground/footer.vue'
// import willsBody from '../components/foreground/body.vue'
import willsOption from '../components/foreground/option.vue'
export default {
  name: 'index',
  components: {
    willsHeader,
    willsNavBar,
    // willsBody,
    willsOption,
    willsFooter
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
.index{
  // background-color: rgba(238, 238, 238, 0.8);
  background: #eeeeee;
  background-image: linear-gradient(white 2px,transparent 0),
      linear-gradient(90deg, white 2px,transparent 0),
     linear-gradient(hsla(0,0%,100%,.3) 1px,transparent 0),
      linear-gradient(90deg,hsla(0,0%,100%,.3) 1px,transparent 0);
  background-size:75px 75px,75px 75px,15px 15px,15px 15px;
}
.el-header{
  padding: 0 !important;
}
</style>
