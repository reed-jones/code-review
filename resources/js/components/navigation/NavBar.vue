<template lang="pug">
div(:class="$style.navbar")
  div(:class="$style.left")
    | Code Review
  div(:class="$style.right")
    button(@click="$modals.show('code-review/modals/LoginModal')") Sign In
    h3 {{ $store.state.auth.user.email }}
    h3 {{ $store.state.auth.tokens.access_token }}
</template>

<style lang="stylus" module>
.navbar
  flex(row wrap, center, space-between)
  background rgba(grey, 0.25)

.left,
.right
  flex(row wrap, center, center)
  margin 1rem

</style>
