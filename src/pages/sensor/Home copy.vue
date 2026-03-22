<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 500px;">

      <q-input v-model="officeGroup" label="OFFICE_GROUP" outlined />
      <q-input v-model="id" label="ID" outlined />
      <q-input v-model.number="big" label="BIG" type="number" outlined />

      <q-btn
        color="primary"
        label="取得資料"
        @click="getData"
        :loading="loading"
      />

      <q-banner v-if="error" class="bg-red text-white q-mt-md">
        {{ error }}
      </q-banner>

      <pre v-if="result" class="q-mt-md">
        {{ result }}
      </pre>

    </div>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GetXYZPage',

  data () {
    return {
      officeGroup: '0001',
      id: '8007',
      big: '1',
      result: null,
      error: '',
      loading: false
    }
  },

  methods: {
    async getData () {
      this.loading = true
      this.error = ''
      this.result = null

      try {
        const res = await axios.post('http://localhost:5000/v1/sensor', {
          OFFICE_GROUP: this.officeGroup,
          BIG: this.big,
          test: 'test'
        })

        this.result = res.data
      } catch (err) {
        console.log('=======', err)
        this.error = err.message || '請求失敗'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
