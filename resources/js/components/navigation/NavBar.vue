<template lang="pug">
.navbar
  .left
    | Code Review
  .right
    button(@click="$modals.show('code-review/modals/LoginModal')") Sign In
    h3 {{ $store.state.auth.user.email }}
</template>
