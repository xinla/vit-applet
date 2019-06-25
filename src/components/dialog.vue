<template>
  <div class="mask" v-if="isMask">
    <div class="cc">
      <div class="title">提示</div>
      <div class="message">
        请先阅读并同意
        <br>《融资居间服务委托授权书》
      </div>
      <div class="ok yellow" @click="isMask = false">好的</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title: ""
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
</style>
