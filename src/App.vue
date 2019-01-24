<template>
  <div>
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/Navbar'

export default {
  components: {
    NavBar
  },
  mounted() {
    window.document.title = this.$t('message.title');
  }
};
</script>
