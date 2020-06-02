<template>
    <div class="footer">
        <!-- <ul>
            <li v-for="item in link" :key="item.id"><a :href="item.url" v-text="item.linkName" target="_blank"></a></li>
        </ul> -->
        <div class="copy"><span v-html="copy"></span>|<span v-html="author"></span></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // link: [
            //     { id: 1, linkName: 'Baidu', url: 'http://www.baidu.com' },
            //     { id: 2, linkName: 'Github', url: 'http://www.baidu.com' },
            //     { id: 3, linkName: 'Tinx', url: 'http://www.baidu.com' },
            //     { id: 4, linkName: 'Taobao', url: 'http://www.baidu.com' },
            //     { id: 5, linkName: 'JingDong', url: 'http://www.baidu.com' },
            //     { id: 6, linkName: 'Vue', url: 'http://www.baidu.com' }
            // ],
            copy: 'Wills 鲁ICP备17045047号',
            author: '本网站作者 Wills,<a style="color: red;" href="mailto:loveing490@qq.com">联系我</a>'
        }
    }
}
</script>

<style lang="less" scoped>
.footer{
    position: fixed;
    overflow: hidden;
    font-size: 14px;
    bottom: 0;
    width: 100%;
    min-width: 1366px;
    color: black !important;
    overflow: hidden;
    ul{
        display: inline-block;
        text-align: center;
        list-style: none;
        position: relative;
        height: 10px;
        li{
            float: left;
        }
        li:not(:last-child){
            margin-right: 10px;
        }
    }
    .copy{
        font-size: 15px;
        span{
            margin-left: 10px;
        }
    }
}
</style>
