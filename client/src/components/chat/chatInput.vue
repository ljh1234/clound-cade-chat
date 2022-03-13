<template>
  <a-input-search v-model="msg" size="large" @search="handleSend">
    <a-button type="primary" slot="enterButton">
      {{ $t('sendButtonText') }}
    </a-button>
  </a-input-search>
</template>

<script>
export default {
  name: 'ChatInput',
  mounted() {},
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    handleSend() {
      this.$emit('send', this.mgs)
    },
    clearMsg() {
      this.msg = ''
    }
  }
}
</script>
