<template>
    <div class="passwd_manage">
        <div class="manage_tips">
            <p><i class="el-icon-user"></i>信息修改</p>
        </div>
        <div class="manage_content">
            <el-card>
                <template>
                  <el-tabs v-model="activeName">
                    <el-tab-pane label="资料修改" name="first">
                        <div class="infoPanel">
                            <el-form ref="userInfo" label-width="80px" :model="userInfo">
                              <el-form-item label="用户名">
                                <el-input class="width50" disabled v-model="userInfo.username"></el-input>
                              </el-form-item>
                              <el-form-item label="性别">
                                <el-select class="width50" v-model="userInfo.sex" placeholder="请选择您的性别">
                                  <el-option label="男" value="1"></el-option>
                                  <el-option label="女" value="0"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="出生日期">
                                <el-col :span="11">
                                  <el-date-picker class="width50" type="date" placeholder="选择您的出生日期" v-model="userInfo.birthday" style="width: 100%;"></el-date-picker>
                                </el-col>
                              </el-form-item>
                                <!-- <el-col class="line" :span="2">-</el-col>
                                <el-col :span="11">
                                  <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                                </el-col> -->
                              <el-form-item label="年龄">
                                <el-input class="width50" v-model="userInfo.age"></el-input>
                              </el-form-item>
                              <el-form-item label="联系方式">
                                <el-input class="width50" v-model="userInfo.phone"></el-input>
                              </el-form-item>
                              <el-form-item label="邮箱">
                                <el-input class="width50" v-model="userInfo.email"></el-input>
                              </el-form-item>
                              <el-form-item label="家庭住址">
                                <el-input class="width50" v-model="userInfo.address"></el-input>
                              </el-form-item>
                              <el-form-item label="个性签名">
                                <el-input class="width50" type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="userInfo.note"></el-input>
                              </el-form-item>
                              <el-form-item>
                                <el-button type="primary" @click="changeInfo">修改</el-button>
                                <el-button>重置</el-button>
                              </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="密码修改" name="second">
                        <div class="infoPanel">
                            <el-form ref="user" label-width="80px" :model="user">
                              <el-form-item label="用户名">
                                <el-input class="width50" disabled v-model="user.username"></el-input>
                              </el-form-item>
                              <el-form-item label="原密码">
                                <el-input class="width50" type="password" v-model="user.oldPasswd"></el-input>
                              </el-form-item>
                              <el-form-item label="新密码">
                                <el-input class="width50" type="password" v-model="user.newPasswd"></el-input>
                              </el-form-item>
                              <el-form-item label="确认密码">
                                <el-input class="width50" type="password" v-model="user.confirmPasswd"></el-input>
                              </el-form-item>
                              <el-form-item>
                                <el-button type="primary" @click="changePwd">修改</el-button>
                                <el-button>重置</el-button>
                              </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                  </el-tabs>
                </template>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            activeName: 'first',
            userInfo: {
                username: 'wills',
                sex: '1',
                birthday: '1997-02-08 12:00:00',
                age: '23',
                phone: '17607113011',
                email: 'loveing490@qq.com',
                address: '山东省烟台市',
                note: '一定要成为最幸运的人哦~！'
            },
            user: {
                username: 'wills',
                oldPasswd: '',
                newPasswd: '',
                confirmPasswd: ''
            }
        }
    },
    created () {

    },
    methods: {
        changeInfo () {},
        changePwd () {}
    }
}
</script>

<style lang="less" scoped>
.passwd_manage{
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
        text-align: left !important;
    }
}
</style>
