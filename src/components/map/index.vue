<template>
    <!--创建一个div，用于展示三维模型-->
    <div ref="threeMapRef"></div>
</template>

<script setup>
import { shallowRef,onMounted } from 'vue'
import {Scene}from "three";
import { PerspectiveCamera } from "three";

const threeMapRef = shallowRef()
onMounted(() => {

})
const init = () => {
    //创建3D场景对象Scene 
    const scene = new Scene();
}

// 新建相机
const setCamera = () => {
    //创建透视投影相机
    let camera = new PerspectiveCamera(50, threeMapRef.value.offsetWidth / threeMapRef.value.offsetHeight, 1, 2000);

    //设置相机位置
    camera.position.set(5, 5, 5);

    //设置相机的拍摄坐标，就是他的目标点位置
    camera.lookAt(new Vector3(0, 0, 0));

}
//设置渲染器
const setRenderer = () => {

}

 // 设置环境光
const setLight = () => {
    
}


</script>

<style lang="scss" scoped>

</style>