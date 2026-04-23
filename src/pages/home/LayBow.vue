<template>
  <div class="print-stage">
    <div class="paper a4">
      <!-- 頂端資訊 -->
      <div class="top-meta">
        <div class="top-meta-left">
          勞動部勞工保險局 e 化服務系統：投保單位網路申報及查詢作業
        </div>
        <div class="top-meta-right">
          第 1 頁，共 1 頁
        </div>
      </div>

      <div class="top-meta second-line">
        <div></div>
        <div class="top-meta-right">
          列印日期：民國 114 年 07 月 03 日 11 時 01 分 31 秒
        </div>
      </div>

      <!-- 主標題 -->
      <div class="page-title">
        勞保線上申辦資料查詢作業－投保單位被保險人名冊
      </div>

      <!-- 左右資訊 -->
      <div class="info-wrap">
        <div class="info-col">
          <div class="info-row">
            <span class="info-label">保險證號：</span>
            <span class="info-value">15031237F</span>
          </div>
          <div class="info-row">
            <span class="info-label">單位名稱：</span>
            <span class="info-value">有鳴股份有限公司</span>
          </div>
        </div>

        <div class="info-col right">
          <div class="info-row">
            <span class="info-label">保費年月：</span>
            <span class="info-value">114年05月</span>
          </div>
          <div class="info-row">
            <span class="info-label">經辦人：</span>
            <span class="info-value">李佳樺</span>
          </div>
        </div>
      </div>

      <!-- 報表表格 -->
      <table class="report-table">
        <colgroup>
          <col style="width: 5.8%">
          <col style="width: 10.2%">
          <col style="width: 13.2%">
          <col style="width: 8.2%">
          <col style="width: 7.8%">
          <col style="width: 7.8%">
          <col style="width: 7.1%">
          <col style="width: 8.3%">
          <col style="width: 11.2%">
          <col style="width: 7.3%">
          <col style="width: 7.3%">
          <col style="width: 6.8%">
        </colgroup>

        <thead>
          <tr>
            <th rowspan="2">序號</th>
            <th rowspan="2">姓名</th>
            <th rowspan="2">身分證號</th>
            <th rowspan="2">出生<br>日期</th>
            <th rowspan="2">勞保<br>投保<br>薪資</th>
            <th rowspan="2">災保<br>投保<br>薪資</th>
            <th rowspan="2">最近<br>異動<br>別</th>
            <th rowspan="2">最近<br>異動<br>日期</th>
            <th rowspan="2">特殊<br>身分別</th>
            <th colspan="2">保費</th>
            <th rowspan="2">墊償<br>提繳<br>薪資</th>
          </tr>
          <tr>
            <th>個人<br>負擔</th>
            <th>單位<br>負擔</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in rows" :key="row.no">
            <td :class="leftOuter(0)">{{ row.no }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.idNo }}</td>
            <td>{{ row.birth }}</td>
            <td>{{ row.laborSalary }}</td>
            <td>{{ row.disasterSalary }}</td>
            <td class="multiline">{{ row.changeType }}</td>
            <td>{{ row.changeDate }}</td>
            <td class="multiline special">{{ row.special }}</td>
            <td>{{ row.selfPay }}</td>
            <td>{{ row.companyPay }}</td>
            <td :class="rightOuter(11)">{{ row.repaySalary }}</td>
          </tr>
        </tbody>
      </table>

      <!-- 浮水印 -->
      <div class="watermark">
        <div class="wm-circle"></div>
        <div class="wm-diamond left"></div>
        <div class="wm-diamond right"></div>
        <div class="wm-ring"></div>
        <div class="wm-core"></div>
      </div>

      <!-- 右下印章 -->
      <div class="stamp">
        勞動部勞工保險局
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayBow',
  data () {
    return {
      rows: [
        {
          no: '1',
          name: '李洪德清',
          idNo: 'E123481526',
          birth: '0711221',
          laborSalary: '45,800',
          disasterSalary: '',
          changeType: '身分變\n更',
          changeDate: '1131226',
          special: '適用就業保\n險　育嬰留\n職停薪延\n續無異動',
          selfPay: '1,145',
          companyPay: '0',
          repaySalary: ''
        },
        {
          no: '2',
          name: '楊涵崴',
          idNo: 'F226374361',
          birth: '0750910',
          laborSalary: '40,100',
          disasterSalary: '40,100',
          changeType: '薪調',
          changeDate: '1140301',
          special: '適用就業保\n險　勞保一\n般無異動',
          selfPay: '1,002',
          companyPay: '3,557',
          repaySalary: ''
        },
        {
          no: '3',
          name: '曾能鴻',
          idNo: 'J122329807',
          birth: '0721201',
          laborSalary: '40,100',
          disasterSalary: '40,100',
          changeType: '加保',
          changeDate: '1110319',
          special: '適用就業保\n險　勞保一\n般無異動',
          selfPay: '1,002',
          companyPay: '3,557',
          repaySalary: ''
        },
        {
          no: '4',
          name: '林宏駿',
          idNo: 'S125288640',
          birth: '0880928',
          laborSalary: '30,300',
          disasterSalary: '30,300',
          changeType: '加保',
          changeDate: '1131022',
          special: '適用就業保\n險　勞保一\n般無異動',
          selfPay: '758',
          companyPay: '2,687',
          repaySalary: ''
        },
        {
          no: '5',
          name: '李麗芳',
          idNo: 'S222109831',
          birth: '0530429',
          laborSalary: '45,800',
          disasterSalary: '45,800',
          changeType: '加保',
          changeDate: '1130525',
          special: '適用就業保\n險　勞保一\n般無異動',
          selfPay: '1,145',
          companyPay: '4,063',
          repaySalary: ''
        }
      ]
    }
  },
  methods: {
    leftOuter () {
      return 'left-outer'
    },
    rightOuter () {
      return 'right-outer'
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'KaiUCustom';
  src: url('/statics/fonts/kaiu.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.print-stage {
  min-height: 100vh;
  background: #cfcfcf;
  padding: 24px 0;
  box-sizing: border-box;
}

.paper {
  position: relative;
  margin: 0 auto;
  background: #ffffff;
  color: #000;
  overflow: hidden;
  box-sizing: border-box;
  font-family: 'KaiUCustom', 'DFKai-SB', 'BiauKai', 'KaiTi', serif;
}

.a4 {
  width: 210mm;
  min-height: 297mm;
  padding: 10mm 10mm 12mm 10mm;
}

.top-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 4.6mm;   /* 原 5.2 → ↓ */
  line-height: 1.2;
  margin-bottom: 0.5mm;
  letter-spacing: 0.1mm;
}

.second-line {
  margin-bottom: 3mm;
}

.top-meta-left {
  white-space: nowrap;
}

.top-meta-right {
  white-space: nowrap;
}

.page-title {
  text-align: center;
  font-size: 5.2mm;
  line-height: 1.1;
  margin-bottom: 4mm;
  letter-spacing: 0.2mm;
}

.info-wrap {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.4mm;
}

.info-col {
  width: 48%;
}

.info-col.right {
  width: 38%;
}

.info-row {
  display: flex;
  align-items: baseline;
  font-size: 5.4mm;
  margin-bottom: 0.8mm;
}

/* 冒號區塊（固定寬度，讓全部對齊） */
.info-label {
  width: 28mm;              /* ⭐ 控制對齊 */
  white-space: nowrap;
}

/* 值的間距（你要的“有一點距離”） */
.info-value {
  padding-left: 2mm;        /* ⭐ 這就是你要的距離 */
  letter-spacing: 0.1mm;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  border: 0.5mm solid #222;
  position: relative;
  z-index: 2;
  background: transparent;
}

.report-table th,
.report-table td {
  text-align: center;
  vertical-align: middle;
  padding: 1mm 0.8mm;
  box-sizing: border-box;
  overflow: hidden;
}

.report-table thead th {
  border: 0.35mm solid #222;
  font-size: 6mm;
  font-weight: normal;
  line-height: 1.08;
  letter-spacing: 0.05mm;
  word-break: break-all;
}

.report-table tbody td {
  border: none;
  font-size: 5.8mm;
  line-height: 1.12;
  word-break: break-all;
}

/* tbody 只留外框 */
.report-table tbody tr:first-child td {
  border-top: 0.5mm solid #222;
}

.report-table tbody tr:last-child td {
  border-bottom: 0.5mm solid #222;
}

.report-table tbody td:first-child,
.report-table tbody td.left-outer {
  border-left: 0.5mm solid #222;
}

.report-table tbody td:last-child,
.report-table tbody td.right-outer {
  border-right: 0.5mm solid #222;
}

/* 特殊欄位 */
.multiline {
  white-space: pre-line;
  line-height: 1.05;
}

.special {
  font-size: 5.2mm !important;
  letter-spacing: 0;
}

/* 浮水印 */
.watermark {
  position: absolute;
  left: 50%;
  top: 57%;
  width: 118mm;
  height: 118mm;
  transform: translate(-50%, -50%);
  opacity: 0.16;
  z-index: 0;
  pointer-events: none;
}

.wm-circle {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at center,
      rgba(255,255,255,0) 0%,
      rgba(219, 228, 241, 0.6) 55%,
      rgba(187, 208, 231, 0.82) 100%);
}

