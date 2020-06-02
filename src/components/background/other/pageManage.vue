<template>
    <div class="comment_manage">
        <div class="manage_tips">
            <p><i class="el-icon-s-grid"></i>页面管理</p>
        </div>
        <div class="manage_content">
            <el-card>
                <el-button type="primary" class="addRouter" @click="addNewRouterDialog = true">添加路径导航</el-button>
                <el-table
                  border
                  :data="allRouter"
                  style="width: 100%">
                  <el-table-column
                    type="index">
                  </el-table-column>
                  <el-table-column
                    prop="menuName"
                    label="导航名称">
                  </el-table-column>
                  <el-table-column
                    prop="menuUrl"
                    label="导航url">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="修改" placement="top">
                        <el-button @click="editMenu(scope.row)" type="primary" size="mini" icon="el-icon-edit"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button @click="deleeteRouter(scope.row.menuId)" type="danger" size="mini" icon="el-icon-refresh-left"></el-button>
                        </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="current"
                  :page-sizes="[10, 20, 30, 50]"
                  :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
            </el-card>
        </div>
        <el-dialog title="添加新的导航" :visible.sync="addNewRouterDialog">
          <el-form style="text-align:left;" :model="router">
              <el-form-item label="父导航节点" label-width="120px">
                <el-select style="width: 50%;" v-model="router.menuParent" placeholder="请选择父节点">
                  <el-option label="总节点" value="0" selected></el-option>
                  <el-option v-for="item in allRouter" :key='item.menuId' :label="item.menuName" :value="item.menuId"></el-option>
                </el-select>
              </el-form-item>
            <el-form-item label="导航名称" label-width="120px">
              <el-input style="width: 50%;" v-model="router.menuName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="导航路径" label-width="120px">
              <el-input style="width: 50%;" v-model="router.menuUrl" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addNewRouterDialog = false">取 消</el-button>
            <el-button type="primary" @click="addNewRouter">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            addNewRouterDialog: false,
            allRouter: [],
            total: 0,
            pageHelper: {
                start: 1,
                perCount: 10
            },
            current: 1,
            router: {
                menuName: '',
                menuUrl: '',
                menuParent: ''
            }
        }
    },
    created () {
        this.getAllPath()
    },
    methods: {
        getAllPath () {
            const pageHelper = this.pageHelper
            this.server.post('/wills/menu/getAll', { ...pageHelper }).then(res => {
                const data = this.server.message(res)
                this.allRouter = data.allConfig
                this.total = data.total
            })
        },
        handleSizeChange (val) {
            this.pageHelper.perCount = val
            this.getAllPath()
        },
        handleCurrentChange (val) {
            this.pageHelper.start = val
            this.getAllPath()
        },
        addNewRouter () {
            const menu = this.router
            if (menu.menuId) {
                this.server.post('/wills/menu/update', { ...menu }).then(res => {
                    this.server.message(res, '更新成功！')
                    this.getAllPath()
                    this.addNewRouterDialog = false
                })
            } else {
                this.server.putItem('/wills/menu/add', { ...menu }).then(res => {
                    this.server.message(res, '添加导航成功！')
                    this.getAllPath()
                    this.addNewRouterDialog = false
                })
            }
        },
        deleeteRouter (id) {
            this.server.deleteItem('/wills/menu/delete/' + id)
            this.getAllPath()
        },
        editMenu (menu) {
            this.router = menu
            this.addNewRouterDialog = true
        }
    }
}
</script>

<style lang="less" scoped>
.comment_manage{
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
        .addRouter{
            margin-bottom: 15px;
        }
    }
}
</style>
