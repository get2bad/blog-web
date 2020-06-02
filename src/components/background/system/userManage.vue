<template>
    <div class="user_manage">
        <div class="manage_tips">
            <p><i class="el-icon-s-custom"></i>用户管理</p>
        </div>
        <div class="manage_content">
            <div class="manage_search">
                <span>搜索:权限：</span>
                <div>
                    <el-select size="mini" value='Java'>
                        <el-option value="1">管理权</el-option>
                        <el-option value="2">网站编辑</el-option>
                        <el-option value="3">作者</el-option>
                        <el-option value="4">评论者</el-option>
                        <el-option value="5">游客</el-option>
                    </el-select>
                </div>
                <span>性别:</span>
                <div>
                    <el-select size="mini" value='男'>
                        <el-option value="1">男</el-option>
                        <el-option value="0">女</el-option>
                    </el-select>
                </div>
                <div>
                    <el-checkbox style="margin: 0 8px;" v-model="ifBanUser">是否被封号</el-checkbox>
                </div>
                <div>
                    <el-input size="mini" placeholder="输入用户名，支持模糊搜索" />
                </div>
                <div style="margin-left: 10px;">
                    <el-button size="mini">搜索</el-button>
                    <el-button size="mini">默认</el-button>
                </div>
            </div>
            <div class="manage_result">
                <template>
                    <el-table
                      stripe border
                      ref="multipleTable"
                      :data="allUser"
                      tooltip-effect="dark"
                      style="width: 100%">
                      <el-table-column
                        type="expand">
                        <template slot-scope="scope">
                            <el-table
                              :data="[scope.row]">
                              <el-table-column
                                prop="signInIp"
                                label="登陆IP">
                              </el-table-column>
                              <el-table-column
                                prop="address"
                                label="家庭住址">
                              </el-table-column>
                              <el-table-column
                                prop="note"
                                label="个人签名">
                              </el-table-column>
                              <el-table-column
                                prop="lastSignTime"
                                label="上次登陆时间">
                              </el-table-column>
                              <el-table-column
                                label="账号状态">
                                <template slot-scope="scope">
                                    {{ scope.row.status === 0 ? '允许登陆' : '禁止登陆' }}
                                </template>
                              </el-table-column>
                            </el-table>
                        </template>
                      </el-table-column>
                      <el-table-column
                        type="index">
                      </el-table-column>
                      <el-table-column
                        prop="userName"
                        label="用户名">
                      </el-table-column>
                      <el-table-column
                        prop="email"
                        label="邮箱">
                      </el-table-column>
                      <el-table-column
                        label="性别">
                        <template slot-scope="scope">
                            {{ scope.row.sex === 1 ? '男' : '女' }}
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="age"
                        label="年龄">
                      </el-table-column>
                      <el-table-column
                        prop="phone"
                        label="联系方式">
                      </el-table-column>
                      <!-- <el-table-column
                        label="权限">
                        <template slot-scope="scope">
                            <el-tag>{{ scope.row.auth }}</el-tag>
                        </template>
                      </el-table-column> -->
                      <el-table-column
                        label="操作"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            type="primary"
                            @click="viewUser(scope.row)">修改信息</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="banUser(scope.row)">更改用户登陆状态</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
        <el-dialog style="text-align:left;" title="修改用户信息" :visible.sync="editUserVisible">
          <el-form :model="user">
            <el-form-item label="用户名" label-width='120px'>
              <el-input style="width: 50%;" v-model="user.userName" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" label-width='120px'>
              <el-select v-model="user.sex" placeholder="请选择性别">
                <el-option label="女" value=0></el-option>
                <el-option label="男" value=1></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="密码" label-width='120px'>
              <el-input style="width: 50%;" v-model="user.password" disabled></el-input>
              <a style="cursor:pointer;" @click.prevent='resetPwd'>重置密码</a>
            </el-form-item>
            <el-form-item label="年龄" label-width='120px'>
              <el-input style="width: 50%;" v-model="user.age"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" label-width='120px'>
              <el-input style="width: 50%;" v-model="user.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width='120px'>
              <el-input style="width: 50%;" v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item label="个性签名" label-width='120px'>
              <el-input style="width: 50%;" v-model="user.note" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align:center;" slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editUser">确 定</el-button>
            <el-button @click="editUserVisible = false">取 消</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import * as server from '../../../api/server.js'
export default {
    data () {
        return {
            editUserVisible: false,
            ifBanUser: false,
            pageHelper: {
                start: 0,
                perCount: 10
            },
            allUser: [],
            total: 0,
            user: {}
        }
    },
    created () {
        this.getAllUser()
    },
    methods: {
        async getAllUser () {
            const pageHelper = this.pageHelper
            const { data: res } = await this.$http.post('/wills/user/getAll', { ...pageHelper })
            this.allUser = res.data.allUser
            this.allUser.forEach((e, index) => {
                const user = e.user
                const userInfo = e.userInfo
                this.allUser[index] = { ...user, ...userInfo }
            })
        },
        viewUser (user) {
            this.user = user
            this.editUserVisible = true
        },
        banUser (user) {
            this.server.deleteItemPromise('/wills/user/ban/' + user.userId).then(res => {
                this.server.message(res, '更改账号登陆状态成功！')
                this.getAllUser()
            })
        },
        editUser () {
            this.editUserVisible = false
            // console.log({ ...this.user })
            this.server.post('/wills/user/update', { ...this.user }).then(res => {
                const data = this.server.message(res, '修改成功！')
            })
        },
        resetPwd () {
          const user = this.user
          this.server.post('/wills/user/resetPwd', { ...user }).then(res => {
            this.server.message(res, '重置的新密码已经发送至此用户的邮箱，请您留意')
          })
        }
    }
}
</script>

<style lang="less" scoped>
.user_manage{
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
        .manage_search{
            text-align: left;
            margin-bottom: 20px;
            div{
                display: inline-block;
            }
        }
        // .manage_result{}
    }
}
</style>
