<template>
  <div class="wrap">
    <img class="logo" src="/static/images/logo.png" alt />
    <div class="level">版本：1.0.5</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
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
<style scoped>
.wrap{
  text-align: center;
  position: relative;
  top: 100px;
}
.logo {
  align-items: center;
  width: 65px;
  height: 65px;
}
.level{
  line-height: 30px;
  color: #666;
}
</style>
