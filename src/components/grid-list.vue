<template>
  <div class="grid-icon" v-if="list.length">
    <div class="list" v-for="(item, index) in list" :key="index">
      <div class="title" :class="`t-${index}`" :style="`background: linear-gradient(to right, ${item.l_bg}, ${item.r_bg})`">
        <h2>{{item.typeName}}</h2>
        <span>{{item.desc}}</span>
      </div>
      <div class="icon-grid">
        <van-grid :column-num="3" :border="false" clickable>
          <van-grid-item 
            v-for="(value, o) in item.typeRes"
            :class="{hide: value.hide}"
            :key="o"
            :icon="value.link_image || 'photo-o'"
            @click="goGrid(value.url, value.path, value.name)"
            :text="value.name"
          />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    goGrid(url, path, name) {
      if (url == 'event') return this.$emit('search')
      if (!this.$store.state.token) return this.$router.push('/login')  
      if(name == '远程诊断') {
        this.$dialog({
          title: '该功能目前只支持APP使用,请点击上方按钮下载APP'
        })
        return
      }
      if (name == '返厂维修') return window.location.href = `${url}?token=${this.$store.state.token}`  
      if ( !(url || path) ) return this.$toast('暂未开通此功能')     
      if (url) return window.location.href = url
      if (path) return this.$router.push(path)
    }
  }
};
</script>

<style scoped lang="scss">
.list {
  /deep/ .van-grid-item__icon{
    font-size: size(60);
  }
  /deep/ .van-grid-item__text{
    font-size: size(24);
    font-weight: bold;
  }
  .title {
    height: size(150);
    padding: size(20) size(30);
    color: #fff;
    text-align: left;
    border-radius: size(40) size(40) 0 0;
    background: linear-gradient(to right, #04b396, #07d6c5);
    h2 {
      margin-top: size(10);
      margin-bottom: size(20);
      font-size: size(36);
    }
    span{
      font-size: size(26);
      color: #eee;
    }
  }
  .icon-grid {
    background: #fff;
    margin-bottom: size(20);
    /deep/ .van-grid-item {
      &.hide{
        display: none;
      }
    }
  }
}

</style>