.wm-diamond {
  position: absolute;
  width: 36mm;
  height: 36mm;
  background: rgba(235, 174, 186, 0.78);
  top: 31mm;
  transform: rotate(45deg);
}

.wm-diamond.left {
  left: 21mm;
}

.wm-diamond.right {
  right: 21mm;
}

.wm-ring {
  position: absolute;
  width: 37mm;
  height: 37mm;
  left: 50%;
  top: 28mm;
  transform: translateX(-50%);
  border: 8mm solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  box-sizing: border-box;
}

.wm-core {
  position: absolute;
  width: 24mm;
  height: 24mm;
  left: 50%;
  top: 56mm;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(255,255,255,0.95) 0%,
    rgba(237, 183, 192, 0.9) 60%,
    rgba(237, 183, 192, 0.85) 100%);
}

/* 右下印章 */
.stamp {
  position: absolute;
  right: -10mm;
  bottom: 28mm;
  transform: rotate(18deg);
  border: 0.9mm solid rgba(232, 156, 156, 0.48);
  color: rgba(232, 156, 156, 0.48);
  padding: 1.4mm 5mm;
  font-size: 8mm;
  line-height: 1;
  border-radius: 1.6mm;
  letter-spacing: 0.5mm;
  white-space: nowrap;
  z-index: 1;
}

@media screen and (max-width: 1200px) {
  .print-stage {
    overflow-x: auto;
    padding: 12px;
  }

  .paper {
    transform-origin: top center;
  }
}

@media print {
  @page {
    size: A4 portrait;
    margin: 0;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    background: #fff;
  }

  .print-stage {
    background: #fff;
    padding: 0;
    min-height: auto;
  }

  .paper {
    width: 210mm;
    min-height: 297mm;
    margin: 0;
    box-shadow: none;
  }
}
</style>
