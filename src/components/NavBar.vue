<template>
  <div>
    <b-navbar toggleable type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"/>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item
            :class="{active : activeName === 'master'}"
            @click="active('master')"
            href="#/master"
          >{{ $t("message.navbar.master") }}</b-nav-item>
          <b-nav-item
            :class="{active : activeName === 'agent'}"
            @click="active('agent')"
            href="#/agent"
          >{{ $t("message.navbar.agent") }}</b-nav-item>
          <b-nav-item
            :class="{active : activeName === 'program'}"
            @click="active('program')"
            href="#/program"
          >{{ $t("message.navbar.program") }}</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="$t('message.navbar.language')" right>
            <b-dropdown-item @click="changeLocale('zh_CN')">{{ $t('message.lang.cn') }}</b-dropdown-item>
            <b-dropdown-item @click="changeLocale('en_US')">{{ $t('message.lang.us') }}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: this.$route.path.replace("/", "")
    };
  },
  methods: {
    active(name) {
      this.activeName = name;
    },
    changeLocale(locale) {
      this.$i18n.locale = locale;
      window.document.title = this.$t('message.title');
    }
  }
};
</script>
