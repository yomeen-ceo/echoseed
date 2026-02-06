<template>
  <q-page class="home-page">
    <div class="home-wrap" :class="{ landscape: isLandscape }">

      <section class="brand">
        <div class="brand-title">ECHOSEED</div>
        <q-chip
          class="enter-chip"
          clickable
          @click="$router.push({ name: 'set' })"
        >
          進來逛逛
        </q-chip>

        <div class="brand-links">
          <a class="link" href="#" @click.prevent="$router.push('/about')">關於我們</a>
          <a class="link" href="#" @click.prevent="$router.push('/returnAndExchange')">退換貨政策</a>
          <a class="link" href="#" @click.prevent="$router.push('/termsOfServiceAndPrivacy')">服務及隱私權條款</a>
        </div>

        <div class="company">
          <q-icon name="phonelink_ring" />
          <div>聯絡窗口：0916813485</div>
        </div>

        <div class="contact">
          <q-icon name="email" />
          <a class="contact-mail" href="mailto:dingyong.nc@gmail.com">
            dingyong.nc@gmail.com
          </a>
        </div>

        <div class="company">
          <q-icon name="flag" />
          <div>統編42913083  鼎泳股份有限公司</div>
        </div>
      </section>

    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    isLandscape () {
      return this.$q.screen.width > this.$q.screen.height
    }
  }
}
</script>

<style scoped>
/* ================= 基本（直立） ================= */
.home-page {
  min-height: 100vh;
  background: #f6e6e3;
  display: flex;
  justify-content: center;
}

.home-wrap {
  width: 100%;
  max-width: 480px;
  padding: 60px 20px 120px;
  text-align: center;
}

.brand-title {
  font-size: 40px;
  margin: 28px 0 22px;
}

.brand-links {
  display: flex;
  justify-content: center;
  gap: 28px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.link {
  font-size: 22px;
  color: rgba(0,0,0,.6);
  text-decoration: none;
}

.social {
  display: flex;
  justify-content: center;
  gap: 36px;
  margin-bottom: 26px;
}

.social-btn .q-icon {
  font-size: 36px;
  color: rgba(0,0,0,.65);
}

.contact,
.company {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  margin-top: 14px;
  color: rgba(0,0,0,.6);
}

.contact .q-icon,
.company .q-icon {
  font-size: 22px;
}

/* =====================================================
   🔥 橫式（Landscape）— 字體 & Icon ×2 強化
   ===================================================== */
.home-wrap.landscape {
  max-width: 1920px;
  padding: 40px 40px 80px;
}

/* Logo */
.home-wrap.landscape .logo-mark {
  font-size: 80px;        /* 40 → 80 */
}
.home-wrap.landscape .logo-sub {
  font-size: 36px;        /* 18 → 36 */
  margin-top: 12px;
}

/* 品牌名稱 */
.home-wrap.landscape .brand-title {
  font-size: 88px;        /* 40 → 88 */
  margin: 20px 0 24px;
}

/* 導覽文字 */
.home-wrap.landscape .link {
  font-size: 44px;        /* 22 → 44 */
}
.home-wrap.landscape .brand-links {
  gap: 48px;
  margin-bottom: 36px;
}

/* 社群 icon */
.home-wrap.landscape .social {
  gap: 64px;
  margin-bottom: 28px;
}
.home-wrap.landscape .social-btn .q-icon {
  font-size: 80px;        /* 36 → 80 */
}

/* 聯絡資訊 */
.home-wrap.landscape .contact,
.home-wrap.landscape .company {
  font-size: 40px;        /* 20 → 40 */
  margin-top: 18px;
}
.home-wrap.landscape .contact .q-icon,
.home-wrap.landscape .company .q-icon {
  font-size: 40px;        /* 22 → 40 */
}
/* 進來逛逛 - 直立 */
.enter-chip {
  font-size: 28px;          /* 字體加大 */
  padding: 10px 22px;       /* chip 變厚、變寬 */
  margin-top: -28px;        /* 往上貼近 ECHOSEED */
  margin-bottom: 36px;   /* 關鍵：往下撐開距離 */
  height: auto;

  background: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.75);
  letter-spacing: 2px;
}
/* 進來逛逛 - 橫式 */
.home-wrap.landscape .enter-chip {
  font-size: 56px;          /* 大幅放大 */
  padding: 18px 44px;
  margin-top: -36px;        /* 再往上貼 */
  margin-bottom: 36px;   /* 關鍵：往下撐開距離 */

  border-radius: 999px;     /* 更像品牌 badge */
  letter-spacing: 4px;
}
</style>
