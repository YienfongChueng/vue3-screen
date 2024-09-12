<template>
    <!--创建一个div，用于展示三维模型-->
    <div class="container" ref="threeMapRef"></div>
</template>

<script setup>
import { shallowRef,ref,reactive,onMounted } from 'vue'
// 引入three.js
import { Scene,PerspectiveCamera,WebGLRenderer,Vector3,
Mesh,BoxGeometry,MeshBasicMaterial,AmbientLight} from "three";

const threeMapRef = ref()
const threeMapWidth = ref(0) // 画布宽
const threeMapHeight = ref(0) // 画布高
let scene = reactive({})
let camera = reactive({})
let renderer = reactive({})
let mesh = reactive({})
onMounted(() => {
    threeMapWidth.value = threeMapRef.value.offsetWidth
    threeMapHeight.value = threeMapRef.value.offsetHeight
    init()
})
const init = () => {
    //创建3D场景对象Scene 
    scene = new Scene();
    setCamera()
    setRenderer()
    const geometry = new BoxGeometry(1,1,1)
    //BoxGeometry：长方体
    // const geometry = new BoxGeometry(100, 100, 100);

    // // SphereGeometry：球体
    // const geometry = new SphereGeometry(2);

    // // CylinderGeometry：圆柱
    // const geometry = new CylinderGeometry(5,5,10);

    // // PlaneGeometry：矩形平面
    // const geometry = new PlaneGeometry(100,50);

    // //CircleGeometry：圆形平面
    // const geometry = new CircleGeometry(50);

    const material = new MeshBasicMaterial({ color: 0x00ff00 })
    mesh = new Mesh(geometry, material)
    mesh.position.set(0,0,0)
    scene.add(mesh)
    animate()
}

// 新建相机
const setCamera = () => {
    //创建透视投影相机
    camera = new PerspectiveCamera(45, threeMapWidth.value / threeMapHeight.value, 0.2, 3000);

    //设置相机位置
    camera.position.set(0, 0, 10);

    //设置相机的拍摄坐标，就是他的目标点位置
    // camera.lookAt(new Vector3(0, 0, 0));
    camera.lookAt(0,0,0);

}
//设置渲染器
const setRenderer = () => {
    //初始化渲染器
    renderer = new WebGLRenderer({
        antialias:true,  // 开启抗锯齿
    });
    //把渲染结果挂载到dom节点
    threeMapRef.value.appendChild(renderer.domElement);
    //设置渲染器大小
    renderer.setSize(threeMapWidth.value , threeMapHeight.value, true);
    // 设置像素比为设备的像素比，防止渲染模糊
    renderer.setPixelRatio(window.devicePixelRatio);
    //执行渲染操作
    // renderer.render(scene, camera);
}

 // 设置环境光
const setLight = () => {
    const ambientLight = new AmbientLight(0xffffff) // 环境光
    scene.add(ambientLight)
}

//render 方法 
const render = () => {
  renderer.render(scene, camera)
}

const animate = ()=> {
  requestAnimationFrame(animate)
//   mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  render()
}


</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
}

</style>