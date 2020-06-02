<template>
    <div class="webInfo_manage">
        <div class="manage_tips">
            <p><i class="el-icon-setting"></i>网站设置</p>
        </div>
        <el-alert
          title="请您仔细按照前面的提示填写！否则将造成网站某些功能失效！"
          type="error"
          close-text="知道了"
          effect="light">
        </el-alert>
        <div class="manage_content">
            <el-card>
                <el-form>
                  <el-form-item label-position='left' v-for="item in websettings" :key='item.id' :label="item.description">
                    <el-input size="mini" class="width50" v-model="item.value">
                    </el-input>
                  </el-form-item>
                  <el-form-item label-width='150px'>
                      <el-button size="small" type="primary" @click="changeWebInfo">修改</el-button>
                      <el-button size="small" type="danger" @click="getAllWebsettings">重置</el-button>
                  </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            websettings: []
        }
    },
    created () {
        this.getAllWebsettings()
    },
    methods: {
        getAllWebsettings () {
            this.server.getItem('/wills/websettings/getAll').then(res => {
                const data = this.server.message(res)
                this.websettings = data
            })
        },
        changeWebInfo () {
            const websettings = this.websettings
            // console.log(websettings)
            this.server.putItem('/wills/websettings/update', websettings).then(res => {
                this.server.message(res, '恭喜您，修改成功！')
                this.getAllWebsettings()
            })
        }
    }
}
</script>

<style lang="less" scoped>
.el-form{
    text-align: left;
    .width50{
        width: 40% !important;
    }
    i{
        cursor: pointer;
        font-size: 24px;
        padding-top: 6px;
        color: red;
    }
}

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
</style>
