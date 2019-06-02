<template lang="pug">
.page
  NavBar
  h1 App.vue
  VueModals
</template>

<script>
// import { mapActions } from 'vuex';
import NavBar from '../components/navigation/NavBar';

export default {
  components: {
    NavBar
  },
  created() {
    // this.checkAuth()
    console.log('blah')
  },
  mounted() {
    setTimeout(_ => {
      this.$store.dispatch('auth/logout')
    }, 4000)
  },
  methods: {
    // ...mapActions('auth', ['checkAuth'])
  }
}
</script>

<style lang="stylus">
// .page
  // background #000
</style>
