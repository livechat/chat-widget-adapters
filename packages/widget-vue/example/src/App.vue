<script lang="ts">
import { LiveChatWidget } from '@livechat/widget-vue'

export default {
  components: {
    LiveChatWidget
  }
}
</script>

<template>
  <main>
    <h1>Hello Vue!</h1>
    <LiveChatWidget license="12332502" group="0" />
  </main>
</template>

<style></style>
