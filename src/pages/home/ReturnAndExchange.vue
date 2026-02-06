<template>
  <q-page class="policy-page">
    <div class="wrap" :class="{ landscape: isLandscape }">
      <div class="page-title">退換貨政策</div>

      <div class="policy-card">
        <div class="policy-h1">退換貨與退費政策說明</div>

        <div class="p">
          感謝您支持本品牌，為保障雙方權益，請於購買前詳閱以下退換貨與退費政策。完成購買即視為同意本政策內容。
        </div>

        <div class="section">
          <div class="h2">一、適用範圍</div>
          <div class="p">本政策適用於本品牌所販售之：</div>
          <ul class="ul">
            <li>骨牌相關實體商品</li>
            <li>親子／兒童／成人骨牌課程、體驗課</li>
            <li>工作坊、活動、票券類商品</li>
          </ul>
          <div class="p">不同商品類型之退換貨方式略有差異，請依下列說明辦理。</div>
        </div>

        <div class="section">
          <div class="h2">二、實體商品退換貨政策</div>

          <div class="h3">1️⃣ 七日鑑賞期</div>
          <div class="p">
            依《消費者保護法》規定，實體商品自您收到商品次日起享有 7 日鑑賞期（含例假日）。
          </div>

          <div class="p note">📌 鑑賞期非試用期，退貨商品須符合以下條件：</div>
          <ul class="ul">
            <li>商品未使用、未組裝</li>
            <li>商品本體、配件、包裝、說明書、贈品完整</li>
            <li>無人為損壞、刮痕、缺件或明顯使用痕跡</li>
          </ul>

          <div class="h3">2️⃣ 無法受理退換貨之情形</div>
          <div class="p">以下情況恕無法辦理退換貨：</div>
          <ul class="ul">
            <li>超過 7 日鑑賞期</li>
            <li>商品已使用、組裝或人為損壞</li>
            <li>因個人因素（不符合期待、購買錯誤等）且商品非全新狀態</li>
            <li>客製化商品或已明確標示「不適用退換貨」之商品</li>
          </ul>

          <div class="h3">3️⃣ 商品瑕疵或寄送錯誤</div>
          <div class="p">
            若商品於收到時即有明顯瑕疵或寄送錯誤，請於 48 小時內 聯繫客服並提供照片，我們將協助更換或辦理全額退款。
          </div>
        </div>

        <div class="section">
          <div class="h2">三、課程／活動／體驗退費政策</div>

          <div class="h3">1️⃣ 課程開始前取消</div>
          <ul class="ul">
            <li>課程開始 7 天前（含） 取消：全額退費（扣除必要手續費）</li>
            <li>課程開始 3–6 天前 取消：退還 50% 課程費用</li>
            <li>課程開始 2 天內（含當日） 取消：恕不退費</li>
          </ul>

          <div class="h3">2️⃣ 課程當日未出席</div>
          <ul class="ul">
            <li>未事先通知且未到課，視同放棄名額，恕不退費</li>
            <li>如遇突發狀況（重大疾病、天災等不可抗力因素），可提供證明申請 延期一次或轉課一次</li>
          </ul>

          <div class="h3">3️⃣ 課程轉讓</div>
          <ul class="ul">
            <li>課程可於課前申請轉讓他人 一次</li>
            <li>請提前告知主辦單位完成資料更換</li>
            <li>課程開始後恕不接受轉讓</li>
          </ul>
        </div>

        <div class="section">
          <div class="h2">四、退款方式與作業時間</div>
          <ul class="ul">
            <li>退款將依原付款方式退回</li>
            <li>作業時間約 7–14 個工作天（不含例假日）</li>
            <li>信用卡退款實際入帳時間依發卡銀行作業為準</li>
          </ul>
        </div>

        <div class="section">
          <div class="h2">五、客服聯繫方式</div>
          <div class="p">如需申請退換貨或有任何疑問，請透過以下方式聯繫我們：</div>
          <ul class="ul">
            <li>官方社群私訊</li>
            <li>Email 或 LINE 客服（依實際公告為準）</li>
          </ul>
          <div class="p">我們將於上班時間內盡快回覆並協助處理。</div>
        </div>

        <div class="section">
          <div class="h2">六、政策修訂說明</div>
          <div class="p">
            本品牌保留隨時修改、解釋及終止本退換貨與退費政策之權利，最新內容以官方公告為準。
          </div>
        </div>
      </div>

      <div class="back-row">
        <q-btn flat class="back-btn" label="返回" @click="$router.back()" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'ReturnAndExchange',
  computed: {
    isLandscape () {
      return this.$q.screen.width > this.$q.screen.height
    }
  }
}
</script>

<style scoped>
.policy-page {
  min-height: 100vh;
  background: #f6e6e3;
  display: flex;
  justify-content: center;
}

.wrap {
  width: 100%;
  max-width: 520px;
  padding: 48px 18px 110px;
}

.page-title {
  text-align: center;
  font-size: 30px;
  letter-spacing: 2px;
  color: rgba(0, 0, 0, 0.65);
  margin: 10px 0 18px;
}

.policy-card {
  background: rgba(255, 255, 255, 0.35);
  border-radius: 18px;
  padding: 22px 18px;
}

.policy-h1 {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 12px;
  text-align: left;
}

.section {
  margin-top: 18px;
}

.h2 {
  font-size: 22px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.78);
  margin-bottom: 8px;
}

.h3 {
  font-size: 19px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.75);
  margin: 10px 0 6px;
}

.p {
  font-size: 18px;
  line-height: 1.8;
  color: rgba(0, 0, 0, 0.72);
  margin: 6px 0;
}

.note {
  font-weight: 600;
}

.ul {
  margin: 6px 0 6px 20px;
  padding: 0;
}

.ul li {
  font-size: 18px;
  line-height: 1.8;
  color: rgba(0, 0, 0, 0.72);
  margin: 4px 0;
}

.back-row {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.back-btn {
  font-size: 18px;
  text-decoration: underline;
  color: rgba(0, 0, 0, 0.65);
}

/* ===== 橫式：整體放大 + 版寬加大 ===== */
.wrap.landscape {
  max-width: 980px;
  padding: 36px 40px 80px;
}

.wrap.landscape .page-title {
  font-size: 54px;
  margin: 6px 0 18px;
}

.wrap.landscape .policy-card {
  padding: 30px 34px;
  border-radius: 22px;
}

.wrap.landscape .policy-h1 {
  font-size: 44px;
  margin-bottom: 18px;
}

.wrap.landscape .h2 {
  font-size: 36px;
  margin-bottom: 10px;
}

.wrap.landscape .h3 {
  font-size: 30px;
  margin: 14px 0 8px;
}

.wrap.landscape .p,
.wrap.landscape .ul li {
  font-size: 30px;
  line-height: 1.85;
}

.wrap.landscape .back-btn {
  font-size: 28px;
}
</style>
