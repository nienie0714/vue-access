<template>
  <div class="lifecycle pt">
    <v-header title="生命周期" back></v-header>
    <div class="centent">
      <v-lifecycle v-show="display" ref="lifecycle"></v-lifecycle>
      <button @click="display = !display">显示/隐藏</button>
      <button v-if="display" @click="$refs.lifecycle.update()">更新</button>
      <pre>
1. 在beforeCreate和created钩子函数之间的生命周期
在这个生命周期之间，进行初始化事件，进行数据的观测，可以看到在created的时候数据已经和data属性进行绑定。

2. created钩子函数和beforeMount间的生命周期
 1) 首先会判断对象是否有el选项。如果有的话就继续向下编译，如果没有el选项，直到在该vue实例上调用vm.$mount(el)。
 2) 如果有template选项，则将其作为模板编译成render函数
 3) 如果没有template选项，则将"app"的outerHTML作为模板编译

3. beforeMount和mounted 钩子函数间的生命周期
给vue实例对象添加$el成员，并且替换掉挂在的DOM元素

4. mounted里面已经完成了dom的渲染

5. 当data中的数据发生了改变，会触发对应组件的重新渲染，先后调用beforeUpdate和updated钩子函数

6. beforeDestroy钩子函数在实例销毁之前调用。在这一步，实例仍然完全可用。

7. destroyed钩子函数在Vue 实例销毁后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。???
      </pre>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        display: true
      };
    },
    methods: {
      update() {
        this.$refs.lifecycle.update();
      }
    },
    beforeCreate() {
      console.log('beforeCreate');
    },
    created() {
      console.log('created');
    },
    beforeMount() {
      console.log('beforeMount');
    },
    mounted() {
      console.log('mounted');
    },
    beforeUpdate() {
      console.log('beforeUpdate');
    },
    updated() {
      console.log('updated');
    },
    beforeDestroy() {
      console.log('beforeDestroy');
    },
    destroyed() {
      console.log('destroyed');
    },
    beforeRouterLeave() {
      console.log('beforeRouterLeave');
    },
    beforeRouterEnter() {
      console.log('beforeRouterEnter');
    }
  };
</script>

<style lang="less" scoped>
</style>
