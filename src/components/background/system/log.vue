<template>
    <div class="log">
        <div class="manage_tips">
            <p><i class="el-icon-view"></i>文件管理<el-button size="mini" type="danger" style="margin-left: 10px;">清空日志</el-button></p>
        </div>
        <div class="manage_content">
            <el-card>
                <template>
                  <el-table
                    stripe
                    :data="allLog"
                    style="width: 100%">
                    <el-table-column
                      prop="logType"
                      label="操作类型">
                    </el-table-column>
                    <el-table-column
                      prop="description"
                      label="详情">
                    </el-table-column>
                    <el-table-column
                      prop="ip"
                      label="ip">
                    </el-table-column>
                    <el-table-column
                      prop="ipBelong"
                      label="ip归属地">
                    </el-table-column>
                    <el-table-column
                      prop="time"
                      label="操作时间">
                    </el-table-column>
                  </el-table>
                </template>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            allLog: [
                {
                    id: 1,
                    logType: '用户登陆',
                    description: '网站后台登陆',
                    ip: '122.191.227.93',
                    ipBelong: '湖北省十堰市',
                    time: '2019-08-06 16:48:52'
                }
            ]
        }
    },
    created () {
    },
    methods: {
    }
}
</script>

<style lang="less" scoped>
.log{
    .manage_tips{
        border-bottom: 2px solid #eeeeee;
        margin-bottom: 20px;
        p{
            font-size: 22px;
            text-align: left;
            padding: 0 0 10px 0;
            i{
                margin-right: 6px;
            }
        }
    }
}
</style>
