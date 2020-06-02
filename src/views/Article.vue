<template>
    <div class="article_panel boxShadow">
        <div class="article_Title">
            <h1 v-text="article.articalTitle"></h1>
        </div>
        <div class="article_Img">
            <img :src='article.picIntroduceImgUrl' />
        </div>
        <div class="article_content">
            <p v-html="article.articalContent"></p>
        </div>
        <div class="article_post">
            <div>本文于<span class="post_time padding15Px" v-text="article.postTime"></span>发布在<span v-text="article.categoryName" class="padding15Px category"></span>分类下，当前被围观<span v-text="article.viewCount" class="padding15Px views"></span>次</div>
            <div>相关标签:<el-tag type="success" v-for="t in article.tags" :key='t.id' effect='dark' size="mini" v-text="t.tagName"></el-tag></div>
            <div>版权声明: <span class="copyright padding15Px" v-text="copyright"></span>|<span class="openSource padding15Px">Creative Commons BY-NV 3.0 CN</span></div>
        </div>
        <div class="article_comment">
            <el-form ref="form" :model="comment" label-width="80px">
              <el-form-item label="昵称">
                <el-input size="mini" v-model="comment.userName"></el-input>
              </el-form-item>
              <el-form-item label="评论">
                <el-input size="mini" :rows='4' type="textarea" v-model="comment.commentContent"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" type="primary" @click="onSubmit">提交</el-button>
                <el-button size="mini">重置</el-button>
              </el-form-item>
            </el-form>
        </div>
        <div class="comment_result">
            <div class="comment_title">
                <div class="comment_total">{{ comments.total }} 条看法</div>
                <div class="comment_like"><i class="el-icon-star-on"></i>{{ article.like }} 人觉得很赞</div>
                <div class="comment_money">赞助</div>
            </div>
            <div class="comment_content_panel">
                <el-card class="boxShadow">
                    <div v-for="item in allComment" :key="item.commentId" class="comment_res">
                        <el-row>
                            <el-col style="margin-right: 10px;" :xs='3' :sm='3' :md="3" :lg="3" :xl="2">
                                <img style="width: 64px;height: 64px;" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" class="image">
                            </el-col>
                            <el-col :span="20">
                                <div class="username" v-text="item.userName"></div>
                                <div class="bottom clearfix">
                                    <time class="time" v-text="item.postTime.split('T')[0]"></time>
                                    <p class="comment_content" v-text="item.commentContent">水电费可接受的发送到空间发第三方圣诞节快乐水电费进口量第三方</p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <el-pagination
                        style="margin-top:10px;"
                      layout="total, prev, pager, next"
                      @current-change="pageChange"
                      hide-on-single-page
                      :page-size="helper.perCount"
                      :current-page.sync="helper.start"
                      :total="commentTotal">
                    </el-pagination>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            comment: {
                userName: '',
                commentContent: ''
            },
            article: {},
            copyright: '自由转载/署名/非商业性使用',
            comments: {
                total: 200,
                content: []
            },
            allComment: [],
            helper: {
                start: 1,
                perCount: 5
            },
            commentTotal: 0
        }
    },
    created () {
        this.article.articleId = this.$route.query.articleId
        this.getArticle(this.$route.query.articleId)
        this.getComment(this.$route.query.articleId)
    },
    watch: {
        '$route.query.articleId': {
            handler: function (val, oldval) {
                this.getArticle(val)
                this.getComment(val)
            },
            immediate: true
        }
    },
    methods: {
        getArticle (id) {
            this.server.getItem('/wills/article/get/' + id).then(res => {
                const article = this.server.message(res)
                article.postTime = article.postTime.split('T')[0]
                article.articalContent = this.$mark.render(article.articalContent)
                this.article = article
            })
        },
        onSubmit () {
            var c = this.comment
            c.articleId = this.article.articalId
            c.postIp = returnCitySN.cip
            this.server.putItem('/wills/comment/add', { ...c }).then(res => {
                this.server.message(res, '评论发表成功咯~')
                this.getComment(c.articleId)
                this.comment = { userName: '', commentContent: '' }
            })
        },
        getComment (articleId) {
            const helper = this.helper
            this.server.post('/wills/comment/get/' + articleId, { ...helper }).then(res => {
                const data = this.server.message(res)
                this.allComment = data.allComment
                this.commentTotal = data.total
            })
        },
        pageChange (val) {
            this.helper.start = val
            this.getComment(this.article.articleId)
        }
    }
}
</script>

<style lang="less" scoped>
.el-card{
    margin-top:10px !important;
    padding: 0px 5px 5px 2px !important;
}
.comment_res:hover{
    background-color: rgba(200,200,200,0.6);
    cursor: pointer;
}
.comment_res{
    margin-top: 10px;
    width: 100% !important;
    background-color: rgba(200,200,200,0.2);
    padding: 10px 0 10px 10px;
    time{
        font-size: 10px !important;
    }
    .username{
        font-size: 15px;
    }
    .comment_content{
        font-size: 13px;
    }
}
.article_panel{
    width: 100%;
    margin-bottom: 100px;
    div:not(:first-of-type){
        text-align: left;
    }
    .article_Title{
        background-color: rgba(255,255,255,0.5);
        h1{
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
    .article_comment{
        margin-top: 10px;
        padding: 30px 30px 0px 0px;
        background-color: rgba(255,255,255,0.5);
        .el-form{
            .el-form-item{
                text-align: center;
                .el-button{
                    display: inline-block;
                }
            }
        }
    }
    .comment_result{
        background-color: rgba(255,255,255,0.5);
        padding: 10px;
        .comment_title{
            padding-bottom: 10px;
            border-bottom: 1px solid #c0c0c0;
            div{
                display: inline-block;
                background-color: #cccccc;
                color: black;
                font-size: 14px;
                padding: 3px 8px;
                margin-right: 10px;
                cursor: pointer;
                i{
                    font-size: 18px !important;
                    padding: 1px 3px;
                }
            }
            .comment_like:hover{
                i{
                    color: red;
                }
            }
            .comment_money{
                animation: colorRedToGreen 5s infinite;
            }
        }
    }
}
</style>
