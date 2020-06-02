<template>
    <div class="role_manage">
        <div class="manage_tips">
            <p><i class="el-icon-notebook-2"></i>角色管理</p>
        </div>
        <div class="manage_content">
            <el-card>
                <el-button @click="addNewRole = true" style="margin-bottom: 20px;" type="primary">添加角色</el-button>
                <template>
                  <el-table
                    border stripe
                    :data="allRole"
                    style="width: 100%">
                    <el-table-column
                    type="index">
                    </el-table-column>
                    <el-table-column
                      prop="roleName"
                      label="角色名称">
                    </el-table-column>
                    <el-table-column
                      prop="roleDescription"
                      label="角色描述">
                    </el-table-column>
                    <el-table-column
                      label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          @click="editRole(scope.row)" size="mini" icon="el-icon-edit">编辑</el-button>
                         <el-button
                          type="danger"
                          @click="deleteRole(scope.row.roleId)" size="mini" icon="el-icon-scissors">删除</el-button>
                         <el-button
                          type="warning"
                          @click="auth(scope.row.roleId)" size="mini" icon="el-icon-paperclip">分配权限</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
            </el-card>
        </div>
        <el-dialog title="添加新角色" :visible.sync="addNewRole">
          <el-form :model="role">
            <el-form-item label="角色名称" label-width="120px">
              <el-input v-model="role.roleName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" label-width="120px">
              <el-input type="textarea" v-model="role.roleDescription" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addNewRole = false">取 消</el-button>
            <el-button type="primary" @click="addNewRoleFunc">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog
        :before-close='beforeEditPermissionClose'
        style="text-align:center"
          title="权限设置"
          :visible.sync="permissionEditVisable"
          width="50%">
          <el-tree
          ref="pTree"
          :data="allPermission"
          show-checkbox
          node-key="permissionId"
          :default-checked-keys="treeCheckedKey"
          :default-expanded-keys='treeCheckedKey'
          auto-expand-parent
          :props="treeProps">
        </el-tree>
          <span style="text-align: left;">
            <el-button type="primary" @click="setPermission">确 定</el-button>
            <el-button @click="permissionEditVisable = false">取 消</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import * as server from '../../../api/server.js'
export default {
    data () {
        return {
            addNewRole: false,
            permissionEditVisable: false,
            allRole: [],
            total: 0,
            role: {
                roleName: '',
                roleDescription: ''
            },
            allPermission: [],
            treeProps: {
                children: 'child',
                label: 'permissionName'
            },
            treeCheckedKey: [],
            currentRoleId: 0 // 正在编辑权限的roleId
        }
    },
    created () {
        this.getAllRole()
        this.getRolePermission()
    },
    methods: {
        getAllRole () {
            server.getItem('/wills/role/getAll').then(res => {
                const data = server.message(res)
                this.total = data.total
                this.allRole = data.allRoles
            })
        },
        addNewRoleFunc () {
            const role = this.role
            if (role.roleId) {
                server.putItem('/wills/role/update', { ...role }).then(res => {
                    server.message(res, '修改成功！')
                    this.getAllRole()
                    this.addNewRole = false
                })
            } else {
                server.putItem('/wills/role/add', { ...role }).then(res => {
                    server.message(res, '添加角色成功！')
                    this.getAllRole()
                    this.addNewRole = false
                })
            }
        },
        editRole (role) {
            this.role = { ...role }
            this.addNewRole = true
        },
        deleteRole (id) {
            server.deleteItem('/wills/role/delete/' + id)
            this.getAllRole()
        },
        getRolePermission () {
            server.postItem('/wills/permission/getAll', { start: 1, perCount: 999 }).then(res => {
                this.allPermission = server.message(res).allPermission
            })
        },
        beforeEditPermissionClose () {
            this.treeCheckedKey = []
            this.permissionEditVisable = false
        },
        auth (roleId) {
            this.currentRoleId = roleId
            this.permissionEditVisable = true
            server.getItem('/wills/rolePermission/get/' + roleId).then(res => {
                const data = server.message(res).allPermission
                this.$nextTick(() => {
                    this.$refs.pTree.setCheckedKeys(data)
                })
                data.forEach(e => {
                    this.treeCheckedKey.push(e.permissionId)
                })
                this.treeCheckedKey = Array.from(this.treeCheckedKey)
            })
        },
        setPermission () {
            const checkedKeys = this.$refs.pTree.getCheckedKeys()
            server.postItem('/wills/rolePermission/update/' + this.currentRoleId, [...checkedKeys]).then(res => {
                server.message(res, '权限更新成功！')
                this.permissionEditVisable = false
            })
        }
    }
}
</script>

<style lang="less" scoped>
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
