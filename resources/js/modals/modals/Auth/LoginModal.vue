<template lang="pug">
.modal-bg(@click.self="$emit('close-modal')")
  .modal-body
    button(@click="login({ provider: 'github' })") Login With GitHub
    button(@click="login({ provider: 'gitlab' })") Login With GitLab
    button(@click="login({ provider: 'bitbucket' })") Login With BitBucket
</template>

<script>
export default {
  data: _ => ({
    windowObjectReference: null,
    popup: {
      title: 'Authentication Login',
      features: `width=600,height=700,resizable,scrollbars,status,dependent,alwaysOnTop`
    }
  }),

  methods: {
    login({ provider }) {

      if (this.windowObjectReference === null || this.windowObjectReference.closed) {
        this.windowObjectReference = window.open(
          `http://cr.test/api/auth/redirect/${provider}`,
          this.popup.title,
          this.popup.features
        );
        this.windowObjectReference.addEventListener("message", ({ data }) => {
          this.windowObjectReference.close()
          this.windowObjectReference = null
          this.$store.dispatch('auth/setAuthTokens', data.tokens);
          this.$store.dispatch('auth/setUserDetails', data.user);
          this.$modals.hide('code-review/modals/LoginModal')
        }, false);
      } else {
        this.windowObjectReference.focus();
      }
    }
  },

  beforeDestroy() {
    if (this.windowObjectReference && !this.windowObjectReference.closed) {
      this.windowObjectReference.close()
    }
  }
}
</script>

<style lang="stylus">
.modal
  &-bg
    background rgba(0, 0, 0, 0.5)
    display flex
    flex-flow row wrap
    align-items center
    justify-content center
    position fixed
    top 0
    left 0
    right 0
    min-height 100vh

  &-body
    padding 2rem
    background #fff
</style>


