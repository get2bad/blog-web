<template>
    <div class="role_manage">
        <div class="manage_tips">
            <p><i class="el-icon-view"></i>权限查看</p>
        </div>
        <div class="manage_content">
            <el-card>
                <template>
                  <el-table
                    border stripe
                    :data="allPermission"
                    style="width: 100%">
                    <el-table-column
                    type="expand">
                    <template slot-scope="scope">
                        <el-row class="vcenter">
                            <el-col :span="3">
                                <el-tag class="top10Px" v-text="scope.row.permissionName"></el-tag>
                                <i v-if="scope.row.child.length > 0" style="display:inline-block" class="el-icon-caret-right"></i>
                            </el-col>
                            <el-col :offset="3" :span="15">
                                <el-row style="border-bottom: 1px solid #eeeeee;padding-bottom: 10px;" class="vcenter" v-for="item in scope.row.child" :key="item.permissionId">
                                    <el-col :span="6">
                                        <el-tag class="top10Px">{{ item.permissionName }}</el-tag>
                                        <i v-if="item.child.length > 0" style="display:inline-block" class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :offset="3" :span="5">
                                        <el-tag class="top10Px" v-for="item2 in item.child" :key="item2.permissionId">{{ item2.permissionName }}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                    </el-table-column>
                    <el-table-column
                      prop="permissionName"
                      label="权限名称">
                    </el-table-column>
                    <el-table-column
                      prop="permissionDescription"
                      label="权限描述">
                    </el-table-column>
                    <el-table-column
                        prop="level"
                      label="权限等级">
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
            allPermission: [],
            total: 0,
            pageHelper: {
                start: 0,
                perCount: 10
            }
        }
    },
    created () {
        this.getAllPermisson()
    },
    methods: {
        getAllPermisson () {
            const pageHelper = this.pageHelper
            this.server.post('/wills/permission/getAll', {}).then(res => {
                const data = this.server.message(res)
                this.total = data.total
                this.allPermission = data.allPermission
            })
        }
    }
}
</script>

<style lang="less" scoped>
.top10Px{
    margin-top: 10px;
}
.vcenter{
    display: flex;
    align-items: center;
}
.role_manage{
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
    }
}
</style>
