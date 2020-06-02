<template>
    <div class="baseInfo_box">
        <el-container>
            <el-header>
                <h2>
                    <span><i class="el-icon-odometer"></i>基本信息</span>
                    <span><el-button type="primary" size="mini" plain>重启服务器</el-button><el-button type="danger" size='mini' plain>关闭服务器</el-button></span>
                </h2>
            </el-header>
            <el-main  v-loading='infoLoading'>
                <el-row>
                    <el-col :span='12'>
                        <el-row>
                            <!-- 文章总数 -->
                            <el-col :span="11" class="articleTotal">
                                <p class="infoTitle" v-text="total.pageName"></p>
                                <p class="infoContent" v-text="total.pageTotal"></p>
                            </el-col>
                            <!-- 浏览总数 -->
                            <el-col :span="11" class="viewTotal">
                                <p class="infoTitle" v-text="total.viewName"></p>
                                <p class="infoContent" v-text="total.viewTotal"></p>
                            </el-col>
                            <!-- 评论总数 -->
                            <el-col :span="11" class="commentTotal">
                                <p class="infoTitle" v-text="total.commentName"></p>
                                <p class="infoContent" v-text="total.commentTotal"></p>
                            </el-col>
                            <!-- 用户总数 -->
                            <el-col :span="11" class="userTotal">
                                <p class="infoTitle" v-text="total.userName"></p>
                                <p class="infoContent" v-text="total.userTotal"></p>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col class="dataGrid" :offset='1' :span='11'>
                        <el-row>
                            <!-- 基本信息 -->
                            <el-col class="baseInfo" :span="24">
                                <el-table
                                  :data="baseInfo"
                                  style="width: 100%">
                                  <el-table-column
                                    prop="baseName1"
                                    label="名称">
                                  </el-table-column>
                                  <el-table-column
                                    prop="baseVal1"
                                    label="信息">
                                  </el-table-column>
                                  <el-table-column
                                    prop="baseName2"
                                    label="名称">
                                  </el-table-column>
                                  <el-table-column
                                    prop="baseVal2"
                                    label="信息">
                                  </el-table-column>
                                </el-table>
                            </el-col>
                            <!-- 其他信息 -->
                            <el-col class="otherInfo" style="margin-top: 10px;" :span="24">
                                <el-table
                                  :data="otherInfo"
                                  border
                                  style="width: 100%">
                                  <el-table-column
                                    prop="baseName1"
                                    label="名称">
                                  </el-table-column>
                                  <el-table-column
                                    prop="baseVal1"
                                    label="信息">
                                  </el-table-column>
                                  <el-table-column
                                    prop="baseName2"
                                    label="名称">
                                  </el-table-column>
                                  <el-table-column
                                    prop="baseVal2"
                                    label="信息">
                                  </el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col style="margin-top: 10px;" :offset="1" :span='12'>
                        <el-row class="status">
                            <!-- CPU状态 -->
                            <el-col :span="12">
                                <div id="CPU" style="height: 100%;width: 100%;"></div>
                            </el-col>
                            <!-- 内存状态 -->
                            <el-col :span="12">
                                <div id="Memory" style="height: 100%;width: 100%;"></div>
                            </el-col>
                            <!-- 硬盘状态 -->
                            <el-col :span="12">
                                <div id="Disk" style="height: 100%;width: 100%;"></div>
                            </el-col>
                            <!-- 预留空位 -->
                            <el-col :span="12">
                                <div id="other" style="height: 100%;width: 100%;"></div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col style="margin-top: 10px;" :span='11'>
                        <!-- 所有文章分类占比 -->
                        <div id="articleSeris"></div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    data () {
        return {
            total: {
                pageName: '文章总数',
                pageTotal: '加载中...',
                viewName: '浏览总数',
                viewTotal: '加载中...',
                commentName: '评论总数',
                commentTotal: '加载中...',
                userName: '用户总数',
                userTotal: '加载中...'
            },
            baseInfo: [],
            categoryCount: [],
            categoryName: [],
            infoLoading: true,
            otherInfo: [],
            articleListData: [],
            cpuChart: {
                title: {
                    text: 'Cpu' // 标题文本内容
                },
                series: [{
                    name: '',
                    type: 'gauge',
                    detail: {
                        formatter: '{value}%',
                        textStyle: {
                            fontSize: 15
                        }
                    },
                    data: [{ value: 0, name: '' }]
                }]
            },
            memChart: {
                title: {
                    text: '内存' // 标题文本内容
                },
                series: [{
                    name: '',
                    type: 'gauge',
                    detail: {
                        formatter: '{value}%',
                        textStyle: {
                            fontSize: 15
                        }
                    },
                    data: [{ value: 0, name: '' }]
                }]
            },
            diskChart: {
                title: {
                    text: '硬盘' // 标题文本内容
                },
                series: [{
                    name: '',
                    type: 'gauge',
                    detail: {
                        formatter: '{value}%',
                        textStyle: {
                            fontSize: 15
                        }
                    },
                    data: [{ value: 0, name: '' }]
                }]
            },
            articleOption: {
                title: {
                    text: '所有文章分类占比',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c}篇 ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: []
                },
                series: [
                    {
                        name: '网站文章组成',
                        type: 'pie',
                        radius: '70%',
                        center: ['50%', '60%'],
                        data: []
                    }
                ]
            },
            cpu: 0,
            mem: 0,
            disk: 0
        }
    },
    mounted () {
        // 初始化echarts实例
        var cpu = echarts.init(document.getElementById('CPU'))
        var memory = echarts.init(document.getElementById('Memory'))
        var disk = echarts.init(document.getElementById('Disk'))
        var articleSeris = echarts.init(document.getElementById('articleSeris'))
        // var other = echarts.init(document.getElementById('other'))
        this.getMem()
        this.getDisk()
        // 指定图表的配置项和数据
        cpu.setOption(this.cpuChart)
        setInterval(() => {
            this.getCpu()
            this.cpuChart.series[0].data[0].value = this.cpu
            cpu.setOption(this.cpuChart, true)
        }, 1000)
        memory.setOption(this.memChart)
        setInterval(() => {
            this.getMem()
            this.memChart.series[0].data[0].value = this.mem
            memory.setOption(this.memChart, true)
        }, 1000)
        disk.setOption(this.diskChart)
        setInterval(() => {
            this.getDisk()
            this.diskChart.series[0].data[0].value = this.disk
            disk.setOption(this.diskChart, true)
        }, 1000)
        this.getArticle()
        setTimeout(() => {
            this.articleOption.legend.data = this.categoryName
            this.articleOption.series[0].data = this.categoryCount
            articleSeris.setOption(this.articleOption)
        }, 1000)
        this.getHardInfo()
    },
    methods: {
        getCpu () {
            this.server.getItem('/wills/system/cpu').then(res => {
                this.cpu = this.server.message(res)
            })
        },
        getMem () {
            this.server.getItem('/wills/system/memory').then(res => {
                this.mem = this.server.message(res)
            })
        },
        getDisk () {
            this.server.getItem('/wills/system/disk').then(res => {
                this.disk = this.server.message(res)
            })
        },
        getHardInfo () {
            this.server.getItem('/wills/system/hardware').then(res => {
                const data = this.server.message(res)
                this.baseInfo = data.baseInfo
                this.otherInfo = data.otherInfo
                this.total.pageTotal = data.otherInfo[2].baseVal2
                this.total.viewTotal = data.otherInfo[3].baseVal1
                this.total.commentTotal = data.otherInfo[0].baseVal1
                this.total.userTotal = data.otherInfo[2].baseVal1
                this.infoLoading = false
            })
        },
        getArticle () {
            this.server.getItem('/wills/system/article').then(res => {
                const data = this.server.message(res)
                this.categoryName = data.categoryName
                this.categoryCount = data.categoryCount
            })
        }
    }
}
</script>

