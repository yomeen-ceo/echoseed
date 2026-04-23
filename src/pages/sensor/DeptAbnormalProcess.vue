<template>
  <q-page class="bg-page page-wrap">
    <div class="page-container">

      <!-- Header -->
      <div class="system-header shadow-4">
        <div class="header-left">
          <div class="system-title">部門線上異常處理系統</div>
          <div class="system-subtitle">Motor Alarm Online Handling Dashboard</div>
        </div>

        <div class="header-right row items-center no-wrap">
          <q-chip dense square color="negative" text-color="white" icon="notifications_active">
            異常通報
          </q-chip>

          <q-chip dense square color="primary" text-color="white" icon="mail">
            訊息中心
          </q-chip>

          <q-avatar size="38px" color="white" text-color="primary" icon="person" class="q-ml-sm" />
          <div class="user-name q-ml-sm">{{ loginUser }}</div>
        </div>
      </div>

      <!-- Main content -->
      <q-card flat bordered class="main-card">

        <!-- Basic info -->
        <div class="basic-info row q-col-gutter-md">
          <div class="col-12 col-md-3">
            <div class="info-item">
              <div class="info-label">異常案件編號</div>
              <div class="info-value">{{ caseNo }}</div>
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div class="info-item">
              <div class="info-label">設備名稱</div>
              <div class="info-value">{{ deviceName }}</div>
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div class="info-item">
              <div class="info-label">異常類型</div>
              <div class="info-value">{{ abnormalType }}</div>
            </div>
          </div>

          <div class="col-12 col-md-3">
            <div class="info-item">
              <div class="info-label">異常等級</div>
              <div class="info-value">
                <q-badge :color="levelColor" class="text-weight-bold q-px-md q-py-xs">
                  {{ abnormalLevel }}
                </q-badge>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress flow -->
        <div class="section-block">
          <div class="section-title">處理流程狀態</div>

          <div class="flow-wrap gt-sm">
            <div
              v-for="(step, index) in processSteps"
              :key="'desktop-' + index"
              class="flow-step"
              :class="getStepClass(index)"
            >
              <div class="flow-step-text">{{ step.label }}</div>
            </div>
          </div>

          <div class="flow-mobile lt-md">
            <div
              v-for="(step, index) in processSteps"
              :key="'mobile-' + index"
              class="flow-mobile-item"
              :class="getStepClass(index)"
            >
              <div class="flow-mobile-index">{{ index + 1 }}</div>
              <div class="flow-mobile-text">{{ step.label }}</div>
            </div>
          </div>

          <div class="progress-summary row items-center q-col-gutter-md q-mt-md">
            <div class="col-12 col-md-4">
              <div class="summary-box">
                <div class="summary-label">目前進度</div>
                <div class="summary-value text-warning">
                  {{ currentStepLabel }}（{{ progressPercent }}%）
                </div>
              </div>
            </div>

            <div class="col-12 col-md-8">
              <q-linear-progress
                rounded
                size="18px"
                :value="progressPercent / 100"
                :color="progressColor"
                track-color="grey-4"
              />
            </div>
          </div>
        </div>

        <!-- status cards -->
        <div class="section-block">
          <div class="row q-col-gutter-md">
            <!-- Current handler -->
            <div class="col-12 col-md-4">
              <q-card flat bordered class="status-card card-fixed">
                <div class="card-title">目前處理單位</div>
                <div class="unit-name">{{ currentDept }}</div>
                <div class="unit-meta">負責人：{{ currentOwner }}</div>
                <div class="unit-meta">聯絡分機：{{ currentExt }}</div>
                <div class="unit-meta">異常時間：{{ abnormalTime }}</div>
                <div class="unit-meta">預計完成：{{ expectFinishTime }}</div>
              </q-card>
            </div>

            <!-- Processing content -->
            <div class="col-12 col-md-8">
              <q-card flat bordered class="status-card card-fixed">
                <div class="card-title">處理內容</div>

                <q-input
                  v-model="processContent"
                  type="textarea"
                  autogrow
                  filled
                  class="process-textarea"
                  :placeholder="processPlaceholder"
                />

                <div class="row q-col-gutter-sm q-mt-md">
                  <div class="col-12 col-sm-4">
                    <q-select
                      v-model="selectedStatus"
                      :options="statusOptions"
                      label="更新處理狀態"
                      filled
                      emit-value
                      map-options
                    />
                  </div>

                  <div class="col-12 col-sm-4">
                    <q-select
                      v-model="selectedNextDept"
                      :options="nextDeptOptions"
                      label="指派下一單位"
                      filled
                      emit-value
                      map-options
                    />
                  </div>

                  <div class="col-12 col-sm-4">
                    <q-input
                      v-model="notifyPerson"
                      label="通知對象"
                      filled
                    />
                  </div>
                </div>

                <div class="row justify-end q-gutter-sm q-mt-md">
                  <q-btn color="primary" unelevated icon="save" label="更新進度" />
                  <q-btn color="orange-8" unelevated icon="forward" label="移交下一步" />
                  <q-btn color="negative" unelevated icon="warning" label="升級通報" />
                </div>
              </q-card>
            </div>
          </div>
        </div>

        <!-- Previous / next -->
        <div class="section-block">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-card flat bordered class="transfer-card">
                <div class="transfer-title">上一個處理單位</div>
                <div class="transfer-name">{{ previousDept }}</div>
                <div class="transfer-meta">負責人：{{ previousOwner }}</div>
                <div class="transfer-meta">處理摘要：{{ previousSummary }}</div>
              </q-card>
            </div>

            <div class="col-12 col-md-6">
              <q-card flat bordered class="transfer-card">
                <div class="transfer-title">下一個處理單位</div>
                <div class="transfer-name">{{ nextDept }}</div>
                <div class="transfer-meta">負責人：{{ nextOwner }}</div>
                <div class="transfer-meta">待處理事項：{{ nextTodo }}</div>
              </q-card>
            </div>
          </div>
        </div>

        <!-- Extra info -->
        <div class="section-block">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-card flat bordered class="extra-card">
                <div class="card-title">即時告警摘要</div>
                <div class="extra-line">監測指標：{{ monitorItem }}</div>
                <div class="extra-line">目前數值：{{ currentValue }}</div>
                <div class="extra-line">告警門檻：{{ thresholdValue }}</div>
                <div class="extra-line">AI 判定結果：{{ aiResult }}</div>
                <div class="extra-line">建議處理：{{ aiSuggestion }}</div>
              </q-card>
            </div>

            <div class="col-12 col-md-6">
              <q-card flat bordered class="extra-card">
                <div class="card-title">緊急聯絡資訊</div>
                <div class="extra-line">值班主管：{{ emergencySupervisor }}</div>
                <div class="extra-line">維修窗口：{{ emergencyRepair }}</div>
                <div class="extra-line">安環窗口：{{ emergencySafety }}</div>
                <div class="extra-line">通知方式：{{ notifyMethod }}</div>
                <div class="extra-line">最後通報時間：{{ lastNotifyTime }}</div>
              </q-card>
            </div>
          </div>
        </div>

        <!-- History -->
        <div class="section-block">
          <div class="section-title">處理紀錄 History Log</div>

          <q-timeline color="primary" class="history-timeline">
            <q-timeline-entry
              v-for="(item, idx) in historyLogs"
              :key="idx"
              :title="item.title"
              :subtitle="item.time"
              :icon="item.icon"
              :color="item.color"
            >
              <div class="history-content">{{ item.content }}</div>
            </q-timeline-entry>
          </q-timeline>
        </div>

      </q-card>
    </div>
  </q-page>
