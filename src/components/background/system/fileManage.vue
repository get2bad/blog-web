<template>
    <div class="file_manage">
        <div class="manage_tips">
            <p><i class="el-icon-view"></i>文件管理</p>
        </div>
        <div class="manage_content">
            <el-card>
                <p>选择您想上传的文件</p>
                <div class="option">
                    <el-upload
                        style='float: left;'
                      class="upload-demo"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      multiple
                      :limit="10">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传小于10MB的文件</div>
                    </el-upload>
                    <div style="float: right">
                          <el-button>全选</el-button>
                          <el-button>反选</el-button>
                          <el-button>批量删除</el-button>
                    </div>
                    <div class="clearFloat"></div>
                </div>
                <div class="file_panel">
                    <el-row>
                        <el-col v-for="item in allFile" :key="item.id" :span="4">
                            <el-avatar shape="square" :size="220" fit="fill" :src="item.filePath"></el-avatar>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            allFile: [],
            total: 0
        }
    },
    created () {
        this.getAllFile()
    },
    methods: {
        getAllFile () {
            this.server.getItem('/wills/file/getAll').then(res => {
                const data = this.server.message(res)
                this.allFile = data.allFile
                this.total = data.total
            })
        }
    }
}
</script>

<style lang="less" scoped>
.file_manage{
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
    .manage_content{
        text-align: left;
        .option{
            border-bottom: 2px solid #eeeeee;
        }
        .file_panel{
            margin-top: 20px;
            .el-col{
                margin: 0 0 20px 10px;
                .el-avatar{
                    background-color: #fff;
                    border: 1px solid #c0c0c0;
                }
            }
        }
    }
}
</style>
