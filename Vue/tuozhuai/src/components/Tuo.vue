<template>
  <div>
    <div :style="setLeftStyle()" class="view"></div>
    <div id="line" class="line"></div>
    <div :style="setRightStyle()" class="view"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      width: 400,     //默认右边div的宽度
      lastClientX: 0,  //记录最后一次拖动的横向位置
    }
  }
  ,
  mounted() {
    const _this = this;
    this.$nextTick(() => {
      const moveDom = document.getElementById('line');   //拖动元素
      moveDom.onmousedown = function (e) {
        _this.clientStartX = e.clientX;
        document.onmousemove = function (e) {
          _this.moveHandle(e.clientX);
          return false
        };

        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
          _this.lastClientX = 0;       //清零
        };
        return false
      }
    })
  },
  methods: {
    moveHandle(nowClient) {
      if (this.lastClientX === 0) {
        // 第一次拖动 记录起始位置
        this.lastClientX = nowClient;
      } else {
        // 计算拖动的距离 赋值给右边div
        this.width += (this.lastClientX - nowClient);
        // 记录最后一个的拖动位置
        this.lastClientX = nowClient;
      }
    },
    setLeftStyle: function () {
      let wid = this.width + 7 + 'px';
      //左边div的宽度 等于 100% - （右边div + line的宽度）
      return `width: calc(100% - ${wid});`
    },
    setRightStyle: function () {
      let wid = this.width + 'px';
      return `width:${wid};`
    },
  }
}
</script>

<style scoped>
.view{
  height: 100%;
  float: left;
  overflow: auto;
  background: pink;
}
.line{
  float: left;
  width: 7px;
  height: 100%;
  background: #CEDEF5;
  border-radius: 5px;
  cursor: e-resize;
}
</style>
