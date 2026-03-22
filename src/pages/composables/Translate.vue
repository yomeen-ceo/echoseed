<template>
  <div class="q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-md">
      醫療照護語音教學系統
    </div>

    <!-- 搜尋（不影響顯示，僅過濾） -->
    <div class="row justify-end q-mb-sm">
      <div class="col-12 col-md-5">
        <q-input
          v-model="keyword"
          dense
          outlined
          clearable
          placeholder="搜尋：中文 / 英文 / 印尼文"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <!-- ✅ 跟你成功那支一樣：用 :data 不是 :rows -->
    <q-table
      v-if="displayWords && displayWords.length"
      class="shadow-3 rounded-borders medical-table"
      :data="displayWords"
      :columns="columns"
      row-key="zh"
      :pagination.sync="pagination"
      :rows-per-page-options="[10, 15, 20, 50]"
      :rows-per-page-label="'每頁筆數'"
      flat
      bordered
    >
      <!-- ✅ 跟你成功那支一樣：手動畫 body -->
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="zh" :props="props">
            <div class="text-weight-bold">{{ props.row.zh }}</div>
          </q-td>

          <q-td key="en" :props="props">
            <div class="cell-wrap">{{ props.row.en }}</div>
          </q-td>

          <q-td key="id" :props="props">
            <div class="cell-wrap">{{ props.row.id }}</div>
          </q-td>

          <q-td key="pronunciation" :props="props" class="text-center">
            <q-btn
              color="primary"
              glossy
              unelevated
              dense
              no-caps
              class="play-btn"
              :loading="playing === props.row.zh"
              @click.stop="playZh(props.row.zh)"
            >
              <q-icon name="volume_up" class="q-mr-sm" />
              {{ props.row.pronunciation }}
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- 沒資料狀態 -->
    <q-card v-else class="q-pa-md bg-white shadow-1 rounded-borders">
      <div class="text-grey-7">
        沒有資料（請確認 displayWords 是否有值）
      </div>
      <div class="text-caption text-grey-6 q-mt-sm">
        Debug：words.length={{ words.length }}，keyword="{{ keyword }}"
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'PageCareVoiceTable',

  data () {
    return {
      keyword: '',
      playing: null,
      audio: null,

      pagination: {
        sortBy: 'zh',
        descending: false,
        page: 1,
        rowsPerPage: 0 // ✅ 0 代表顯示全部
      },

      columns: [
        { name: 'zh', label: '中文', align: 'left', field: 'zh', sortable: true },
        { name: 'en', label: '英文', align: 'left', field: 'en', sortable: true },
        { name: 'id', label: '印尼文', align: 'left', field: 'id', sortable: true },
        { name: 'pronunciation', label: '中文唸法', align: 'center', field: 'pronunciation' }
      ],

      // ✅ 先放保底資料，確保一定顯示
      words: [
        { zh: '小湯匙', en: 'Small spoon', id: 'Sendok kecil', pronunciation: '小湯匙' },
        { zh: '玻璃杯', en: 'Glass cup', id: 'Gelas kaca', pronunciation: '玻璃杯' },
        { zh: '抽痰', en: 'Suctioning sputum', id: 'Penyedotan dahak', pronunciation: '抽痰' },
        { zh: '抽痰管', en: 'Suction catheter', id: 'Selang penyedot dahak', pronunciation: '抽痰管' },
        { zh: '抽痰機', en: 'Suction machine', id: 'Mesin penyedot dahak', pronunciation: '抽痰機' },
        { zh: '開', en: 'Turn on', id: 'Nyalakan', pronunciation: '開' },
        { zh: '關', en: 'Turn off', id: 'Matikan', pronunciation: '關' },
        { zh: '鼻餵管', en: 'Nasogastric tube', id: 'Selang makan melalui hidung', pronunciation: '鼻餵管' },
        { zh: '餵食器', en: 'Feeding device', id: 'Alat pemberi makan', pronunciation: '餵食器' },
        { zh: '餵食', en: 'Feed', id: 'Memberi makan', pronunciation: '餵食' },
        { zh: '針筒', en: 'Syringe', id: 'Suntikan', pronunciation: '針筒' },
        { zh: '抽食物', en: 'Draw out stomach contents to check if food is digested', id: 'Menyedot isi lambung untuk cek sisa makanan', pronunciation: '抽食物' },
        { zh: '坐起來', en: 'Sit up', id: 'Duduk tegak', pronunciation: '坐起來' },
        { zh: '往上抬', en: 'Move your body up toward the head of the bed', id: 'Geser tubuh ke arah atas (ke arah kepala tempat tidur)', pronunciation: '往上抬' },
        { zh: '抬起來', en: 'Lift first, then move left / right', id: 'Angkat dulu, lalu geser kiri / kanan', pronunciation: '抬起來' },
        { zh: '頭部升高', en: 'Press the button to raise the head of the bed', id: 'Tekan tombol untuk menaikkan kepala tempat tidur', pronunciation: '頭部升高' },
        { zh: '腳部升高', en: 'Press the button to raise the foot of the bed', id: 'Tekan tombol untuk menaikkan bagian kaki', pronunciation: '腳部升高' },
        { zh: '全部升高', en: 'Press the button to raise the entire bed', id: 'Tekan tombol untuk menaikkan seluruh tempat tidur', pronunciation: '全部升高' },
        { zh: '頭部降低', en: 'Press the button to lower the head of the bed', id: 'Tekan tombol untuk menurunkan bagian kepala', pronunciation: '頭部降低' },
        { zh: '腳部降低', en: 'Press the button to lower the foot of the bed', id: 'Tekan tombol untuk menurunkan bagian kaki', pronunciation: '腳部降低' },
        { zh: '全部降低', en: 'Press the button to lower the entire bed', id: 'Tekan tombol untuk menurunkan seluruh tempat tidur', pronunciation: '全部降低' },
        { zh: '口水棒', en: 'Yankauer', id: 'Kateter hisap mulut (tipe keras / Yankauer)', pronunciation: '口水棒' },
        { zh: '溼紙巾', en: 'Wet wipes', id: 'Tisu basah', pronunciation: '溼紙巾' },
        { zh: '衛生紙', en: 'Tissue', id: 'Tisu', pronunciation: '衛生紙' },
        { zh: '燙傷膏', en: 'Burn ointment', id: 'Salep luka bakar', pronunciation: '燙傷膏' },
        { zh: '尿套', en: 'Condom catheter', id: 'Kondom untuk urine', pronunciation: '尿套' },
        { zh: '伸直', en: 'Straighten', id: 'Luruskan', pronunciation: '伸直' },
        { zh: '翻身', en: 'Turn the body to the side', id: 'Bantu miring ke kiri / kanan', pronunciation: '翻身' },
        { zh: '翻回來', en: 'Back to the original position', id: 'Balik lagi', pronunciation: '翻回來' }
      ]
    }
  },

  computed: {
    // ✅ 過濾後仍保證是陣列
    displayWords () {
      const list = Array.isArray(this.words) ? this.words : []
      const k = String(this.keyword || '').trim().toLowerCase()
      if (!k) return list

      return list.filter(r => {
        const zh = String(r.zh || '').toLowerCase()
        const en = String(r.en || '').toLowerCase()
        const id = String(r.id || '').toLowerCase()
        return zh.includes(k) || en.includes(k) || id.includes(k)
      })
    }
  },

  beforeUnmount () {
    if (this.audio) {
      this.audio.pause()
      this.audio = null
    }
  },

  methods: {
    playZh (zh) {
      if (!zh) return

      // 停止上一段
      if (this.audio) {
        this.audio.pause()
        this.audio.currentTime = 0
      }

      // ✅ public/wav/中文.wav -> 網址 /wav/中文.wav
      // ✅ 中文檔名 encode，避免 404
      const url = `/wav/${encodeURIComponent(zh)}.wav`

      this.playing = zh
      const audio = new Audio(url)
      this.audio = audio

      audio.onended = () => {
        this.playing = null
      }

      audio.onerror = () => {
        this.playing = null
        this.$q.notify({
          color: 'negative',
          icon: 'error',
          message: `找不到音檔：${url}`
        })
      }

      audio.play().catch(() => {
        this.playing = null
        this.$q.notify({
          color: 'warning',
          icon: 'warning',
          message: '瀏覽器限制播放，請再點一次按鈕。'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rounded-borders {
  border-radius: 18px;
}

.medical-table {
  background: #fff;

  // 表頭黏住（桌機好用）
  :deep(thead tr th) {
    position: sticky;
    top: 0;
    z-index: 2;
    background: #f5f5f5;
    font-weight: 700;
  }

  // 文字自動換行
  :deep(td) {
    white-space: normal;
    word-break: break-word;
  }
}

.cell-wrap {
  line-height: 1.35;
}

.play-btn {
  min-width: 140px;
  border-radius: 12px;
}

@media (max-width: 768px) {
  .play-btn {
    width: 100%;
  }
}
</style>
