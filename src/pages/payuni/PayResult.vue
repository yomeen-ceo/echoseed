<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="full-width" style="max-width: 640px;">
      <q-card-section class="row items-center q-pb-sm">
        <div class="text-h6">交易結果</div>
        <q-space />
        <q-badge
          :color="isSuccess ? 'positive' : 'negative'"
          align="middle"
          class="q-px-sm q-py-xs"
        >
          {{ result.Status }} - {{ result.Message }}
        </q-badge>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-list bordered separator>
          <q-item>
            <q-item-section>
              <q-item-label caption>商店訂單編號</q-item-label>
              <q-item-label>{{ result.MerTradeNo || '-' }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label caption>UNi 交易序號</q-item-label>
              <q-item-label>{{ result.TradeNo || '-' }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label caption>交易金額</q-item-label>
              <q-item-label>NT$ {{ result.TradeAmt || 0 }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="result.Card6No">
            <q-item-section>
              <q-item-label caption>信用卡</q-item-label>
              <q-item-label>{{ result.Card6No }}******{{ result.Card4No }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="result.AuthCode">
            <q-item-section>
              <q-item-label caption>授權碼</q-item-label>
              <q-item-label>{{ result.AuthCode }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="result.AuthBankName">
            <q-item-section>
              <q-item-label caption>發卡銀行</q-item-label>
              <q-item-label>{{ result.AuthBankName }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-expansion-item
          class="q-mt-md"
          icon="code"
          label="查看完整 JSON 資料 (res.json)"
          dense
          expand-separator
        >
          <q-card flat bordered class="q-mt-sm">
            <q-card-section class="bg-grey-1">
              <pre class="json-pre">{{ formattedResult }}</pre>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="回首頁" icon="home" @click="goHome" />
        <q-btn
          :color="isSuccess ? 'positive' : 'negative'"
          unelevated
          :label="isSuccess ? '完成' : '重新付款'"
          :icon="isSuccess ? 'check_circle' : 'refresh'"
          @click="goNext"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style scoped>
.json-pre {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>

<script>
export default {
  name: 'PayResult',
  data () {
    return {
      result: {
        Status: '',
        Message: '',
        MerTradeNo: '',
        TradeNo: '',
        TradeAmt: 0,
        Card6No: '',
        Card4No: '',
        AuthCode: '',
        AuthBankName: ''
      }
    }
  },
  computed: {
    isSuccess () {
      return this.result.Status === 'SUCCESS'
    },
    formattedResult () {
      return JSON.stringify(this.result, null, 2)
    }
  },
  methods: {
    goHome () {
      this.$router.push({ path: '/' })
    },
    goNext () {
      // 依你的流程調整：
      // 成功：回商品頁/訂單列表；失敗：回付款頁重試
      if (this.isSuccess) {
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ path: '/pay' })
      }
    }
  },
  mounted () {
    // 方案 A：從 querystring 取 result（建議）
    const q = this.$route.query || {}
    if (q.result) {
      try {
        const decoded = decodeURIComponent(q.result)
        this.result = JSON.parse(decoded)
        // 可選：存一份避免重整丟失
        localStorage.setItem('PAY_RESULT_LAST', JSON.stringify(this.result))
        return
      } catch (e) {
        // fallback below
      }
    }

    // 方案 B：從 localStorage 取最後一次結果（避免跳轉後重整）
    const last = localStorage.getItem('PAY_RESULT_LAST')
    if (last) {
      try {
        this.result = JSON.parse(last)
      } catch (e) {}
    }
    const formattedResult = JSON.stringify(this.result)
    console.log('=====================formattedResult')
    console.log(formattedResult)
  }
}
</script>
