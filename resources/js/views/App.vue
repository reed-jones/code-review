<template lang="pug">
.page
  NavBar
  h1 App.vue
  VueModals
</template>

<script>
import NavBar from '../components/navigation/NavBar';

export default {
  components: {
    NavBar
  },
}
</script>

<style lang="stylus">
html,
body
  margin 0
  font-size 16px
</style>