</template>

<style scoped>
.page-wrap {
  min-height: 100vh;
  background:
    linear-gradient(180deg, #eef3f8 0%, #dde6f0 100%);
}

.page-container {
  max-width: 1480px;
  margin: 0 auto;
  padding: 18px;
}

.system-header {
  background: linear-gradient(90deg, #0b5aa6 0%, #2d7fcb 100%);
  color: #fff;
  border-radius: 18px 18px 0 0;
  padding: 18px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.system-title {
  font-size: 34px;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: 1px;
}

.system-subtitle {
  font-size: 13px;
  opacity: 0.9;
  margin-top: 4px;
}

.user-name {
  font-size: 18px;
  font-weight: 700;
}

.main-card {
  border-radius: 0 0 18px 18px;
  background: #f9fbfd;
  padding: 18px;
}

.basic-info {
  margin-bottom: 10px;
}

.info-item {
  background: #fff;
  border: 1px solid #d7e1ec;
  border-radius: 12px;
  padding: 14px 16px;
  min-height: 84px;
}

.info-label {
  font-size: 13px;
  color: #6b7a8c;
  margin-bottom: 8px;
  font-weight: 600;
}

.info-value {
  font-size: 22px;
  color: #22364d;
  font-weight: 800;
}

.section-block {
  margin-top: 18px;
  background: #fff;
  border: 1px solid #d9e3ef;
  border-radius: 14px;
  padding: 18px;
}

.section-title {
  font-size: 22px;
  font-weight: 800;
  color: #1f3d5c;
  margin-bottom: 16px;
}

.flow-wrap {
  display: flex;
  overflow: hidden;
  border-radius: 10px;
  gap: 10px;
}

.flow-step {
  flex: 1;
  min-height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  clip-path: polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%, 12% 50%);
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 1px;
}

.flow-step-text {
  transform: translateX(6px);
}

.is-done {
  background: linear-gradient(90deg, #4d89c7 0%, #3d73af 100%);
}

.is-active {
  background: linear-gradient(90deg, #f2a22c 0%, #de8500 100%);
}

.is-wait {
  background: linear-gradient(90deg, #9caaba 0%, #7f8e9f 100%);
}

.flow-mobile {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.flow-mobile-item {
  display: flex;
  align-items: center;
  min-height: 58px;
  border-radius: 12px;
  padding: 0 16px;
  color: #fff;
}

.flow-mobile-index {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  margin-right: 12px;
}

.flow-mobile-text {
  font-size: 20px;
  font-weight: 800;
}

.progress-summary {
  margin-top: 16px;
}

.summary-box {
  background: #f4f8fc;
  border-radius: 10px;
  padding: 12px 14px;
}

.summary-label {
  font-size: 13px;
  color: #718295;
  font-weight: 600;
}

.summary-value {
  font-size: 26px;
  font-weight: 800;
  margin-top: 6px;
}

.status-card,
.transfer-card,
.extra-card {
  border-radius: 14px;
  background: #fdfefe;
  padding: 18px;
}

.card-fixed {
  min-height: 100%;
}

.card-title,
.transfer-title {
  font-size: 22px;
  font-weight: 800;
  color: #203d5b;
  margin-bottom: 14px;
}

.unit-name,
.transfer-name {
  font-size: 28px;
  font-weight: 800;
  color: #22364d;
  margin-bottom: 10px;
}

.unit-meta,
.transfer-meta,
.extra-line {
  font-size: 16px;
  color: #4a5d72;
  line-height: 1.8;
}

.process-textarea /deep/ textarea {
  min-height: 160px !important;
  font-size: 16px;
  line-height: 1.7;
}

.history-timeline {
  padding-top: 4px;
}

.history-content {
  font-size: 15px;
  line-height: 1.8;
  color: #45586d;
}

.text-warning {
  color: #d88700;
}

/* tablet */
@media (max-width: 1023px) {
  .system-title {
    font-size: 28px;
  }

  .info-value {
    font-size: 19px;
  }

  .unit-name,
  .transfer-name {
    font-size: 24px;
  }

  .section-title,
  .card-title,
  .transfer-title {
    font-size: 20px;
  }
}

/* mobile / portrait */
@media (max-width: 599px) {
  .page-container {
    padding: 10px;
  }

  .system-header {
    border-radius: 14px 14px 0 0;
    padding: 14px;
  }

  .system-title {
    font-size: 22px;
  }

  .system-subtitle {
    font-size: 12px;
  }

  .user-name {
    font-size: 15px;
  }

  .main-card {
    padding: 12px;
    border-radius: 0 0 14px 14px;
  }

  .section-block {
    padding: 12px;
    margin-top: 12px;
  }

  .section-title,
  .card-title,
  .transfer-title {
    font-size: 18px;
    margin-bottom: 12px;
  }

  .info-item {
    min-height: auto;
    padding: 12px;
  }

  .info-label {
    font-size: 12px;
  }

  .info-value {
    font-size: 17px;
  }

  .summary-value {
    font-size: 22px;
  }

  .unit-name,
  .transfer-name {
    font-size: 20px;
  }

  .unit-meta,
  .transfer-meta,
  .extra-line,
  .history-content {
    font-size: 14px;
  }

  .process-textarea /deep/ textarea {
    min-height: 120px !important;
    font-size: 14px;
  }
}
</style>

<script>
export default {
  name: 'DeptAbnormalProcess',
  data () {
    return {
      loginUser: '王大明',

      caseNo: 'MA-20260410-0015',
      deviceName: '馬達輸送線 #03',
      abnormalType: '溫度異常',
      abnormalLevel: '高風險',
      levelColor: 'negative',

      abnormalTime: '2026/04/10 14:32',
      expectFinishTime: '2026/04/10 16:00',

      progressPercent: 60,
      currentStep: 2,

      processSteps: [
        { label: '通報中' },
        { label: '檢查中' },
        { label: '處理中' },
        { label: '完成' }
      ],

      currentDept: '設備維修部門',
      currentOwner: '張經理',
      currentExt: '分機 215',
      currentStepLabel: '處理中',

      processContent: '已檢查馬達軸承溫升與震動數據，初步判定可能為散熱異常與潤滑不足，已安排停機檢修並更換耗材。',
      processPlaceholder: '請輸入本次異常處理內容、檢查結果、改善措施與移交說明...',

      selectedStatus: '處理中',
      selectedNextDept: '安環部門',
      notifyPerson: '李主任',

      statusOptions: [
        { label: '通報中', value: '通報中' },
        { label: '檢查中', value: '檢查中' },
        { label: '處理中', value: '處理中' },
        { label: '完成', value: '完成' },
        { label: '待外包支援', value: '待外包支援' }
      ],

      nextDeptOptions: [
        { label: '安環部門', value: '安環部門' },
        { label: '生產部門', value: '生產部門' },
        { label: '設備維修部門', value: '設備維修部門' },
        { label: '品保部門', value: '品保部門' },
        { label: '資訊部門', value: '資訊部門' }
      ],

      previousDept: '生產部門',
      previousOwner: '陳小明',
      previousSummary: '發現馬達溫度持續高於門檻，完成初步停機與現場隔離，轉交設備維修部門處理。',

      nextDept: '安環部門',
      nextOwner: '李主任',
      nextTodo: '確認異常排除後之復機安全條件，並完成異常結案確認。',

      monitorItem: '軸承溫度 / 振動值',
      currentValue: '92°C / 13.4 mm/s',
      thresholdValue: '80°C / 10.0 mm/s',
      aiResult: '疑似散熱異常、潤滑不足',
      aiSuggestion: '建議立即停機檢查風扇、潤滑油路與軸承狀態，避免持續升溫造成停線。',

      emergencySupervisor: '吳副理 / 0912-345-678',
      emergencyRepair: '設備維修值班 / 分機 119',
      emergencySafety: '安環值班 / 分機 123',
      notifyMethod: 'LINE 群組 + Email + 系統推播',
      lastNotifyTime: '2026/04/10 14:35',

      historyLogs: [
        {
          title: '設備維修部門 - 張經理',
          time: '2026/04/10 14:50',
          content: '已到場確認馬達溫度異常，拆檢前先進行電流與振動交叉比對，安排更換散熱風扇與補充潤滑。',
          icon: 'build',
          color: 'orange'
        },
        {
          title: '生產部門 - 陳小明',
          time: '2026/04/10 14:38',
          content: '依 SOP 暫停設備運轉，完成作業員疏散與生產線切換，避免異常擴大。',
          icon: 'engineering',
          color: 'blue'
        },
        {
          title: '系統自動通報',
          time: '2026/04/10 14:32',
          content: '馬達輸送線 #03 偵測溫度與振動連續超標，系統自動建立異常案件並通知相關人員。',
          icon: 'notifications_active',
          color: 'negative'
        }
      ]
    }
  },
  computed: {
    progressColor () {
      if (this.progressPercent >= 100) return 'positive'
      if (this.progressPercent >= 60) return 'warning'
      return 'primary'
    }
  },
  methods: {
    getStepClass (index) {
      if (index < this.currentStep) {
        return 'is-done'
      } else if (index === this.currentStep) {
        return 'is-active'
      } else {
        return 'is-wait'
      }
    }
  }
}
</script>
