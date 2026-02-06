<template>
  <q-page class="tos-page">
    <div class="wrap" :class="{ landscape: isLandscape }">
      <div class="page-title">服務及隱私權條款</div>

      <div class="card">
        <!-- Terms of Service -->
        <div class="h1">服務條款（Terms of Service）</div>
        <div class="p">
          歡迎使用本團隊所提供之課程、活動與相關服務。當您完成報名、參與課程或使用相關服務，即表示您已閱讀、了解並同意以下條款：
        </div>

        <div class="section">
          <div class="h2">一、服務內容</div>
          <div class="p">
            本服務包含兒童骨牌課程、成人陪跑型諮詢、體驗活動及相關延伸課程。實際課程內容、時間與形式，將依公告或報名頁面說明為準。
          </div>
        </div>

        <div class="section">
          <div class="h2">二、適用對象</div>
          <ul class="ul">
            <li>兒童課程須由家長或法定代理人完成報名與同意</li>
            <li>成人課程需由本人確認自身身心狀況適合參與</li>
          </ul>
        </div>

        <div class="section">
          <div class="h2">三、課程與活動規範</div>
          <ul class="ul">
            <li>參與者應遵守課程現場之秩序與引導</li>
            <li>如有影響他人學習或安全之行為，主辦單位有權進行適當處理</li>
            <li>課程內容屬於學習與陪伴性質，非醫療、心理治療或法律服務</li>
          </ul>
        </div>

        <div class="section">
          <div class="h2">四、退費與異動</div>
          <ul class="ul">
            <li>課程取消、延期或退費方式，將依各課程公告之退換貨政策辦理</li>
            <li>因天災或不可抗力因素，主辦單位保留調整課程之權利</li>
          </ul>
        </div>

        <div class="section">
          <div class="h2">五、智慧財產權</div>
          <div class="p">
            課程教材、教學內容、活動設計均屬本團隊所有，未經同意不得錄音、錄影、轉載或作其他商業用途。
          </div>
        </div>

        <div class="divider"></div>

        <!-- Privacy Policy -->
        <div class="h1">隱私權政策（Privacy Policy）</div>
        <div class="p">
          我們非常重視您的個人資料與隱私權，並依相關法令妥善保護您的資訊安全。
        </div>

        <div class="section">
          <div class="h2">一、蒐集的資料類型</div>
          <div class="p">依服務需要，可能蒐集以下資訊：</div>
          <ul class="ul">
            <li>姓名、聯絡方式（電話、Email、LINE）</li>
            <li>報名課程所需之基本資料（如年齡、課程需求）</li>
            <li>課程聯繫與服務紀錄</li>
          </ul>
        </div>

        <div class="section">
          <div class="h2">二、資料使用目的</div>
          <div class="p">蒐集之資料僅用於：</div>
          <ul class="ul">
            <li>課程報名與聯繫</li>
            <li>課程相關通知與服務提供</li>
            <li>內部服務品質優化</li>
          </ul>
        </div>

        <div class="section">
          <div class="h2">三、資料保護與使用原則</div>
          <ul class="ul">
            <li>個人資料僅限本團隊內部使用，不會任意提供給第三方</li>
            <li>除法律規定或主管機關要求外，不會對外揭露您的個人資訊</li>
          </ul>
        </div>

        <div class="section">
          <div class="h2">四、資料保存與刪除</div>
          <ul class="ul">
            <li>您可隨時向我們申請查詢、更正或刪除個人資料</li>
            <li>若您不再使用相關服務，我們將依合理期間保存或刪除資料</li>
          </ul>
        </div>

        <div class="section">
          <div class="h2">五、政策調整</div>
          <div class="p">
            本隱私權政策將視需要進行調整，最新版本將公告於相關平台，不另行個別通知。
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
  name: 'TermsOfServiceAndPrivacy',
  computed: {
    isLandscape () {
      return this.$q.screen.width > this.$q.screen.height
    }
  }
}
</script>

<style scoped>
.tos-page {
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

.card {
  background: rgba(255, 255, 255, 0.35);
  border-radius: 18px;
  padding: 22px 18px;
}

.h1 {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 1px;
  color: rgba(0, 0, 0, 0.8);
  margin: 6px 0 10px;
  text-align: left;
}

.section {
  margin-top: 16px;
}

.h2 {
  font-size: 22px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.78);
  margin-bottom: 8px;
}

.p {
  font-size: 18px;
  line-height: 1.85;
  color: rgba(0, 0, 0, 0.72);
  margin: 8px 0;
}

.ul {
  margin: 6px 0 6px 20px;
  padding: 0;
}

.ul li {
  font-size: 18px;
  line-height: 1.85;
  color: rgba(0, 0, 0, 0.72);
  margin: 6px 0;
}

.divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.12);
  margin: 18px 0;
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

.wrap.landscape .card {
  padding: 30px 34px;
  border-radius: 22px;
}

.wrap.landscape .h1 {
  font-size: 44px;
  margin: 6px 0 14px;
}

.wrap.landscape .h2 {
  font-size: 36px;
  margin-bottom: 10px;
}

.wrap.landscape .p,
.wrap.landscape .ul li {
  font-size: 30px;
  line-height: 1.9;
}

.wrap.landscape .divider {
  margin: 26px 0;
}

.wrap.landscape .back-btn {
  font-size: 28px;
}
</style>
