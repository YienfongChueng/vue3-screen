<template>
    <div class="container" ref="screeRef">
        <!-- 标题 -->
        <div class="title">
            <ModuleTitle title="threejs实现3D地图"/>
        </div>
        <!-- 主体部分 -->
        <div class="content">
            <ModuleLeft class="content-left"></ModuleLeft>
            <ModuleCenter class="content-center"></ModuleCenter>
            <ModuleRight class="content-right"></ModuleRight>
        </div>
    </div>
</template>

<script setup>
import ModuleTitle from '@/views/map1/components/moduleTitle.vue'
import ModuleLeft from './components/moduleLeft.vue'
import ModuleRight from './components/moduleRight.vue'
import ModuleCenter from './components/moduleCenter.vue'

import { debounce } from '@/utils'
import {ref,onMounted,nextTick,onBeforeUnmount} from 'vue'

//大屏自适应适配
const screeRef = ref()

// 页面缩放比例-全屏
const getScale = (dwidth=1920,dheight=1080)=> {
    const ww = window.innerWidth / dwidth
    const wh = window.innerHeight / dheight
    return {x:ww,y:wh}
}

// 缩放样式
const getStyle = ()=> {
    const {x,y} = getScale()
    screeRef.value.style.transform = `scale(${x},${y})`
}

onMounted(()=> {
    nextTick(()=>{
        getStyle();
    })
})

onBeforeUnmount(() => {
    window.onresize = null
})

window.onresize = debounce(getStyle,200)


</script>

<style scoped>
.container {
    position: absolute;
    left: 0;
    top: 0;
    transform-origin: left top;
    width:1920px; /*设计稿宽*/
    height: 1080px; /*设计稿高*/
}
.content {
  width: 100%;
  height: calc(100% - 100px);
  padding: 0 20px 10px;
  position: relative;
  display:flex;
  justify-content: center;
}
.content-left {
    position: absolute;
    width: 25%;
    left: 0;
    top:0;
    bottom:0;
    /* border:1px solid #fff; */
}
.content-center {
    width: 50%;
    height: 100%;
    /* border:1px solid #fff; */
}
.content-right {
    position: absolute;
    width: 25%;
    right: 0;
    top:0;
    bottom:0;
    /* border:1px solid #fff; */
}

</style>