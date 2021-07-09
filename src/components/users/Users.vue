<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="9">
          <el-input placeholder="请输入内容"
                    v-model="queryInfo.query"
                    clearable
                    @clear="getUsersList">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="getUsersList">
            </el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
                     @click="dialogVisible=true">
            添加用户
          </el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userList"
                border
                stripe>
        <el-table-column type="index"
                         label="#"
                         width="50"
                         align="center">
        </el-table-column>
        <el-table-column prop="username"
                         label="用户名"
                         width="180">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="手机号"
                         width="180">
        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱"
                         width="200">
        </el-table-column>
        <el-table-column prop="role_name"
                         label="角色"
                         width="140">
        </el-table-column>
        <el-table-column label="状态"
                         width="150">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.mg_state"
                       @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="183">
          <template slot-scope=''>
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini">
            </el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini">
            </el-button>
            <el-tooltip effect="dark"
                        content="分配角色"
                        placement="top"
                        :enterable="false">
              <el-button type="warning"
                         icon="el-icon-setting"
                         size="mini">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[1, 2, 3, 4, 5]"
                     :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户"
               :visible.sync="dialogVisible"
               width="50%"
               @close="dialogClosed">
      <!-- 内容主体 -->
      <el-form :model="addForm"
               :rules="addFormRules"
               ref="addFormRef"
               label-width="70px">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      prop="mobilePhone">
          <el-input v-model="addForm.mobilePhone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取 消
        </el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'users',
  data () {
    //手机号验证规则
    var validatorPhone = (rule, value, cb) => {
      var regEmail = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!regEmail.test(value)) {
        cb(new Error("手机号格式错误"));
      } else {
        cb();
      }
    };
    //验证邮箱规则
    var validatorEmail = (rule, value, cb) => {
      var regMobile = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!regMobile.test(value)) {
        cb(new Error("邮箱格式错误"));
      } else {
        cb();
      }
    };
    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: "",
        //当前页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 2
      },
      userList: [],
      total: 0,
      //控制添加用户框的显示与影藏
      dialogVisible: false,
      //添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        mobilePhone: "",
        email: ""
      },
      //添加表单验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名的长度在3~10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码长度需在6~16位之间",
            trigger: "blur"
          }
        ],
        mobilePhone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            validator: validatorPhone,
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: validatorEmail, trigger: "blur" }
        ]
      }
    }
  },
  created () {
    this.getUsersList()
  },
  methods: {
    async getUsersList () {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      // console.log(res);
      if (res.meta.status !== 200) return this.$message.error("获取用户列表失败");
      this.userList = res.data.users;
      this.total = res.data.total;
      // console.log(this.userList);
    },
    //监听pagesize改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUsersList();
    },
    //监听页码值改变的事件
    handleCurrentChange (newPage) {
      // console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getUsersList();
    },
    //监听switch开关的状态改变
    async userStateChanged (userInfo) {
      // console.log(userInfo);
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      );
      if (res.meta.status !== 200) {
        return this.$message.error("更新用户列表失败");
        userInfo.mg_state = !userInfo.mg_state;
      }
      this.$message.success("更新用户状态成功");
    },
    dialogClosed () {
      //监听添加用户对话框的关闭事件
      this.$refs.addFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>