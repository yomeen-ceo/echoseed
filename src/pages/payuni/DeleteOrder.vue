<template>
  <q-page class="query-page">
    <div class="query-wrap" :class="{ landscape: isLandscape }">

      <section class="query-box">
        <div class="title">訂單交易刪除</div>
        <div class="subtitle">請輸入您的訂單編號</div>

        <q-input
          v-model="orderId"
          outlined
          clearable
          class="order-input"
          placeholder="例如：ORDER1700000000000"
        />

        <q-btn
          class="submit-btn"
          label="送出查詢"
          unelevated
          @click="submitQuery"
        />
      </section>

    </div>
  </q-page>
</template>

<style scoped>
/* ================= 基本（直立） ================= */
.query-page {
  min-height: 100vh;
  background: #f6e6e3;
  display: flex;
  justify-content: center;
}

.query-wrap {
  width: 100%;
  max-width: 480px;
  padding: 80px 20px 120px;
  display: flex;
  justify-content: center;
}

.query-box {
  width: 100%;
  text-align: center;
}

/* 標題 */
.title {
  font-size: 40px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.85);
}

.subtitle {
  font-size: 20px;
  margin-bottom: 36px;
  color: rgba(0, 0, 0, 0.6);
}

/* Input */
.order-input {
  margin-bottom: 36px;
}

.order-input :deep(.q-field__control) {
  font-size: 20px;
  height: 56px;
}

/* Button */
.submit-btn {
  width: 100%;
  font-size: 22px;
  padding: 14px 0;
  background: rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.75);
}

/* ================= 橫式（Landscape） ================= */
.query-wrap.landscape {
  max-width: 960px;
  padding: 60px 60px 90px;
}

.query-wrap.landscape .title {
  font-size: 72px;
}

.query-wrap.landscape .subtitle {
  font-size: 34px;
  margin-bottom: 48px;
}

.query-wrap.landscape .order-input :deep(.q-field__control) {
  font-size: 34px;
  height: 76px;
}

.query-wrap.landscape .submit-btn {
  font-size: 36px;
  padding: 22px 0;
}
</style>

<script>
export default {
  name: 'Query',
  data () {
    return {
      orderId: ''
    }
  },
  computed: {
    isLandscape () {
      return this.$q.screen.width > this.$q.screen.height
    }
  },
  methods: {
    async submitQuery () {
      if (!this.orderId) {
        this.$q.notify({
          type: 'warning',
          message: '請先輸入訂單編號'
        })
        return
      }

      // 👉 這裡之後直接接 API 即可
      // e.g. axios.get('/api/order', { params: { orderId: this.orderId } })

      console.log('查詢訂單 ID：', this.orderId)
      const res = await this.axiosInstance.post('https://yomeen-payuni-api-dot-i-food-project-v1.an.r.appspot.com/v1/trade/query', {
        isSandbox: false,
        merTradeNo: this.orderId
      })
      console.log('=============res.data')
      console.log(res.data)
      this.$q.notify({
        type: 'info',
        message: `已送出查詢：${this.orderId}`
      })
    }
  }
}
</script>
