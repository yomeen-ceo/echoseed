<template>
  <q-page class="about-page">
    <div class="wrap" :class="{ landscape: isLandscape }">
      <div class="page-title">關於我們</div>

      <div class="card">
        <div class="h1">我們的發展核心（品牌與課程理念）</div>

        <div class="p">
          我們相信，每一個人——不論是孩子或大人——都像一張尚未被推倒的骨牌。
        </div>
        <div class="p">
          不是能力不足，而是缺少一個被好好放置的位置，以及一個安全、穩定、願意陪你等的開始。
        </div>
        <div class="p">
          我們選擇「骨牌」作為核心媒介，不只是因為它是一項益智活動，而是因為它高度象徵了人生的狀態：
        </div>
        <div class="p">
          專注、耐心、秩序、挫折、重來，以及最終的連鎖成就感。
        </div>
        <div class="p">
          在這個快速、焦慮、結果導向的社會裡，孩子過早被要求表現，大人卻被默默期待自己消化所有低谷。我們所做的，不是再多給一門才藝或一套成功方法，而是創造一個允許慢下來、重新站好、被陪著走的空間。
        </div>

        <div class="section">
          <div class="h2">一、以骨牌為載體的學習，不只是玩，而是「內在能力的培養」</div>
          <div class="p">在孩子的骨牌課程中，我們關注的從來不只是「能不能排出漂亮的圖形」，而是：</div>
          <ul class="ul">
            <li>是否能在一次次倒塌中，練習面對挫折</li>
            <li>是否能為了整體，而調整自己的位置</li>
            <li>是否能在專注與合作中，建立自信與秩序感</li>
          </ul>
          <div class="p">
            骨牌是一個低門檻但高回饋的學習工具，它讓孩子在沒有比較、沒有標準答案的狀態下，慢慢培養：專注力、空間概念、耐心、情緒調節，以及與他人共創的能力。
          </div>
        </div>

        <div class="section">
          <div class="h2">二、從孩子到大人，我們做的是「陪跑」，不是指導</div>
          <div class="p">延續這個理念，我們將相同的核心價值帶入成人的諮詢與陪跑型課程。</div>
          <div class="p">我們深知，許多大人並不是不知道該怎麼做，而是：</div>
          <ul class="ul">
            <li>正在人生低谷，卻沒有人願意陪他走一段</li>
            <li>有責任、有家庭、有壓力，但失去了重新整理自己的空間</li>
          </ul>
          <div class="p">
            因此，我們的成人課程不是「告訴你該怎麼成功」，而是像排骨牌一樣，陪你一塊一塊釐清現況、調整節奏、找回可以前進的順序。
          </div>
          <div class="p">
            有些人需要的是方向，有些人需要的是被理解，而更多時候，需要的是有人不急著推倒你，而是等你站穩。
          </div>
        </div>

        <div class="section">
          <div class="h2">三、我們在做的，是一個跨年齡、跨階段的成長系統</div>

          <div class="p">孩子在這裡學會的是：</div>
          <div class="quote">「我可以慢慢來，我願意再試一次。」</div>

          <div class="p">大人在這裡重新找回的是：</div>
          <div class="quote">「即使現在亂了，也還能重新排。」</div>

          <div class="p">
            我們不急著擴張，不追求大量複製，而是希望把每一堂課、每一次陪伴，都當成一條能夠真正產生連鎖正向影響的骨牌。
          </div>
          <div class="p">
            當一個孩子被穩穩接住，當一個大人重新站好，
          </div>
          <div class="p">
            那一聲倒下的聲音，會繼續往前，影響家庭、影響關係、影響下一代。
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
  name: 'About',
  computed: {
    isLandscape () {
      return this.$q.screen.width > this.$q.screen.height
    }
  }
}
</script>

<style scoped>
.about-page {
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

.p {
  font-size: 18px;
  line-height: 1.85;
  color: rgba(0, 0, 0, 0.72);
  margin: 8px 0;
}

.ul {
  margin: 6px 0 10px 20px;
  padding: 0;
}

.ul li {
  font-size: 18px;
  line-height: 1.85;
  color: rgba(0, 0, 0, 0.72);
  margin: 6px 0;
}

.quote {
  font-size: 18px;
  line-height: 1.85;
  color: rgba(0, 0, 0, 0.75);
  font-weight: 700;
  padding: 10px 14px;
  margin: 8px 0 12px;
  border-left: 4px solid rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 0.25);
  border-radius: 10px;
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
  margin-bottom: 18px;
}

.wrap.landscape .h2 {
  font-size: 36px;
  margin-bottom: 10px;
}

.wrap.landscape .p,
.wrap.landscape .ul li,
.wrap.landscape .quote {
  font-size: 30px;
  line-height: 1.9;
}

.wrap.landscape .quote {
  padding: 16px 18px;
  border-left-width: 6px;
}

.wrap.landscape .back-btn {
  font-size: 28px;
}
</style>
