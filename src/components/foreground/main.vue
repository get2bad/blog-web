<template>
  <div class='body'>
    <div class='carousel'>
      <el-carousel v-if="articles.length !== 0">
        <el-carousel-item v-for='item in carousel' :key='item.articalId'>
          <router-link :to="{ path: '/article', query: { articleId: item.articalId } }">
            <img
              class='carouselImg'
              :src='item.picIntroduceImgUrl'
              style='object-fit:scale-down'/>
            <div class='carouselContent'>
              <p>{{ item.articalTitle }}</p>
            </div>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class='article'>
      <div v-for="a in articles" :key="a.articalId" class='articleDiv'>
          <router-link :to="{ path: '/article', query: { articleId: a.articalId } }">
            <div class="articleImg">
                <img :src="a.picIntroduceImgUrl" />
            </div>
            <div class="articleInfo">
                <div class="articleTitle" v-text="a.articalTitle"></div>
                <div class="articleIntro" v-text="a.articalIntroduce"></div>
                <div class="articleView">
                    <i class="el-icon-time"></i><span v-text="a.postTime"></span>
                    <i class="el-icon-notebook-2"></i><span v-text="a.categoryName"></span>
                    <i class="el-icon-view"></i><span v-text="a.viewCount"></span>
                    <i class="el-icon-tickets"></i><span v-text="a.commentCount"></span>
                    <i class="el-icon-star-off"></i><span v-text="a.like"></span>
                </div>
            </div>
            <div class="clearFloat"></div>
          </router-link>
      </div>
      <div class="otherArticle">
          <!-- <div v-if="!moreFlag"><p v-text="otherArticle"></p></div> -->
          <div>
            <el-pagination
              background
              hide-on-single-page
              :page-size="pageHelper.perCount"
              :current-page.sync="pageHelper.start"
              @current-change="pageChange"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
      </div>
    </div>
    <div class='footer'>
      <div class='tips'></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // otherArticle: '😄 往下滑动获得更多好文章~',
      carousel: [],
      articles: [],
      allCategory: [],
      pageHelper: {
        start: 1,
        perCount: 5
      },
      total: 0,
      moreFlag: false
    }
  },
  created () {
    this.condition = this.$route.query.condition
    if (typeof (this.condition) !== 'undefined') {
      this.getByCondition(this.condition)
    } else {
      this.getArticle()
    }
  },
  watch: {
    '$route.query.condition' (to, from) {
      if (typeof (to) !== 'undefined') {
        this.pageHelper.start = 1
        this.getByCondition(to)
      } else {
        this.pageHelper.start = 1
        this.getArticle()
      }
    }
  },
  methods: {
    getByCondition (to) {
      this.articles = []
      const helper = { ...this.pageHelper }
        this.server.postItem('/wills/article/getByCondition/' + to, { ...helper }).then(res => {
          const data = this.server.message(res)
          data.allArticle.forEach(e => {
            e.postTime = e.postTime.split('T')[0]
            e.link = '/article/' + e.articalId
          })
          this.articles = data.allArticle
          this.total = data.total
          this.carousel = data.allArticle.slice(0, 3)
          if (this.articles.length < this.total) {
            this.moreFlag = true
          } else {
            // this.otherArticle = '😄 对不起，此分类下木有任何文章了~！'
            this.moreFlag = false
          }
        })
    },
    getArticle () {
      this.articles = []
      const helper = { ...this.pageHelper }
      this.server.postItem('/wills/article/getAllPass', { ...helper }).then(res => {
        const data = this.server.message(res)
        data.allArticle.forEach(e => {
          e.postTime = e.postTime.split('T')[0]
          e.link = '/article/' + e.articalId
        })
        this.articles = data.allArticle
        this.total = data.total
        this.carousel = data.allArticle.slice(0, 3)
        if (this.articles.length < this.total) {
          this.moreFlag = true
        } else {
          // this.otherArticle = '😄 对不起，此分类下木有任何文章了~！'
          this.moreFlag = false
        }
      })
    },
    pageChange (val) {
      this.pageHelper.start = val
      if (typeof (this.$route.query.condition) !== 'undefined') {
        this.getByCondition(this.$route.query.condition)
      } else {
        this.getArticle()
      }
    }
  }
}
</script>

<style lang='less' scoped>
.body {
  .carousel {
    margin: 0 0 10px 0;
    .el-carousel {
      .carouselImg {
        width: 100%;
        height: auto;
      }
      .carouselImg:hover {
        transform: scale(1.1);
        transition: transform 0.38s;
      }
      .carouselContent {
        position: absolute;
        top: 5%;
        left: 65%;
        background-image: linear-gradient(to right, rgba(169,169,169,0.1) , rgba(255,255,255,0.9));
        height: 8%;
        width: 30%;
        p{
            color: black;
            font-size: 16px;
            margin: 0;
            padding: 0;
        }
      }
      .carouselContent:hover{
        position: absolute;
        top: 5%;
        left: 65%;
        background-color: rgba(255, 255, 255, 0.8);
        height: 8%;
        width: 30%;
        p{
            font-size: 16px;
            margin: 0;
            padding: 0;
        }
      }
    }
  }
  .article{
      .otherArticle{
          background-color: rgba(255,255,255,0.5);
          padding: 1px 0;
          border-radius: 5px;
      }
      .articleDiv:hover{
        background-color: rgba(0,0,0,0.3);
        .articleImg{
          transform: scale(1.1);
          transition: transform 0.38s;
        }
      }
      .articleDiv{
          padding: 8px;
          background-color: rgba(255,255,255,0.5);
          margin-bottom: 10px;
          border-radius: 5px;
          .articleImg{
              margin-right: 10px;
              height: 96px;
              width: 96px;
              float: left;
              img{
                  height: 100%;
                  width: 100%;
              }
          }
        .articleInfo{
            height: 100px;
            text-align: left;
            position: relative;
            .articleTitle{
                font-size: 16px;
            }
            .articleIntro{
                font-size: 14px;
            }
            .articleView{
                position: absolute;
                bottom: 0;
                left: 100px;
                span:not(last-of-child){
                    font-size: 13px;
                    margin-right: 15px;
                }
            }
        }
      }
  }
}
</style>
