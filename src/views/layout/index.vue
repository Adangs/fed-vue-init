<template>
  <section class="g-layout-all">
    <section class="g-layout-header">
      全局头部
    </section>
    <section class="g-layout-content">
      <section class="g-layout-aside">
        左侧菜单
      </section>
      <section class="g-layout-main">
        <!-- 主要内容 -->
        <transition name="fade" mode="out-in">
          <router-view :key="key" />
        </transition>
      </section>
    </section>
  </section>
</template>
<script>
export default {
  name: 'Layout',
  components: {

  },
  computed: {
    key () {
      return this.$route.fullPath
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="scss">
.g-layout-all{
  display: flex; flex-direction: column; height: 100%;
  .g-layout-header{ background: #ddd; height: 80px; line-height: 80px; text-align: center; }

  .g-layout-content{
    flex: 1; display: flex;
    .g-layout-aside{ width: 100px; background-color: #eee;}
    .g-layout-main{ flex: 1;}
  }
}

.m-content-all{
  padding: 10px; height: 100%;
  dl{ padding-bottom: 20px;}
  dt{ font-size: 14px; font-weight: bold;}
}
</style>
