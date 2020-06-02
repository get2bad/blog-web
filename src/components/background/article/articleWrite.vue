<template>
    <div class="articleWrite">
        <div class="articleTips">
            <p class="iconfont icon-bianji">文章编辑</p>
        </div>
        <div class="articleBody">
            <el-form status-icon label-position="left" label-width="100px" :rules="rules" @submit.native.prevent size="medium" ref="form" :model="article">
              <el-form-item prop="title" label="文章标题">
                <el-input clearable style="float: left;width: 50%;" v-model="article.title"></el-input>
              </el-form-item>
              <el-form-item prop="imageUrl"  label="文章缩略图">
                  <el-upload
                    style="float: left; display: block;"
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :multiple="false"
                    :data="upload"
                    :drag="true"
                    :limit="1"
                    :on-success="uploadSuccess"
                    :on-remove="remove"
                    :before-upload="beforeUpload">
                    <img width="100%" height="100%" v-if="article.imageUrl" :src="article.imageUrl"/>
                    <i v-else class="el-icon-upload">点击或者拖拽图片到这里</i>
                  </el-upload>
              </el-form-item>
              <el-form-item prop="intro"  label="文章介绍">
                <el-input clearable style="float: left;width: 50%;" type="textarea" :autosize="{ minRows: 4 }" v-model="article.intro"></el-input>
              </el-form-item>
              <el-form-item prop="tag"  label="文章标签">
                  <div class="tags">
                      <el-tag
                      v-for="tag in tags"
                      :key="tag.tagName"
                      closable
                      @close='removeTag(tag)'
                      @click='confirmTag(tag)'
                      effect='dark'
                      :type="tag.tagType">
                      {{tag.tagName}}
                    </el-tag>
                    <el-input
                        clearable
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="newTagVal"
                      ref="saveTagInput"
                      size="mini"
                      @keyup.enter.native="inputConfirm"
                      @blur="inputConfirm"
                    ></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
                    <p>注意！如果您想选择文章标签，点击相应的标签或者新增标签即可~</p>
                  </div>
              </el-form-item>
              <el-form-item prop="category"  label="文章分类">
                   <el-select style="float:left;width: 50%;" v-model="article.category" placeholder="请选择">
                      <el-option
                        v-for="item in categories"
                        :key="item.categoryId"
                        :label="item.categoryName"
                        :value="item.categoryId">
                      </el-option>
                    </el-select>
              </el-form-item>
              <el-form-item  prop="content"  label="文章内容">
                  <mavon-editor :autofocus='false' ref="md" @imgAdd='uploadImg' @imgDel='uploadImgDel' v-model="article.content" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="createArticle">立即创建</el-button>
              </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { QiNiuToken, success, error, warning } from '../../../api/common.js'
