<template lang="pug">
div(:class="$style.navbar")
  .left
    | Code Review
  .right
    button(@click="$modals.show('code-review/modals/LoginModal')") Sign In
    h3 {{ $store.state.auth.user.email }}
    h3 {{ $store.state.auth.tokens.access_token }}
</template>

<style lang="stylus" module>
.navbar
  display flex
  flex-flow row wrap
  align-items center
  justify-content space-between
</style>
