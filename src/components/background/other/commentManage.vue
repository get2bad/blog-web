<template>
    <div class="comment_manage">
        <div class="manage_tips">
            <p><i class="el-icon-s-check"></i>评论管理</p>
        </div>
        <div class="manage_content">
            <el-card>
                <el-table
                  border
                  :data="allArticle"
                  style="width: 100%">
                  <el-table-column
                    type="expand">
                    <template slot-scope="scope">
                      <el-table
                        border
                        :data="scope.row.comments"
                        style="padding: 10px;width: 100%">
                        <el-table-column
                          prop="commentContent"
                          label="内容">
                        </el-table-column>
                        <el-table-column
                          prop="postTime"
                          label="发布日期">
                        </el-table-column>
                        <el-table-column
                          prop="postIp"
                          label="发送IP">
                        </el-table-column>
                        <el-table-column
                          prop="userName"
                          label="发布者">
                        </el-table-column>
                        <el-table-column
                          prop="status"
                          label="状态">
                          <template slot-scope="scope">
                            <span v-if="scope.row.status === 0" style="color:red">未通过</span>
                            <span v-else style="color:green">通过</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="操作">
                          <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="更改评论状态" placement="top">
                              <el-button @click="passComment(scope.row)" type="primary" size="mini" icon="el-icon-check"></el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除此评论" placement="top">
                              <el-button @click="deleteComment(scope.row)" type="danger" size="mini" icon="el-icon-close"></el-button>
                            </el-tooltip>
                          </template>
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="articalTitle"
                    label="文章">
                  </el-table-column>
                  <el-table-column
                    prop="postTime"
                    label="发布日期">
                  </el-table-column>
                  <el-table-column
                    label="审核状态">
                    <template slot-scope="scope">
                        {{ scope.row.status === 1 ? '通过':'未通过' }}
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                style='text-align:left;'
                  @size-change="sizeChange"
                  @current-change="currentChange"
                  :current-page="pageHelper.start"
                  :page-sizes="[10, 20, 30, 50]"
                  :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            allComment: [],
            allArticle: [],
            pageHelper: {
              start: 1,
              perCount: 10
            },
            total: 0
        }
    },
    created () {
      this.getAllArticle()
    },
    methods: {
      getAllArticle () {
        const pageHelper = this.pageHelper
        this.server.post('/wills/article/getAll', { ...pageHelper }).then(res => {
          const data = this.server.message(res)
          this.allArticle = data.allArticle
          this.total = data.total
        })
      },
      passComment (comment) {
        this.server.getItem('/wills/comment/changeStatus/' + comment.commentId).then(res => {
          this.server.message(res, '更改状态成功！')
          if (comment.status === 0) {
            comment.status = 1
          } else {
            comment.status = 0
          }
        })
      },
      deleteComment (comment) {
        this.server.deleteItem('/wills/comment/delete/' + comment.commentId)
        this.getAllArticle()
      },
      sizeChange (val) {
        this.pageHelper.perCount = val
        this.getAllArticle()
      },
      currentChange (val) {
        this.pageHelper.start = val
        this.getAllArticle()
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
}
</style>
