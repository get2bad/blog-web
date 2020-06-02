<template>
    <div class="article_manage">
        <div class="manage_tips">
            <p><i class="el-icon-notebook-2"></i>文章管理</p>
        </div>
        <div class="manage_content">
            <div class="manage_search">
                <span>搜索:分类：</span>
                <div>
                    <el-select v-model="condition.categoryId" placeholder="请选择" size="mini">
                        <el-option v-for="item in allCategory" :key="item.id" :label="item.categoryName" :value="item.categoryId" v-text="item.categoryName">Java</el-option>
                    </el-select>
                </div>
                <span>审核状态:</span>
                <div>
                    <el-select v-model="condition.status" placeholder="请选择" size="mini">
                        <el-option value="1" label="已审核"></el-option>
                        <el-option value="0" label="未审核"></el-option>
                    </el-select>
                </div>
                <div>
                    <el-input v-model="condition.articalTitle" size="mini" placeholder="输入文章的标题，支持模糊搜索" />
                </div>
                <div style="margin-left: 10px;">
                    <el-button size="mini" @click="getByCondition">搜索</el-button>
                    <el-button size="mini" @click="getAllArticle">默认</el-button>
                </div>
            </div>
            <div class="manage_result">
                <template>
                    <el-table
                      stripe border
                      ref="multipleTable"
                      :data="allArticle"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="selectChange">
                      <el-table-column
                        type="index">
                      </el-table-column>
                      <el-table-column
                        prop="articalTitle"
                        label="文章标题">
                      </el-table-column>
                      <el-table-column
                        label="文章缩略图"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-avatar shape="square" size="medium" :src="scope.row.picIntroduceImgUrl"></el-avatar>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="categoryName"
                        label="分类"
                        show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        label="标签"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-tag effect='dark' style="margin-right: 5px;" v-for="item in scope.row.tags" :key='item.id'>{{ item.tagName }}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="是否通过审核">
                        <template slot-scope="scope">
                            <span style="color: red;" v-if="scope.row.status === 0">未通过</span>
                            <span style="color: green;" v-else>通过</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="修改" placement="top">
                                <el-button size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :content="scope.row.status === 0 ? '通过' : '查看'" placement="top">
                                <el-button size="mini" type="primary" icon="el-icon-view" v-if="scope.row.status === 1" @click="view(scope.row)"></el-button>
                                <el-button size="mini" type="primary" icon="el-icon-check" v-else @click="passArticle(scope.row.articalId)"></el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除" placement="top">
                                <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteArticle(scope.row.articalId)"></el-button>
                            </el-tooltip>
                        </template>
                      </el-table-column>
                    </el-table>
                </template>
                <!-- :hide-on-single-page="true" -->
                <el-pagination
                style="text-align:left;"
                  @size-change="sizeChange"
                  @current-change="currentChange"
                  :current-page="articlePageHelper.start"
                  :page-sizes="[10,20,30,50]"
                  :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
            </div>
        </div>
        <el-drawer
          title="我是标题"
          ref="showDrawer"
          @opened='openDrawer'
          :visible.sync="viewArticle"
          :with-header="false">
            <div class="article_Title">
                <h2 v-text="article.articalTitle"></h2>
            </div>
            <div class="article_Img">
                <img :src='article.picIntroduceImgUrl' />
            </div>
            <div class="article_content">
                <p v-html="article.articleContent"></p>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import * as server from '../../../api/server.js'
