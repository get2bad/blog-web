<template>
    <div class="navBar">
        <el-menu
          class="el-menu-vertical-demo"
          active-text-color="#0088f5"
          :default-active="$route.path"
          @select="handleSelect">
          <el-menu-item v-for="item in category" :key='item.categoryId' :index="item.categoryUrl">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.categoryName }}</span>
          </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data () {
        return {
            category: []
        }
    },
    created () {
        this.getAllCategory()
    },
    methods: {
        getAllCategory () {
            this.server.getItem('/wills/category/getAll').then(res => {
                const data = this.server.message(res)
                this.category = data.AllCategory
            })
        },
        handleSelect (key, keyPath) {
            if (key !== 'main') {
                this.$router.push({ name: 'main', query: { condition: key } })
            } else {
                this.$router.push('/main')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.is-active{
    background-color: rgba(255,255,255,0.9);
}
.navBar{
    // padding-right: 10px;
    .el-menu{
        border: 0;
        background-color:#eeeeee;
        .el-menu-item{
            text-align: left;
            font-weight: 200;
        }
        .el-menu-item:hover{
            color: #0088f5;
            i{
                color: #0088f5;
            }
        }
    }
}
</style>
