<template>
  <div class="login-wrapper">
    <div class="login-panel">
      <a-form :form="form">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          :label="$t('login.usernameLabel')"
        >
          <a-input
            v-decorator="[
              'username',
              { rules: [{ required: true, message: $t('login.usernamePlaceholder') }] },
            ]"
            :placeholder="$t('login.usernamePlaceholder')"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          :label="$t('login.passwordLabel')"
        >
          <a-input
            v-decorator="[
              'password',
              { rules: [{ required: true, message: $t('login.passwordPlaceholder') }] },
            ]"
            type="password"
            :placeholder="$t('login.passwordPlaceholder')"
          />
        </a-form-item>
        <div>
          <a-button type="primary" block html-type="submit" @click="handleLogin">
            {{ $t('login.confirmButtonText') }}
          </a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/auth'
import { message } from 'ant-design-vue'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
}
export default {
  name: 'Login',
  mounted() {},
  data () {
    return {
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this, { name: 'loginForm' })
    }
  },
  methods: {
    handleLogin() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const res = await login(values)

          if (res) {
            message.success({ content: '登录成功' })
            this.$store.commit('user/SET_TOKEN', res.token)
            this.$store.commit('user/SET_USER', res.userInfo)
            window.location.hash = '/'
          }
          console.log('res', res)
        }
      })
    }
  }
}
</script>

<style scoped lang = "less">
@media (max-width: 500px) {
  .login-panel {
    width: 100%;
  }
}
.login-wrapper {
  width: 100vw;
  height: 100vh;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-panel {
    box-sizing: border-box;
    width: 500px;
    padding: 20px;
    border: 1px solid #eee;
    background-color: #eee;
    border-radius: 10px;
  }
}
</style>
