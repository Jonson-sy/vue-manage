<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div class="left_header">
        <img src="~assets/img/myavatar.jpg"
             alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info"
                 @click="logout">退出
      </el-button>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button"
             @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区 -->
        <el-menu background-color="#333744"
                 text-color="#fff"
                 active-text-color="#409eff"
                 unique-opened
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 :router="true"
                 :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id +''"
                      v-for="item in menuList"
                      :key="item.id">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+ subItem.path"
                          v-for="subItem in item.children"
                          :key="subItem.id"
                          el-icon-s-grid
                          @click="saveNavState('/'+ subItem.path)">
              <!-- 二级菜单模板 -->
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      //左侧菜单数据
      menuList: [],
      iconList: {
        "125": "iconfont  icon-user",
        "103": "iconfont  icon-3702mima",
        "101": "iconfont  icon-shangpin",
        "102": "iconfont  icon-danju",
        "145": "iconfont  icon-baobiao"
      },
      isCollapse: false,
      //被激活的链接地址
      activePath: ''
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      //退出的原理很简单即清空token
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    //获取所有的菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log(res);
    },
    //点击按钮切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    //保存连接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  // height: 100vh;
  height: 100%;
}

.el-header {
  background-color: #363d40;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left_header {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    span {
      color: #fff;
      font-size: 20px;
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #313743;
  .iconfont {
    margin-right: 15px;
  }
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  color: white;
  font-size: 12px;
  padding: 3px 0;
  letter-spacing: 0.3em;
  background-color: #495065;
  text-align: center;
  cursor: pointer;
}
.toggle-button :hover {
  color: #409eff;
}
</style>