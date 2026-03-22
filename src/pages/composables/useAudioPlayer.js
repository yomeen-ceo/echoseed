import { ref } from 'vue'

const currentAudio = ref(null)
const playing = ref(null)

export function useAudioPlayer() {
  const play = (fileName) => {
    try {
      // 停止上一個
      if (currentAudio.value) {
        currentAudio.value.pause()
        currentAudio.value.currentTime = 0
      }

      const audio = new Audio(`/wav/${fileName}.wav`)

      audio.onended = () => {
        playing.value = null
      }

      audio.play()

      currentAudio.value = audio
      playing.value = fileName
    } catch (err) {
      console.error('Audio play error:', err)
    }
  }

  return {
    play,
    playing
  }
}
