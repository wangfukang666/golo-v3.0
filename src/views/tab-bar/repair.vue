<template>
  <container>
    <div class="repair">
      <div class="r-container">
        <div class="banner">
          <div class="phone"></div>
          <div class="split"></div>
          <div class="title">golo汽修大师</div>
          <div class="code">
            <img src="~img/code.png" alt="">
          </div>
          <div class="btn" @click="downloadApp">下载APP</div>
        </div>
        <div class="grid-m">
          <v-grid :list="grid_list" v-if="grid_list.length"></v-grid>
          <loading v-else/>
        </div>
      </div>
    </div>
  </container>
</template>

<script>
import VGrid from 'com/grid-list'
import { getModelGridList } from 'api'

export default {
  data() {
    return {
      text: '修车有问题',
      grid_list: []
    }
  },
  components: {
    VGrid
  },
  created() {
    this.getGridList()
  },
  methods: {
    async getGridList() {
      const data = await getModelGridList()
      if (data instanceof Array) {
        this.grid_list = data
      }
    },
    downloadApp() {
      const type = this._detect()
      window.location.href = 'http://golo.x431.com/go/?id=53'
      // if ( type == 'ios') {
      //   window.location.href='https://www.hao123.com'
      // } else {
      //   window.location.href='https://www.baidu.com'
      // }
    },
    _detect() {
      var equipmentType = ''
      var agent = navigator.userAgent.toLowerCase()
      var android = agent.indexOf('android')
      var iphone = agent.indexOf('iphone')
      var ipad = agent.indexOf('ipad')
      if (android != -1) {
        equipmentType = 'android'
      }
      if (iphone != -1 || ipad != -1) {
        equipmentType = 'ios'
      }
      return equipmentType
    }
  }
}
</script>

<style lang="scss" scoped>
.r-container {
  padding: size(10) size(20) 0 size(20);
  .banner {
    position: relative;
    width: 100%;
    height: size(420);
    background: linear-gradient(to bottom, #00314e, #02615e);
    border-radius: size(40);
    margin-bottom: size(20);
    .phone {
      position: absolute;
      top: size(60);
      left: size(98);
      width: size(158);
      height: size(318);
      @include bg('~img/phone.png');
    }
    .split {
      position: absolute;
      left: 44%;
      top: 35%;
      background: rgba($color: #fff, $alpha: 0.4);
      width: size(1);
      height: size(100);
    }
    .title {
      position: absolute;
      right: 15%;
      top: size(80);
      font-size: size(40);
      // width: size(138);
      color: #fff;
    }
    .code {
      position: absolute;
      right: size(150);
      top: size(150);
      width: size(138);
      height: size(137);
      z-index: 8;
    }
    .btn {
      position: absolute;
      right: size(120);
      bottom: size(40);
      padding: size(20) size(50);
      border-radius: size(50);
      color: #fff;
      font-size: size(26);
      border: size(1) solid #fff;
    }
  }
  .grid-m {
    /deep/ .title {
      &.t-1 {
        background: linear-gradient(to right, #024374, #096bb4);
      }
    }
  }
}
</style>


