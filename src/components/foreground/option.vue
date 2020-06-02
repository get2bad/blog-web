<template>
    <div class="option">
        <!-- 搜索框 -->
        <div class="searchContent back">
            <el-autocomplete
              style="width: 100%;"
              class="inline-input"
              v-model="search"
              :trigger-on-focus="false"
              :fetch-suggestions="querySearch"
              placeholder="请输入您感兴趣的内容"
              @select="handleSelect">
              <i slot="suffix" @click="searchItem" class="el-input__icon el-icon-search"></i>
            </el-autocomplete>
        </div>
        <!-- 欢迎标语 -->
        <div class="welcome back">
          <div class="welcomeTitle">
            <h4 class="text-left">
              <i
                class="el-icon-s-opportunity"
                style="margin-right:5px;"
              />你好，朋友
            </h4>
          </div>
          <div class="welcomeContent">
            欢迎
            <span
              class="welcomeProvince"
              v-text="welcomeProvince"
            />的朋友
            <br>您是第
            <span
              class="welcomeTime"
              v-text="welcomeTime"
            />次访问本网站
          </div>
        </div>
        <!-- 天气预报 -->
        <div class="weather_box back">
            <iframe allowtransparency="true"
            frameborder="0" width="195"
            height="96" scrolling="no"
            src="//tianqi.2345.com/plugin/widget/index.htm?s=2&z=1&t=0&v=0&d=1&bd=0&k=&f=&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=54511&w=195&h=96&align=left">
            </iframe>
        </div>
        <!-- 日期 -->
        <!-- <div class="date_box back">
          <el-calendar v-model="value">
          </el-calendar>
        </div> -->
        <!-- 时间显示 -->
        <div class="time_box back">
          <!-- 星期数输出 -->
          <div>
            <el-row class="week_box">
              <el-col
                class="week"
                :span="3"
              >
                星期天
              </el-col>
              <el-col
                class="week"
                :span="3"
              >
                星期一
              </el-col>
              <el-col
                class="week"
                :span="3"
              >
                星期二
              </el-col>
              <el-col
                class="week"
                :span="3"
              >
                星期三
              </el-col>
              <el-col
                class="week"
                :span="3"
              >
                星期四
              </el-col>
              <el-col
                class="week"
                :span="3"
              >
                星期五
              </el-col>
              <el-col
                class="week"
                :span="3"
              >
                星期六
              </el-col>
            </el-row>
          </div>
          <!-- 时间输出 -->
          <div class="min_box">
            <p>
              {{ hour }} {{ colon }} {{ minutes }} {{ colon }} {{ seconds }}
            </p>
          </div>
        </div>
        <!-- <div class="category_box back">
            <el-row>
                <el-col class="cat_item" v-for="c in categories" :key="c.id" :span="7" :offset="3">
                    <router-link :to="c.url">{{ c.catName }}</router-link>
                </el-col>
            </el-row>
        </div> -->
        <!-- 音乐播放器 -->
        <div class="music_box back">
          <iframe frameborder="no"
              border="0" marginwidth="0"
              marginheight="0" width=230 height=50
              src="//music.163.com/outchain/player?type=0&id=2571133363&auto=0&height=32"></iframe>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            search: '',
            welcomeProvince: returnCitySN.cname,
            welcomeTime: localStorage.visitTime,
            hour: '00',
            colon: ':',
            minutes: '00',
            seconds: '00',
            categories: [
                { id: 1, catName: 'Java', url: '' },
                { id: 2, catName: 'C++', url: '' },
                { id: 3, catName: 'Golang', url: '' },
                { id: 4, catName: 'Python', url: '' },
                { id: 5, catName: 'Node', url: '' },
                { id: 6, catName: 'Vue', url: '' }
            ]
        }
    },
    created () {
        if (localStorage.visitTime) {
            localStorage.visitTime = Number(localStorage.visitTime) + 1
        } else {
            localStorage.visitTime = 1
        }
        this.refreshTime()
    },
    methods: {
        searchItem () {
        },
        refreshTime () {
            setInterval(() => {
              const date = new Date()
              this.hour =
                date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
              this.minutes =
                date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
              this.seconds =
                date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
            }, 1000)
        },
        querySearch (queryString, callback) {
          this.server.getItem('/wills/article/getByES/' + queryString).then(res => {
            const data = this.server.message(res)
            var list = []
            data.forEach(i => {
              i.value = i.articalTitle // this.$mark.render(i.articalTitle)
              list.push(i)
            })
            callback(list)
          })
        },
        handleSelect (item) {
          // console.log({ path: '/article', query: { articleId: item.articalId } })
          this.$router.push({ path: '/article', query: { articleId: item.articalId } })
          this.search = ''
        }
    },
    mounted () {
        const d = new Date()
        document.getElementsByClassName('week')[d.getDay()].style.color = 'green'
    }
}
</script>

<style lang="less" scoped>
.option{
    padding: 0 10px;
    border: 0;
    .category_box{
      padding: 8px;
        .cat_item{
            background-color: #c0c0c0;
            margin-bottom: 5px;
            line-height: 30px;
            border-radius: 5px;
        }
        .cat_item:hover{
          background-color: rgba(255,255,255,0.5);
        }
    }
    .time_box{
        .week_box{
            font-size: 14px;
        }
        .min_box{
            font-size: 24px;
        }
    }
    .searchContent{
        .el-input{
          border: 0;
            i{
                cursor: pointer;
            }
        }
    }
    .welcome{
        text-align: left;
        h4{
            margin: 0 0 5px 0;
        }
        .welcomeContent{
            font-size: 14px;
            .welcomeProvince{
                font-size: 18px;
            }
            .welcomeTime{
                font-size: 18px;
                color: red;
            }
        }
    }
}
</style>
