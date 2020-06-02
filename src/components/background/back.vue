<template>
  <div class="background_panel full">
    <el-container class="full">
      <el-aside>
        <el-menu
          mode="vertical"
          menu-trigger="click"
          background-color="#1c232f"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="$route.path"
        >
          <div class="userInfo">
            <p>
              <span v-text="blogTitle"></span>
            </p>
            <div class="userAvatar">
              <div class="userIcon">
                <img :src="userAvatarUrl" />
              </div>
              <div class="userInfo">
                <div>Wills</div>
                <div class="auth">管理员</div>
                <div>
                  <el-tag size="mini" type="success" effect="dark">online</el-tag>
                </div>
              </div>
            </div>
            <div class="searchOption">
              <el-input size="small" placeholder="请输入搜索的内容" v-model="searchContent">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </div>
          </div>
          <p style="color: #b9b9b9;font-size: 14px;text-align: left;margin: 20px 0 0 20px;">功能菜单</p>
          <el-menu-item v-for="item in parentMenu" :key="item.id" @click="addTab" :name='item.baseName' :index="item.url">
            <i :class="item.icon"></i>{{ item.baseName }}
          </el-menu-item>
          <el-submenu :index='item.id + ""' v-for="item in childrenMenus" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span v-text="item.baseName"></span>
            </template>
            <el-menu-item v-for="child in item.children" :key="child.id"  @click="addTab" :name='child.baseName' :index="child.url">
            <i :class="child.icon"></i>{{ child.baseName }}
            </el-menu-item>
          </el-submenu>
          <p style="color: #b9b9b9;font-size: 14px;text-align: left;margin: 20px 0 0 20px;">其他功能</p>
          <el-menu-item @click="logout"><i class="el-icon-coffee-cup"></i>退出系统</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 顶部标签页 -->
        <el-tabs
          :before-leave="beforeLeave"
          closable
          @tab-remove="removeTab"
          v-model="activeTab"
          type="border-card"
          @tab-click="routerPush"
        >
          <el-tab-pane
            :key="item.name"
            v-for="item in tabs"
            :label="item.name"
            :closable="item.closable"
            :name="item.url"
          >
            <router-view></router-view>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: '/base',
      beforeActive: '/base',
      collapse: false,
      ifHaveTab: false,
      searchContent: '',
      blogTitle: 'Wills博客后台管理',
      toggleBtnStyle: 'float:left;',
      userAvatarUrl: 'http://pics.sc.chinaz.com/Files/pic/icons128/5830/22.png',
      tabs: [{ name: '首页', closable: true, url: '/base' }],
      parentMenu: [],
      childrenMenus: []
    }
  },
  mounted () {
    this.getAllNav()
  },
  methods: {
    async getAllNav () {
      const { data: res } = await this.$http.get('/wills/base/getAllNav')
      this.childrenMenus = res.data
      this.childrenMenus.forEach((item, index) => {
        if (!item.children) {
          this.parentMenu.push(item)
          this.childrenMenus.splice(index, 1)
        }
      })
    },
    ifRepeatLocation (l) {
      const locations = window.location.href.split('/')
      if (l === '/' + locations[locations.length - 1]) {
        return true
      } else {
        return false
      }
    },
    routerPush (tab) {
      if (!this.ifRepeatLocation(tab.name)) {
        this.$router.push(tab.name)
      }
    },
    addTab (tab) {
      for (var i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].url === tab.index) {
          this.ifHaveTab = true
        }
      }
      if (this.ifHaveTab) {
        // 如果tabs里面有这个标签，则直接跳转到这个标签内即可
        this.activeTab = tab.index
        if (!this.ifRepeatLocation(tab.index)) {
          this.$router.push(tab.index)
        }
        // 要重新设置为flase 要不就会无法继续添加标签！
        this.ifHaveTab = false
      } else {
          // 如果没有这个标签
        this.tabs.push({
          name: tab.$attrs.name,
          closeable: true,
          url: tab.index
        })
        this.activeTab = tab.index
        if (!this.ifRepeatLocation(tab.index)) {
          this.$router.push(tab.index)
        }
      }
    },
    removeTab (name) {
      if (name !== '/base') {
        this.tabs.forEach((item, index) => {
          if (item.url === name) {
            this.tabs.splice(index, 1)
            // 回到上一次点击的页面
            this.activeTab = this.beforeActive
            this.$router.push(this.beforeActive)
          }
        })
      }
    },
    beforeLeave (activeName, oldActiveName) {
      // TODO BUG 退回上一个Tab标签有很大的问题，会为空！
      this.beforeActive = oldActiveName
    },
    logout () {
      // 退出系统
      this.$router.push('/main')
    }
  }
}
</script>

<style lang="less">
.background_panel {
  .el-container {
    .el-aside {
      background-color: #1c232f;
      height: 100%;
      .el-menu {
        border: 0;
        text-align: left;
        p {
          text-align: center;
        }
        .userInfo {
          width: 100%;
          .searchOption {
            .el-input {
              width: 85%;
              position: relative;
              left: 50%;
              transform: translateX(-50%);
            }
            .el-input__inner {
              background-color: #1c232f !important;
            }
          }
          p {
            padding: 20px 0;
            font-size: 18px;
            font-weight: bold;
            color: #ffffff;
            i {
              padding-top: 5px;
              cursor: pointer;
            }
          }
          .userAvatar {
            height: 88px;
            padding-top: 10px;
            .userIcon {
              float: left;
              margin: 0 10px 0 20px;
              border: 2px solid #585858;
              img {
                width: 56px;
                height: 56px;
              }
            }
            .userInfo {
              color: #ffffff;
              padding-top: 6px;
              .auth {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    .el-main {
      padding: 0px 0 0 0 !important;
      overflow: auto;
      background-color: #EBF0F2;
      .el-tabs {
        border: 0 !important;
        box-shadow: none;
        .el-tab-pane{
          div{
          }
        }
      }
    }
  }
}
</style>