export default {
    data () {
        return {
            viewArticle: false,
            article: {},
            condition: {
                categoryId: '',
                status: '',
                articalTitle: ''
            },
            articlePageHelper: {
                start: 0,
                percount: 10
            },
            allArticle: [],
            allCategory: [],
            allTag: [],
            total: 0
        }
    },
    mounted () {
        this.getAllArticle()
    },
    methods: {
        getByCondition () {
            const condition = this.condition
            if (condition.categoryId === 0 || condition.articalTitle === '') {
                condition.status = 1
            } else if (condition.articalTitle !== '') {
                condition.status = 1
            }
            server.post('/wills/article/getByCondition', { ...condition }).then(res => {
                const data = server.message(res)
                data.allArticle.forEach((item, index) => {
                    if (item.tag) {
                        const tagArray = item.tag.split(',')
                        item.tags = []
                        tagArray.forEach((tag) => {
                            this.allTag.some((t) => {
                                if (t.id === Number(tag)) {
                                    item.tags.push(t)
                                    return true
                                }
                            })
                        })
                    }
                    this.allCategory.forEach((c) => {
                        if (c.categoryId === item.categoryId) {
                            item.categoryName = c.categoryName
                        }
                    })
                })
                this.allArticle = data.allArticle
                this.total = data.total
                this.condition.articalTitle = ''
                this.condition.status = ''
                this.condition.categoryId = ''
            })
        },
        getAllArticle () {
            // 先获取所有的category
            server.getItem('/wills/category/getAll').then((res) => {
                this.allCategory = server.message(res).AllCategory
            })
            // 然后获取所有的tag
            server.getItem('/wills/tag/getAll').then((res) => {
                this.allTag = server.message(res).allTag
            })
            const pageHelper = this.articlePageHelper
            server.post('/wills/article/getAll', { ...pageHelper }).then((res) => {
                const data = server.message(res)
                data.allArticle.forEach((item, index) => {
                    if (item.tag) {
                        const tagArray = item.tag.split(',')
                        item.tags = []
                        tagArray.forEach((tag) => {
                            this.allTag.some((t) => {
                                if (t.id === Number(tag)) {
                                    item.tags.push(t)
                                    return true
                                }
                            })
                        })
                    }
                    this.allCategory.forEach((c) => {
                        if (c.categoryId === item.categoryId) {
                            item.categoryName = c.categoryName
                        }
                    })
                })
                this.allArticle = data.allArticle
                this.total = data.total
            })
        },
        selectChange () {},
        sizeChange (val) {
            // 当当前页面个数发生变法触发的事件
            this.articlePageHelper.percount = val
            this.getAllArticle()
        },
        currentChange (val) {
            // 当当前页码改变触发的事件
            this.articlePageHelper.start = val - 1
            this.getAllArticle()
        },
        deleteArticle (id) {
            // 拿到ID 进行文章删除操作
            server.deleteItemPromise('/wills/article/delete/' + id).then(res => {
                server.message(res, '恭喜您！删除文章成功！')
                this.getAllArticle()
            })
        },
        passArticle (id) {
            server.putItem('/wills/article/pass/' + id).then((res) => {
                server.message(res, '恭喜您，本篇文章已经通过审核！')
                this.getAllArticle()
            })
        },
        view (article) {
            this.article = article
            // 两个内容值一个是articalContent 用于存储真实的md值，一个是articleContent 用于存储转换完成的html值
            this.article.articleContent = this.$mark.render(this.article.articalContent)
            this.viewArticle = true
        },
        edit (article) {
            this.$router.push({ path: '/articleWrite', query: { editArticle: article } })
        },
        openDrawer () {
        }
    }
}
</script>

<style lang="less" scoped>
.article_Title{
    background-color: rgba(255,255,255,0.5);
    h2{
        margin: 0;
        padding: 20px;
    }
}
.article_Img{
    background-color: rgba(255,255,255,0.5);
    padding: 0 30px 10px 30px;
    img{
        height: 250px;
        width: 95%;
        border: 5px solid #cccccc;
    }
}
.article_content{
    background-color: rgba(255,255,255,0.5);
    padding: 0 20px 10px 20px;
    border-bottom: 1px solid #eeeeee;
    p{
        margin: 0;
        text-align: left;
        font-size: 14px;
    }
}
    .article_post{
        margin-top: 15px;
        background-color: rgba(255,255,255,0.5);
        padding: 20px;
        font-size: 14px;
        .el-tag{
            margin-left: 15px;
        }
        .padding15Px{
            padding: 0 15px 0 15px;
        }
    }
.article_manage{
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
        .manage_result{}
    }
}
</style>