<style lang="less">
#articleSeris{
    background-color: #fff;
    height: 400px;
    width: 88%;
    margin-left: 10px;
    padding: 30px 0 0 50px;
    border-radius: 5px;
}
.el-tabs--border-card>.el-tabs__content{
    padding: 15px 10px 0 10px !important;
}
.infoTitle{
    padding: 40px;
    font-size: 28px;
}
.infoContent{
    font-size: 18px;
    font-weight: bold;
}
.status{
    .el-col{
        height: 200px;
        div{
            width: 100%;
            canvas{
                height: 200px !important;
                width: 100% !important;
            }
        }
    }
}
.baseInfo_box{
    padding: 0 0 0 0px;
    .el-container{
        .el-header{
            border-bottom: 1px solid #c0c0c0;
            height: auto !important;
            padding: 0 0 10px 0;
            h2{
                text-align: left;
                margin: 0;
                span{
                    font-weight: bold;
                    i{
                        margin-right: 5px;
                        font-size: 28px;
                        font-weight: bold;
                    }
                    .el-button{
                        span{
                            margin: 0;
                        }
                    }
                }
                span:last-of-type{
                    margin-left: 10px;
                }
            }
        }
    }
    .el-main{
        .el-row{
            margin-top: 10px;
            .el-col{
                .el-row{
                    padding-left: 10px;
                    .dataGrid{
                        .el-row{
                            .baseInfo,.otherInfo{
                                .el-table{
                                }
                            }
                        }
                    }
                    .articleTotal{
                        background-color: #fff;
                        height: 200px;
                        margin-right: 10px;
                        border-radius: 5px;
                    }
                    .viewTotal{
                        background-color: #23b7e5;
                        height: 200px;
                        border-radius: 5px;
                    }
                    .commentTotal{
                        margin: 20px 10px 0 0;
                        background-color: #7266ba;
                        height: 200px;
                        border-radius: 5px;
                    }
                    .userTotal{
                        margin: 20px 10px 0 0;
                        background-color: #fff;
                        height: 200px;
                        border-radius: 5px;
                    }
                }
            }
        }
    }
}
.el-table td, .el-table th{
    padding: 6px 0 !important;
}
</style>
