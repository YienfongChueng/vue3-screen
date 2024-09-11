<template>
    <div class="container" ref="screeRef">
        <!-- 标题 -->
        <div class="title">
            <ModuleTitle/>
        </div>
        <!-- 主体部分 -->
        <div class="main">
            <ModuleTop />
            <ModuleMiddle />
            <ModuleBottom />
        </div>
    </div>
</template>

<script setup>
import ModuleTitle from './components/moduleTitle.vue'
import ModuleTop from './components/moduleTop.vue'
import ModuleMiddle from './components/moduleMiddle.vue'
import ModuleBottom from './components/moduleBottom.vue'

import {ref,onMounted,nextTick} from 'vue'

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

window.onresize =()=>{
    getStyle();
}

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

</style>