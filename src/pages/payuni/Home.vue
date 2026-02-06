<template>
  <q-page class="page">
    <div class="card">
      <h2>
        確認付款
      </h2>

      <form
        ref="payForm"
        method="POST"
        action="https://yomeen-payuni-api-dot-i-food-project-v1.an.r.appspot.com/v1/upp/create-order"
      >
        <div class="form-group">
          <label>商品名稱</label>
          <input
            type="text"
            name="ProdDesc"
            v-model="prodDesc"
          />
        </div>

        <div class="form-group">
          <label>金額（元）</label>
          <input
            type="number"
            name="TradeAmt"
            v-model.number="tradeAmt"
            min="1"
          />
        </div>

        <!-- 保留按鈕，方便測試或除錯 -->
        <button type="submit">
          送出付款
        </button>
      </form>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
}

.card {
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-top: 0;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  color: #555;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #4caf50;
}

button {
  width: 100%;
  padding: 12px;
  background: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 8px;
}

/* 你原本就有的 */
.hasFooterBar {
  margin-bottom: 50px;
}
</style>

<script>
export default {
  name: 'PageHome',
  data () {
    return {
      prodDesc: '測試商品',
      tradeAmt: 100
    }
  },
  methods: {
    applyQueryParams () {
      const search = window.location.search
      const hash = window.location.hash || ''
      const hashQuery = hash.includes('?') ? hash.slice(hash.indexOf('?')) : ''

      const qs = search && search !== '?' ? search : hashQuery
      if (!qs) return

      const params = new URLSearchParams(qs)

      const qProdDesc = params.get('prodDesc')
      const qTradeAmt = params.get('tradeAmt')

      if (qProdDesc) {
        this.prodDesc = qProdDesc
      }

      if (qTradeAmt) {
        const n = Number(qTradeAmt)
        if (!Number.isNaN(n) && n > 0) {
          this.tradeAmt = n
        }
      }
    },

    autoSubmit () {
      // 等 DOM 與 v-model 同步完成後再送出
      this.$nextTick(() => {
        if (this.$refs.payForm) {
          this.$refs.payForm.submit()
        }
      })
    }
  },
  mounted () {
    // 1. 先吃 URL 參數
    this.applyQueryParams()

    // 2. 直接送出付款
    this.autoSubmit()
  }
}
</script>
