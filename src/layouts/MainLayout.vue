<template>
  <div>
    <q-layout view="lhh lpr lff" class=“no-pointer-events”>
      <q-header elevated class="bg-white text-grey-8">
        <img
          src="..\statics\EchoSeed_250806_Header.svg"
          alt="Header Banner"
          class="full-width"
          style="height: auto; display: block;"
        />
      </q-header>
      <q-footer>
        <img
          @click="showDialog"
          src="..\statics\EchoSeed_250806_Footer.svg"
          alt="Header Banner"
          class="full-width"
          style="height: auto; display: block;"
        />
      </q-footer>
      <q-page-container>
        <router-view />
      </q-page-container>

      <app-loging />
    </q-layout>

    <q-dialog v-model="showAns">
      <q-card class="transparent-card" style="width: 300px; max-width: 90vw;">
        <a href="https://lin.ee/u8UsGwUE" target="_blank">
          <img src="../statics/EchoSeed_250807_alert.svg" alt="Alert" style="width: 100%;" />
        </a>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped>
.coin-text {
  color: #c49949;
}
.transparent-card {
  background: transparent;
  box-shadow: none
}
</style>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      showAns: false
    }
  },
  methods: {
    showDialog () {
      this.showAns = true
    }
  }
}
</script>
