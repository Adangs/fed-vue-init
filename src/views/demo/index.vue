<template>
  <div class="m-content-all">
    <dl>
      <dt>filters</dt>
      <dd>
        {{ date | formatDate }}
      </dd>
    </dl>
    <dl>
      <dt>全局组件</dt>
      <dd>
        <x-null />
      </dd>
    </dl>
    <dl>
      <dt>全局请求</dt>
      <dd>
        <button @click="onFetch">
          {{ loading ? '正在请求...' : '点击请求' }}
        </button>
      </dd>
    </dl>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { XNull } from '../../components'

export default {
  name: 'Demo',
  components: {
    XNull
  },
  data () {
    return {
      date: new Date()
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ])
  },
  created () {

  },
  methods: {
    async onFetch () {
      console.log('开始请求')
      const res = await this.$fetch({
        url: 'UUID'
      })
      console.log(res)
    }
  }
}
</script>
