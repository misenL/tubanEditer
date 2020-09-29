<template>
  <div v-html="html" />
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      html: ''
    }
  },
  mounted() {
    this.fetchVideoPay()
  },
  methods: {
    async fetchVideoPay() {
      const resources = [{ name: 'pay' }]
      const params = {
        name: '积分充值，支付宝支付',
        money: this.$route.query.money
      }
      const res = await this.api.restful({ resources, params })
      this.html = res
      this.$nextTick(() => {
        document.forms[0].submit()
      })
    }
  }
}
</script>

<style scoped>

</style>
