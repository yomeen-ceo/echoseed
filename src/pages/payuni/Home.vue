<template>
  <q-page class="q-pa-md flex flex-center bg-grey-2">
    <q-card class="full-width" style="max-width: 520px;">
      <q-card-section>
        <div class="text-h6">模擬 EchoSeed 下單</div>
        <div class="text-caption text-grey-7 q-mt-xs">
          模擬從 echoseed 前端發起付款，交易完成後 redirect 回 echoseed 的 payResult 頁面
        </div>
      </q-card-section>

      <q-separator />

      <!-- 流程說明 -->
      <q-card-section>
        <q-banner rounded class="bg-blue-1 text-blue-9">
          流程：
          此頁面 → payuni-api 建單 → PAYUNi 付款 →
          payuni-api 解密 → redirect 到 echoseed /payuniOrder/payResult
        </q-banner>
      </q-card-section>

      <q-form
        method="POST"
        action="https://yomeen-payuni-api-dot-i-food-project-v1.an.r.appspot.com/v1/upp/create-order"
        class="q-gutter-md"
      >
        <q-card-section>

          <q-input
            v-model="merTradeNo"
            name="MerTradeNo"
            label="訂單編號（選填）"
            outlined
            placeholder="留空則自動產生"
          />

          <q-input
            v-model="prodDesc"
            name="ProdDesc"
            label="商品名稱"
            outlined
          />

          <q-input
            v-model.number="tradeAmt"
            name="TradeAmt"
            type="number"
            label="金額（元）"
            outlined
            min="1"
          />

          <q-select
            v-model="isSandbox"
            name="isSandbox"
            label="環境"
            outlined
            :options="sandboxOptions"
            emit-value
            map-options
          />

          <q-input
            v-model="usrMail"
            name="UsrMail"
            type="email"
            label="UsrMail"
            outlined
          />

          <!-- clientReturnURL -->
          <q-select
            v-model="clientReturnURL"
            label="交易結果頁 (clientReturnURL)"
            outlined
            :options="returnUrlOptions"
            emit-value
            map-options
          />

          <q-input
            v-model="clientReturnURL"
            name="clientReturnURL"
            outlined
            placeholder="或自行輸入 URL"
          />

        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            color="primary"
            type="submit"
            label="送出付款"
            unelevated
            class="full-width"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const merTradeNo = ref('')
const prodDesc = ref('EchoSeed 測試商品')
const tradeAmt = ref(100)
const isSandbox = ref(false)
const usrMail = ref('admin@yomeen.com')

const clientReturnURL = ref(
  'https://echoseed-dot-i-food-project-v1.an.r.appspot.com/payuniOrder/payResult'
)

const sandboxOptions = [
  { label: '正式區', value: false },
  { label: '測試區 (Sandbox)', value: true }
]

const returnUrlOptions = [
  {
    label: '不 redirect（使用本專案 payment-result 頁面）',
    value: ''
  },
  {
    label: 'EchoSeed payResult',
    value: 'https://echoseed-dot-i-food-project-v1.an.r.appspot.com/payuniOrder/payResult'
  }
]
</script>
