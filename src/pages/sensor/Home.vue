<template>
  <q-page class="dashboard-page q-pa-md">
    <div class="dashboard-wrap">

      <!-- Header -->
      <div class="top-bar">
        <div class="page-title">馬達監控儀表板</div>
        <div class="update-time">
          資料更新時間：{{ displayDateTime }}
        </div>
      </div>

      <div class="main-grid">
        <!-- Left -->
        <div class="left-panel">
          <!-- Trend -->
          <div class="card large-card">
            <div class="card-title">振動趨勢</div>

            <div class="chart-wrap">
              <svg viewBox="0 0 1000 300" class="trend-svg" preserveAspectRatio="none">
                <!-- background zones -->
                <rect x="0" y="0" width="1000" height="100" fill="rgba(255, 82, 82, 0.18)" />
                <rect x="0" y="100" width="1000" height="100" fill="rgba(255, 193, 7, 0.16)" />
                <rect x="0" y="200" width="1000" height="100" fill="rgba(76, 175, 80, 0.16)" />

                <!-- grid -->
                <g stroke="rgba(255,255,255,0.08)" stroke-width="1">
                  <line v-for="n in 10" :key="'h'+n" x1="0" :y1="n*30" x2="1000" :y2="n*30" />
                  <line v-for="n in 20" :key="'v'+n" :x1="n*50" y1="0" :x2="n*50" y2="300" />
                </g>

                <!-- line -->
                <polyline
                  :points="trendPoints"
                  fill="none"
                  stroke="#ffd54f"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <!-- area -->
                <polygon
                  :points="trendAreaPoints"
                  fill="rgba(255, 213, 79, 0.12)"
                />

                <!-- last dot -->
                <circle
                  v-if="trendLastPoint"
                  :cx="trendLastPoint.x"
                  :cy="trendLastPoint.y"
                  r="8"
                  fill="#ffd54f"
                />

                <!-- threshold lines -->
                <line x1="0" y1="100" x2="1000" y2="100" stroke="rgba(255,255,255,0.22)" stroke-dasharray="8,6" />
                <line x1="0" y1="200" x2="1000" y2="200" stroke="rgba(255,255,255,0.22)" stroke-dasharray="8,6" />
              </svg>
            </div>

            <div class="summary-row">
              <div class="summary-item">
                <span class="label">平均</span>
                <span class="value">{{ bigDataAvg }}</span>
              </div>
              <div class="summary-item">
                <span class="label">最高</span>
                <span class="value">{{ bigDataMax }}</span>
              </div>
              <div class="summary-item">
                <span class="label">最低</span>
                <span class="value">{{ bigDataMin }}</span>
              </div>
              <div class="summary-item level-legend">
                <span>綠色區：0-40</span>
                <span>黃色區：40-70</span>
                <span>紅色區：71-100</span>
              </div>
            </div>
          </div>

          <!-- Middle row -->
          <div class="info-row">
            <!-- Axis bars -->
            <div class="card half-card">
              <div class="card-title">三軸數值</div>

              <div class="bar-chart">
                <div class="bar-item" v-for="item in axisBars" :key="item.key">
                  <div class="bar-label">{{ item.label }}</div>
                  <div class="bar-outer">
                    <div class="bar-inner" :style="{ width: item.percent + '%' }"></div>
                  </div>
                  <div class="bar-value">{{ item.value }}</div>
                </div>
              </div>

              <div class="bottom-stats three-cols">
                <div class="stat-box">
                  <div class="small-label">X 軸</div>
                  <div class="small-value">{{ formatNum(result.x_axis) }}</div>
                </div>
                <div class="stat-box">
                  <div class="small-label">Y 軸</div>
                  <div class="small-value">{{ formatNum(result.y_axis) }}</div>
                </div>
                <div class="stat-box">
                  <div class="small-label">Z 軸</div>
                  <div class="small-value">{{ formatNum(result.z_axis) }}</div>
                </div>
              </div>
            </div>

            <!-- status chart -->
            <div class="card half-card">
              <div class="card-title">即時狀態</div>

              <div class="mini-chart-wrap">
                <svg viewBox="0 0 1000 260" class="trend-svg" preserveAspectRatio="none">
                  <rect x="0" y="0" width="1000" height="260" fill="rgba(255,255,255,0.03)" />

                  <g stroke="rgba(255,255,255,0.08)" stroke-width="1">
                    <line v-for="n in 8" :key="'mh'+n" x1="0" :y1="n*32" x2="1000" :y2="n*32" />
                    <line v-for="n in 20" :key="'mv'+n" :x1="n*50" y1="0" :x2="n*50" y2="260" />
                  </g>

                  <polyline
                    :points="statusPoints"
                    fill="none"
                    stroke="#ff6e6e"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <polygon
                    :points="statusAreaPoints"
                    fill="rgba(255, 110, 110, 0.18)"
                  />
                </svg>
              </div>

              <div class="bottom-stats three-cols">
                <div class="stat-box">
                  <div class="small-label">模式</div>
                  <div class="small-value">{{ result.axis_mode || '-' }}</div>
                </div>
                <div class="stat-box">
                  <div class="small-label">狀態</div>
                  <div class="small-value">{{ result.status || '-' }}</div>
                </div>
                <div class="stat-box">
                  <div class="small-label">警報次數</div>
                  <div class="small-value">{{ result.count || 0 }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom -->
          <div class="bottom-row">
            <div class="small-metric-card">
              <div class="metric-title">溫度</div>
              <div class="metric-value">{{ formatNum(result.temper) }}°C</div>
            </div>

            <div class="small-metric-card">
              <div class="metric-title">振動寬度</div>
              <div class="metric-value">{{ formatNum(result.width) }}</div>
            </div>

            <div class="small-metric-card">
              <div class="metric-title">平均值</div>
              <div class="metric-value">{{ formatNum(result.avg) }}</div>
            </div>

            <div class="small-metric-card">
              <div class="metric-title">採樣數</div>
              <div class="metric-value">{{ result.collect_pcs || 0 }}</div>
            </div>
          </div>
        </div>

        <!-- Right -->
        <div class="right-panel">
          <!-- Score -->
          <div class="score-card" :class="levelClass">
            <div class="score-title">監控指數</div>
            <div class="score-number">{{ healthScore }}</div>
            <div class="score-tag">{{ levelText }}</div>
          </div>

          <!-- device info -->
          <div class="card side-card">
            <div class="alert-title">
              <q-icon name="warning" class="q-mr-sm" />
              裝置資訊
            </div>

            <div class="side-stats">
              <div class="side-stat">
                <div class="side-label">設備編號</div>
                <div class="side-value">{{ result.ID || '-' }}</div>
              </div>
              <div class="side-stat">
                <div class="side-label">群組</div>
                <div class="side-value">{{ result.OFFICE_GROUP || '-' }}</div>
              </div>
              <div class="side-stat">
                <div class="side-label">名稱</div>
                <div class="side-value">{{ result.name_er || '-' }}</div>
              </div>
              <div class="side-stat">
                <div class="side-label">更新</div>
                <div class="side-value">{{ result.UP_DATETIME || '-' }}</div>
              </div>
            </div>
          </div>

          <!-- warnings -->
          <div class="card side-card">
            <div class="card-title">狀態警示</div>

            <div class="warning-list">
              <div class="warning-item danger" v-if="isTempHigh">
                <div class="warning-left">
                  <q-icon name="whatshot" />
                  <div>
                    <div class="warning-name">溫度過高</div>
                    <div class="warning-sub">目前 {{ formatNum(result.temper) }}°C</div>
                  </div>
                </div>
                <div class="warning-right">{{ result.temp_max }}°C</div>
              </div>

              <div class="warning-item warning" v-if="isVibrationHigh">
                <div class="warning-left">
                  <q-icon name="graphic_eq" />
                  <div>
                    <div class="warning-name">振動異常</div>
                    <div class="warning-sub">寬度 {{ formatNum(result.width) }}</div>
                  </div>
                </div>
                <div class="warning-right">{{ result.vibration_max }}</div>
              </div>

              <div class="warning-item warning" v-if="isAxisAbnormal">
                <div class="warning-left">
                  <q-icon name="timeline" />
                  <div>
                    <div class="warning-name">軸向偏移</div>
                    <div class="warning-sub">主監測 {{ result.axis_mode }}</div>
                  </div>
                </div>
                <div class="warning-right">{{ activeAxisValue }}</div>
              </div>

              <div class="warning-item normal" v-if="!isTempHigh && !isVibrationHigh && !isAxisAbnormal">
                <div class="warning-left">
                  <q-icon name="check_circle" />
                  <div>
                    <div class="warning-name">設備正常</div>
                    <div class="warning-sub">目前無異常警示</div>
                  </div>
                </div>
                <div class="warning-right">OK</div>
              </div>
            </div>
          </div>

          <!-- threshold panel -->
          <div class="card side-card">
            <div class="card-title">門檻資訊</div>

            <div class="threshold-grid">
              <div class="threshold-box">
                <div class="threshold-label">溫度下限</div>
                <div class="threshold-value">{{ result.temp_min }}</div>
              </div>
              <div class="threshold-box">
                <div class="threshold-label">溫度上限</div>
                <div class="threshold-value">{{ result.temp_max }}</div>
              </div>
              <div class="threshold-box">
                <div class="threshold-label">振動下限</div>
                <div class="threshold-value">{{ result.vibration_min }}</div>
              </div>
              <div class="threshold-box">
                <div class="threshold-label">振動上限</div>
                <div class="threshold-value">{{ result.vibration_max }}</div>
              </div>
              <div class="threshold-box">
                <div class="threshold-label">Baseline Z</div>
                <div class="threshold-value">{{ formatNum(result.baselineZ) }}</div>
              </div>
              <div class="threshold-box">
                <div class="threshold-label">Alarm PCS</div>
                <div class="threshold-value">{{ result.alarm_pcs || 0 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </q-page>
</template>

<style scoped>
.dashboard-page {
  background: radial-gradient(circle at top, #25314e 0%, #111827 45%, #0a0f1c 100%);
  min-height: 100vh;
  color: #fff;
}

.dashboard-wrap {
  max-width: 2000px;
  margin: 0 auto;
  transform: scale(0.8);          /* ⭐ 縮小 20% */
  transform-origin: top center;   /* ⭐ 從上方縮 */
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 2px;
}

.update-time {
  font-size: 20px;
  color: rgba(255,255,255,0.85);
}

.main-grid {
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  grid-gap: 18px;
}

.left-panel,
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.card,
.score-card,
.small-metric-card {
  background: rgba(18, 26, 43, 0.9);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
}

.card {
  padding: 18px;
}

.card-title,
.score-title {
  font-size: 18px;
  font-weight: 600;
  color: rgba(255,255,255,0.92);
  margin-bottom: 14px;
}

.large-card {
  min-height: 460px;
}

.chart-wrap {
  height: 300px;
  border-radius: 14px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
}

.trend-svg {
  width: 100%;
  height: 100%;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.summary-item {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 18px;
}

.summary-item .label {
  color: rgba(255,255,255,0.65);
}

.summary-item .value {
  font-size: 34px;
  font-weight: 700;
  color: #fff;
}

.level-legend {
  font-size: 14px;
  color: rgba(255,255,255,0.72);
  gap: 16px;
}

.info-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.half-card {
  min-height: 320px;
}

.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-top: 12px;
}

.bar-item {
  display: grid;
  grid-template-columns: 60px 1fr 70px;
  gap: 12px;
  align-items: center;
}

.bar-label {
  color: rgba(255,255,255,0.8);
}

.bar-outer {
  height: 18px;
  border-radius: 999px;
  background: rgba(255,255,255,0.08);
  overflow: hidden;
}

.bar-inner {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #ffb300, #ff7043);
}

.bar-value {
  text-align: right;
  font-weight: 700;
  color: #ffd54f;
}

.mini-chart-wrap {
  height: 220px;
  border-radius: 14px;
  overflow: hidden;
}

.bottom-stats {
  margin-top: 16px;
}

.three-cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.stat-box {
  background: rgba(255,255,255,0.04);
  border-radius: 12px;
  padding: 12px;
}

.small-label {
  font-size: 13px;
  color: rgba(255,255,255,0.65);
  margin-bottom: 6px;
}

.small-value {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

.bottom-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.small-metric-card {
  padding: 18px;
}

.metric-title {
  font-size: 16px;
  color: rgba(255,255,255,0.7);
  margin-bottom: 12px;
}

.metric-value {
  font-size: 36px;
  font-weight: 700;
}

.score-card {
  padding: 24px;
  text-align: center;
}

.score-card.normal {
  background: linear-gradient(135deg, #1b5e20, #2e7d32);
}

.score-card.warning {
  background: linear-gradient(135deg, #ef6c00, #f9a825);
}

.score-card.danger {
  background: linear-gradient(135deg, #c62828, #ef5350);
}

.score-number {
  font-size: 86px;
  font-weight: 800;
  line-height: 1;
  margin: 10px 0 14px;
}

.score-tag {
  display: inline-block;
  padding: 8px 18px;
  border-radius: 999px;
  background: rgba(255,255,255,0.2);
  font-size: 20px;
  font-weight: 700;
}

.side-card {
  min-height: 180px;
}

.alert-title {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  color: #ffd54f;
  margin-bottom: 14px;
}

.side-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.side-stat {
  background: rgba(255,255,255,0.04);
  border-radius: 12px;
  padding: 12px;
}

.side-label {
  font-size: 13px;
  color: rgba(255,255,255,0.65);
}

.side-value {
  font-size: 20px;
  font-weight: 700;
  margin-top: 4px;
}

.warning-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.warning-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 14px;
  padding: 14px 16px;
  color: #111;
  font-weight: 700;
}

.warning-item.danger {
  background: linear-gradient(90deg, #ff5f5f, #ff8a80);
}

.warning-item.warning {
  background: linear-gradient(90deg, #ffd54f, #ffecb3);
}

.warning-item.normal {
  background: linear-gradient(90deg, #cfd8dc, #eceff1);
}

.warning-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.warning-name {
  font-size: 18px;
}

.warning-sub {
  font-size: 13px;
  font-weight: 600;
  opacity: 0.85;
}

.warning-right {
  font-size: 24px;
}

.threshold-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.threshold-box {
  background: rgba(255,255,255,0.04);
  border-radius: 12px;
  padding: 14px;
}

.threshold-label {
  font-size: 13px;
  color: rgba(255,255,255,0.65);
  margin-bottom: 6px;
}

.threshold-value {
  font-size: 24px;
  font-weight: 700;
}

@media (max-width: 1200px) {
  .main-grid {
    grid-template-columns: 1fr;
  }

  .bottom-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .top-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .page-title {
    font-size: 28px;
  }

  .update-time {
    font-size: 16px;
  }

  .info-row,
  .three-cols,
  .side-stats,
  .threshold-grid,
  .bottom-row {
    grid-template-columns: 1fr;
  }

  .score-number {
    font-size: 62px;
  }
}
</style>

<script>

export default {
  name: 'MotorDashboard',
  data () {
    return {
      timer: null,
      historyData: [],
      result: {
        ok: true,
        ID: '8007',
        OFFICE_GROUP: '0001',
        name_er: '振動測試',
        now_temp: 0,
        status: 'stop',
        temper: 30.48,
        temp_min: 30,
        temp_max: 50,
        width: 0.26,
        vibration_min: 1,
        vibration_max: 2,
        x_axis: 0.39,
        y_axis: 9.58,
        z_axis: 2.89,
        axis_mode: 'z_axis',
        baselineZ: 16.67,
        maxA: 16.85,
        minA: 16.58,
        avg: 16.72,
        collect_pcs: 100,
        sum: 334,
        count: 6,
        alarm_pcs: 0,
        DATETIME: '2026-03-01 21:03:04',
        UP_DATETIME: '2026-03-01 21:03:04',
        axis: '0.39,9.58,2.89',
        big_data: '0.10,0.06,0.15,0.18,0.18,0.15,0.07,0.09,0.05,0.05,0.03,0.13,0.07,0.10,0.15,0.14,0.07,0.02,0.07,0.07,0.06,0.01,0.04,0.10,0.04,0.07,0.00,0.02,0.05,0.07,0.08,0.14,0.03,0.12,0.07,0.08,0.02,0.00,0.02,0.01,0.07,0.03,0.04,0.00,0.00,0.01,0.01,0.00,0.02,0.05,0.09,0.05,0.03,0.03,0.07,0.10,0.16,0.13,0.03,0.02,0.01,0.06,0.07,0.03,0.01,0.06,0.03,0.01,0.00,0.00,0.04,0.01,0.01,0.04,0.08,0.07,0.10,0.05,0.05,0.03,0.03,0.05,0.03,0.08,0.07,0.02,0.08,0.00,0.05,0.09,0.13,0.07,0.05,0.10,0.13,0.02,0.04,0.08,0.14,0.11'
      }
    }
  },
  computed: {
    displayDateTime () {
      return this.result.UP_DATETIME || this.result.DATETIME || '-'
    },
    bigDataArray () {
      if (!this.result.big_data) return []
      return this.result.big_data.split(',').map(v => Number(v) || 0)
    },
    scaledBigData () {
      const arr = this.bigDataArray
      if (!arr.length) return []
      const max = Math.max.apply(null, arr) || 1
      return arr.map(v => (v / max) * 100)
    },
    bigDataAvg () {
      if (!this.bigDataArray.length) return '0.00'
      const sum = this.bigDataArray.reduce((a, b) => a + b, 0)
      return (sum / this.bigDataArray.length).toFixed(2)
    },
    bigDataMax () {
      if (!this.bigDataArray.length) return '0.00'
      return Math.max.apply(null, this.bigDataArray).toFixed(2)
    },
    bigDataMin () {
      if (!this.bigDataArray.length) return '0.00'
      return Math.min.apply(null, this.bigDataArray).toFixed(2)
    },
    trendPoints () {
      return this.makePolylinePoints(this.scaledBigData, 1000, 300)
    },
    trendAreaPoints () {
      return this.makeAreaPoints(this.scaledBigData, 1000, 300)
    },
    trendLastPoint () {
      const arr = this.scaledBigData
      if (!arr.length) return null
      const x = ((arr.length - 1) / (arr.length - 1 || 1)) * 1000
      const y = 300 - (arr[arr.length - 1] / 100) * 300
      return { x, y }
    },
    statusSeries () {
      const h = this.historyData.length ? this.historyData : this.scaledBigData.slice(-30)
      if (!h.length) return []

      const avg = h.reduce((a, b) => a + b, 0) / h.length
      const AMPLIFY = 0.5 // ⭐ 這就是你要的 20 倍

      return h.map(v => {
        const amplified = avg + (v - avg) * AMPLIFY

        // ⭐ 防止爆掉（很重要）
        return Math.max(0, Math.min(100, amplified))
      })
    },
    statusPoints () {
      // return this.makePolylinePoints(this.statusSeries, 1000, 260)
      return this.makeDynamicPolylinePoints(this.statusSeries, 1000, 260)
    },
    statusAreaPoints () {
      // return this.makeAreaPoints(this.statusSeries, 1000, 260)
      return this.makeDynamicAreaPoints(this.statusSeries, 1000, 260)
    },
    healthScore () {
      const tempRatio = this.result.temp_max ? (this.result.temper / this.result.temp_max) * 100 : 0
      const vibRatio = this.result.vibration_max ? (this.result.width / this.result.vibration_max) * 100 : 0
      const axisRatio = this.result.baselineZ ? (Math.abs(this.activeAxisNumeric) / this.result.baselineZ) * 100 : 0

      const score = (tempRatio * 0.35) + (vibRatio * 0.35) + (axisRatio * 0.30)
      return Math.max(0, Math.min(100, score)).toFixed(1)
    },
    levelText () {
      const v = Number(this.healthScore)
      if (v >= 71) return '危險'
      if (v >= 40) return '注意'
      return '正常'
    },
    levelClass () {
      const v = Number(this.healthScore)
      if (v >= 71) return 'danger'
      if (v >= 40) return 'warning'
      return 'normal'
    },
    isTempHigh () {
      return Number(this.result.temper) >= Number(this.result.temp_max)
    },
    isVibrationHigh () {
      return Number(this.result.width) >= Number(this.result.vibration_max)
    },
    activeAxisNumeric () {
      const mode = this.result.axis_mode
      if (mode === 'x_axis') return Number(this.result.x_axis) || 0
      if (mode === 'y_axis') return Number(this.result.y_axis) || 0
      return Number(this.result.z_axis) || 0
    },
    activeAxisValue () {
      return this.formatNum(this.activeAxisNumeric)
    },
    isAxisAbnormal () {
      if (!this.result.baselineZ) return false
      return Math.abs(this.activeAxisNumeric) > (Number(this.result.baselineZ) * 0.8)
    },
    axisBars () {
      const values = [
        { key: 'x', label: 'X 軸', value: Number(this.result.x_axis) || 0 },
        { key: 'y', label: 'Y 軸', value: Number(this.result.y_axis) || 0 },
        { key: 'z', label: 'Z 軸', value: Number(this.result.z_axis) || 0 }
      ]
      const max = Math.max(...values.map(v => v.value), 1)
      return values.map(v => ({
        ...v,
        percent: ((v.value / max) * 100).toFixed(2)
      }))
    }
  },
  mounted () {
    this.initHistory()
    this.startPolling()
  },
  beforeDestroy () {
    if (this.timer) clearInterval(this.timer)
  },
  methods: {
    makeDynamicPolylinePoints (arr, width, height) {
      if (!arr.length) return ''

      const min = Math.min(...arr)
      const max = Math.max(...arr)
      const range = Math.max(max - min, 1)

      return arr.map((v, i) => {
        const x = (i / (arr.length - 1 || 1)) * width
        const y = height - ((v - min) / range) * height
        return `${x},${y}`
      }).join(' ')
    },
    makeDynamicAreaPoints (arr, width, height) {
      if (!arr.length) return ''
      const line = this.makeDynamicPolylinePoints(arr, width, height)
      return `0,${height} ${line} ${width},${height}`
    },
    formatNum (v) {
      const n = Number(v)
      if (isNaN(n)) return '-'
      return n.toFixed(2)
    },
    makePolylinePoints (arr, width, height) {
      if (!arr.length) return ''
      return arr.map((v, i) => {
        const x = (i / (arr.length - 1 || 1)) * width
        const y = height - (v / 100) * height
        return `${x},${y}`
      }).join(' ')
    },
    makeAreaPoints (arr, width, height) {
      if (!arr.length) return ''
      const line = this.makePolylinePoints(arr, width, height)
      const firstX = 0
      const lastX = width
      return `${firstX},${height} ${line} ${lastX},${height}`
    },
    initHistory () {
      this.historyData = this.scaledBigData.slice(-30)
    },
    pushHistoryPoint () {
      const point = Number(this.healthScore)
      this.historyData.push(point)
      if (this.historyData.length > 30) {
        this.historyData.shift()
      }
    },
    startPolling () {
      // 先推一次目前資料
      this.pushHistoryPoint()

      this.timer = setInterval(() => {
        this.fetchData()
      }, 1000)
    },
    async fetchData () {
      try {
        // 請改成你的實際 API
        // const res = await this.axios.post('http://localhost:5000/v1/sensor', {
        //   OFFICE_GROUP: '0001',
        //   BIG: 1,
        //   ID: 8001
        // })
        const res = await this.axios.post('https://sensor-api-uki7.onrender.com/v1/sensor', {
          OFFICE_GROUP: '0001',
          BIG: 1,
          ID: 8001
        })
        this.result = res.data
        // demo：這裡先用本地模擬數值微幅波動
        const clone = JSON.parse(JSON.stringify(this.result))
        clone.temper = Number((clone.temper + (Math.random() - 0.5) * 1.2).toFixed(2))
        clone.width = Number(Math.max(0, clone.width + (Math.random() - 0.5) * 0.12).toFixed(2))
        clone.x_axis = Number(Math.max(0, clone.x_axis + (Math.random() - 0.5) * 0.4).toFixed(2))
        clone.y_axis = Number(Math.max(0, clone.y_axis + (Math.random() - 0.5) * 0.6).toFixed(2))
        clone.z_axis = Number(Math.max(0, clone.z_axis + (Math.random() - 0.5) * 0.5).toFixed(2))
        clone.UP_DATETIME = this.formatNow()
        this.result = clone

        // 真實串接時改成這樣：
        // if (data && data.ok) {
        //   this.result = data
        // }

        this.pushHistoryPoint()
      } catch (err) {
        console.error('fetchData error:', err)
      }
    },
    formatNow () {
      const d = new Date()
      const pad = n => (n < 10 ? '0' + n : '' + n)
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
    }
  }
}
</script>
