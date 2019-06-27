<template>
    <div class="cc" v-show="value">
        {{message}}
      <!-- <div class="message">
      </div> -->
    </div>
</template>

<script>
export default {
  props:{
    message: '系统正忙，请稍后再试',
    value: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
    }
  },
  computed:{},
  watch:{
    value(val) {
      // console.log(1)
      this.$emit('input', val)
      if (val) {
        setTimeout(() => {
          this.value = false
        }, 3000)
      }
    }
  },
  created(){},
  mounted(){},
  methods:{}
}
</script>
<style scoped>
.cc{
  position: fixed;
  background: #666;
  padding: 0 10px;
  line-height: 30px;
  border-radius: 6px;
  color: #fff;
}

</style>