import * as server from '../../../api/server.js'
export default {
    components: {
    },
    data () {
        return {
            inputVisible: false,
            newTagVal: '',
            viewUrl: '',
            upload: {
                token: '',
                key: ''
            },
            uploadUrl: '',
            rules: {
                title: [
                    { required: true, message: '请输入文章标题', trigger: 'blur' }
                ],
                imageUrl: [
                    { required: true, message: '请输入文章介绍方便大家认识你的文章', trigger: 'blur' }
                ],
                intro: [
                    { required: true, message: '请输入文章介绍方便大家认识你的文章', trigger: 'blur' }
                ],
                category: [
                    { required: true, message: '请选择文章的分类', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '文章内容是必不可少的哦~', trigger: 'blur' }
                ]
            },
            categories: [],
            tags: [],
            article: {
                id: '',
                title: '',
                imageUrl: '',
                intro: '',
                category: '',
                content: '',
                tags: []
            },
            allTags: '',
            autoSaveContent: false,
            autoSaveIntro: false,
            autoSaveTitle: false,
            editflag: false
        }
    },
    mounted () {
        if (!this.$route.query.editArticle) {
            this.editflag = false
            // 如果自动保存的存在 就自动赋值给article.content
            if (localStorage.autoSaveContent) {
                this.article.content = localStorage.autoSaveContent
            }
            if (localStorage.autoSaveIntro) {
                this.article.intro = localStorage.autoSaveIntro
            }
            if (localStorage.autoSaveTitle) {
                this.article.title = localStorage.autoSaveTitle
            }
        } else {
            this.editflag = true
            this.editArticle()
        }
        QiNiuToken().then(({ data: res }) => {
            this.upload.token = res.data.token
            this.uploadUrl = res.data.uploadUrl
            this.viewUrl = res.data.viewUrl
        })
        this.getAllCategory()
        this.getAllTag()
    },
    watch: {
        'article.content': {
            handler (newVal, oldVal) {
                if (this.autoSaveContent && !this.editflag) {
                    localStorage.autoSaveContent = newVal
                }
                this.autoSaveContent = true
            },
            immediate: true
        },
        'article.intro': {
            handler (newVal, oldVal) {
                if (this.autoSaveIntro && !this.editflag) {
                    localStorage.autoSaveIntro = newVal
                }
                this.autoSaveIntro = true
            },
            immediate: true
        },
        'article.title': {
            handler (newVal, oldVal) {
                if (this.autoSaveTitle && !this.editflag) {
                    localStorage.autoSaveTitle = newVal
                }
                this.autoSaveTitle = true
            },
            immediate: true
        }
    },
    methods: {
        editArticle () {
            var article = this.$route.query.editArticle
            this.article.id = article.articalId
            this.article.title = article.articalTitle
            this.article.imageUrl = article.picIntroduceImgUrl
            this.article.intro = article.articalIntroduce
            this.article.category = article.categoryId
            this.article.content = article.articalContent
            this.article.tags = article.tags
            this.article.viewCount = article.viewCount
            this.article.isDenyComment = article.isDenyComment
            this.article.isLock = article.isLock
            this.article.isSubmitTop = article.isSubmitTop
            this.article.status = article.status
            this.article.postTime = article.postTime
        },
        showInput () {
            this.inputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        getTime (ful) {
            const date = new Date()
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            const hour = date.getHours()
            const min = date.getMinutes()
            const sec = date.getSeconds()
            if (ful) {
                return year + '/' + month + '/' + day + '/' + ' ' + hour + ':' + min + ':' + sec
            } else {
                return year + '/' + month + '/' + day + '/'
            }
        },
        getAllCategory () {
            server.getItem('/wills/category/getAll').then((res) => {
                this.categories = server.message(res).AllCategory
            })
        },
        getAllTag () {
            server.getItem('/wills/tag/getAll').then((res) => {
                this.tags = server.message(res).allTag
                if (this.editflag) {
                    // 遍历所有tag标签，如果带有这个tag标签的就设置他的tagType为 info
                    this.tags.forEach(item => {
                        this.article.tags.some(t => {
                            if (t.tagName === item.tagName) {
                                item.tagType = ''
                            }
                        })
                    })
                }
            })
        },
        remove (file, fileList) {
            // 向后台发送数据，删除这个文件的七牛云和数据库信息
            const viewKey = file.response.key
            server.post('/wills/file/deleteKey', {
                filePath: this.viewUrl + viewKey,
                fileKey: viewKey
            }).then((res) => {
                server.message(res)
            })
            this.article.imageUrl = ''
        },
        createArticle () {
            // const contents = this.$mark.render(this.article.content)
            // 发布了文章就清除之前localStorage保存的内容
            localStorage.removeItem('autoSaveContent')
            localStorage.removeItem('autoSaveIntro')
            localStorage.removeItem('autoSaveTitle')
            this.article.tags.forEach((item) => {
                if (this.allTags === '') {
                    this.allTags += item.id
                } else {
                    this.allTags += ',' + item.id
                }
            })
            // 开始组装要给后端的对象
            const val = {
                categoryId: this.article.category,
                status: 0,
                viewCount: 0,
                // userId: 0 // TODO userId功能在登陆实现后再实现，现在暂时不实现
                tag: this.allTags, // TODO tags暂时不写，因为数据库和后端实体类暂时没有，后续会完善此功能
                articalTitle: this.article.title,
                articalContent: this.article.content,
                articalIntroduce: this.article.intro,
                picIntroduceImgUrl: this.article.imageUrl,
                isDenyComment: 0,
                isLock: 0,
                isSubmitTop: 0
            }
            if (this.editflag) {
                val.articalId = this.article.id
                val.viewCount = this.article.viewCount
                val.isDenyComment = this.article.isDenyComment
                val.isLock = this.article.isLock
                val.isSubmitTop = this.article.isSubmitTop
                val.status = this.article.status
                val.postTime = this.article.postTime
            }
            server.putItem('/wills/article/add', val).then((res) => {
                const data = server.message(res, '文章发布成功！')
                if (data === true) {
                    // 如果发布成功就清除之前的内容
                    this.article = {
                        title: '',
                        imageUrl: '',
                        intro: '',
                        category: '',
                        content: '',
                        tag: []
                    }
                }
            })
        },
        uploadSuccess (response, file, fileList) {
            this.article.imageUrl = this.viewUrl + response.key
            server.putItem('/wills/file/add', {
                filePath: this.viewUrl + response.key,
                fileType: file.raw.type,
                fileDescription: this.getTime() + '的文章简略图',
                fileKey: response.key
            }).then((res) => {
                server.message(res)
            })
        },
        beforeUpload (file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isJPG) {
              this.$message.error('上传图片只能是 JPG 格式!')
            }
            if (!isLt5M) {
              this.$message.error('上传图片大小不能超过 5MB!')
            }
            const date = new Date()
            this.upload.key = this.getTime() + 'articleTitle/' + file.name
            return isJPG && isLt5M
        },
        uploadImg (pos, file) {
            const putExtra = {
                fname: '',
                params: {},
                mimeType: ['image/png', 'image/jpeg', 'image/gif']
            }
            const config = {
                useCdnDomain: true // 使用cdn加速
            }
            const obs = this.qiniu.upload(file, this.getTime() + 'articleContent/' + file.name, this.upload.token, putExtra, config)
            obs.subscribe({
                next: (result) => {
                    this.nProgress.start()
                },
                error: (err) => {
                    error('上传到七牛云错误！', err)
                },
                complete: (res) => {
                    this.nProgress.done()
                    this.$refs.md.$img2Url(pos, this.viewUrl + res.key)
                }
            })
            server.putItem('/wills/file/add', {
                filePath: this.viewUrl + this.getTime() + 'articleContent/' + file.name,
                fileType: file.type,
                fileDescription: this.getTime() + '的文章内容',
                fileKey: this.getTime() + 'articleContent/' + file.name
            }).then((res) => {
                if (res.data.statusCode === 200) {
                    success('上传成功！', '恭喜您，上传成功了！')
                } else {
                    error('上传图片失败！', '服务器内部错误')
                    // 如果上传文件失败，就会去七牛云删除文件 后续会加上此功能 保证数据的完整性！
                }
            })
        },
        uploadImgDel (file) {
            // console.log('上传的图片删除了！')
        },
        removeTag (tag) {
            server.deleteItem('/wills/tag/delete/' + tag.id)
            setTimeout(() => {
                  this.getAllTag()
            }, 300)
        },
        confirmTag (tag) {
            tag.tagType = tag.tagType === '' ? 'info' : ''
            if (tag.tagType === '') {
                this.article.tags.push(tag)
            } else {
                // 有严重BUG
                this.article.tags.forEach((e, index) => {
                    if (e.tagName === tag.tagName) {
                        this.article.tags.splice(index, 1)
                    }
                })
            }
        },
        inputConfirm () {
            if (this.newTagVal) {
              server.putItem('/wills/tag/add', {
                  tagName: this.newTagVal
              }).then((res) => {
                  server.message(res)
              })
              setTimeout(() => {
                  this.getAllTag()
              }, 300)
              // 清空已经选择的标签
              this.article.tags = []
            }
            this.inputVisible = false
            this.newTagVal = ''
        }
    }
}
</script>

<style lang="less" scoped>
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
.tags{
    width: 47%;
    border: 1px solid #c0c4cc;
    padding: 20px;
    text-align: left;
    .el-tag{
        cursor: pointer;
        margin: 0 10px 20px 0;
    }
    .el-button{
        margin-bottom: 20px;
    }
    p{
        position:absolute;
        bottom:0;
        font-size:12px;
        color:#c0c0c0;
    }
}
.el-upload-dragger{
    width: 300px !important;
    height: 300px !important;
}
.el-icon-upload:before{
    display: block;
    font-size: 80px;
    padding-bottom: 20px;
}
.el-upload-dragger .el-icon-upload{
    font-size: 20px !important;
}
.articleWrite{
    padding: 0 0 0 10px;
    .articleTips{
        border-bottom: 2px solid #eeeeee;
        p{
            padding-bottom: 10px;
            text-align: left;
            font-size: 22px;
        }
    }
    .articleBody{
        padding: 30px 0 20px 0;
    }
}
</style>
