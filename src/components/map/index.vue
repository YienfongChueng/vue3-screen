<template>
    <!--创建一个div，用于展示三维模型-->
    <div class="container" ref="threeMapRef"></div>
    <div id="tooltip" ref="tooltipRef"></div>
</template>

<script setup>
import { shallowRef,ref,reactive,onMounted } from 'vue'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// 引入three.js
import { Scene,PerspectiveCamera,WebGLRenderer,
Vector3,Vector2,FileLoader,Object3D,
Shape,LineBasicMaterial,BufferGeometry,ExtrudeGeometry,MeshBasicMaterial,DoubleSide,
Mesh,Line,AmbientLight,DirectionalLight,
CameraHelper,Raycaster} from "three";
import * as d3 from "d3";


//学习链接 https://segmentfault.com/a/1190000040287613#item-16

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
    // const geometry = new BoxGeometry(1,1,1)
    // const material = new MeshBasicMaterial({ color: 0x00ff00 })
    // mesh = new Mesh(geometry, material)
    // mesh.position.set(0,0,0)
    // scene.add(mesh)
    loadMapData()
    setRaycaster()
    addHelper()
    setController()
    render()
}

// 新建相机
const setCamera = () => {
    //创建透视投影相机
    camera = new PerspectiveCamera(95, threeMapWidth.value / threeMapHeight.value, 0.2, 3000);
    //设置相机位置
    camera.position.set(0, 0, 10);
    //设置相机的拍摄坐标，就是他的目标点位置
    camera.lookAt(new Vector3(0, 0, 0));

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
    // render()
}

 // 设置环境光
const setLight = () => {
    // const ambientLight = new AmbientLight(0xd4e7fd) // 环境光
    // scene.add(ambientLight)
    const ambientLight = new AmbientLight(0xd4e7fd, 4);
    scene.add(ambientLight);
    const directionalLight = new DirectionalLight(0xe8eaeb, 0.2);
    directionalLight.position.set(0, 10, 5);

    const directionalLight2 = directionalLight.clone();
    directionalLight2.position.set(0, 10, -5);

    const directionalLight3 = directionalLight.clone();
    directionalLight3.position.set(5, 10, 0);

    const directionalLight4 = directionalLight.clone();
    directionalLight4.position.set(-5, 10, 0);

    scene.add(directionalLight);
    scene.add(directionalLight2);
    scene.add(directionalLight3);
    scene.add(directionalLight4);
}

//render 方法 
let lastPick = reactive(null)
const render = () => {
    requestAnimationFrame(render)
     // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camera)
    // 算出射线 与当场景相交的对象有那些
    const intersects = raycaster.intersectObjects(
      scene.children,
      true
    )
    
    // 恢复上一次清空的 ['#041334', '#031A47']
    if (lastPick) {
      lastPick.object.material[0].color.set('#041334')
      lastPick.object.material[1].color.set('#031A47')
    }
    
    lastPick = intersects.find(
      (item) => item.object.material && item.object.material.length === 2
    )
    if (lastPick) {
      lastPick.object.material[0].color.set(0xff0000)
      lastPick.object.material[1].color.set(0xff0000)
    }
    showTip()
    renderer.render(scene, camera)
}

// 加载地图数据
function loadMapData() {
  const loader = new FileLoader()
  loader.load('/json/city.json', (data) => {
    const jsondata = JSON.parse(data)
    generateGeometry(jsondata)
  })
}
function generateGeometry(jsondata) {
    const center = jsondata.features[0].properties.centroid
    // 初始化一个地图对象
    const map = new Object3D()
    // 墨卡托投影转换
    const projection = d3
    .geoMercator()
    .center(center)
    // .scale(55)
    .translate([0, 0])

    jsondata.features.forEach((elem) => {
        // 定一个市3D对象
        const city = new Object3D()
        createMap(elem,city,projection)
        // 生成地图几何体
        map.add(city)
    })
    scene.add(map)
}

function createMap(data,cityMap,projection) {
    // 每个的 坐标 数组
    const coordinates = data.geometry.coordinates
    // 循环坐标数组
    coordinates.forEach((multiPolygon) => {
      multiPolygon.forEach((polygon) => {
        const shape = new Shape()
        const lineMaterial = new LineBasicMaterial({
          color: 'white',
        })
        
        const points = []
        for (let i = 0; i < polygon.length; i++) {
          const [x, y] = projection(polygon[i])
          if (i === 0) {
            shape.moveTo(x, -y)
          }
          shape.lineTo(x, -y)
          points.push(new Vector3(x, -y, 0))
        }
        const lineGeometry = new BufferGeometry()
        lineGeometry.setFromPoints(points)

        const extrudeSettings = {
          depth: 1, // 地图区域的立体高度
          bevelEnabled: false,
          steps: 1, // 拉伸的步数，增加可以使得拉伸更平滑
            bevelThickness: 1, // 贝维尔厚度
            bevelSize: 1, // 贝维尔大小
            bevelSegments: 2, // 贝维尔段数
        }
        const colors = ['#041334', '#031A47']
        const color = colors[Math.floor(Math.random() * colors.length)];

        const geometry = new ExtrudeGeometry(
          shape,
          extrudeSettings
        )
        const material = new MeshBasicMaterial({
          color: '#2defff',
          transparent: true,
          opacity: 0.8,
          side: DoubleSide,
        })
        const material1 = new MeshBasicMaterial({
          color: '#3480C4',
          transparent: true,
          opacity: 0.8,
          side: DoubleSide,
        })

        const mesh = new Mesh(geometry, [material, material1])
        const line = new Line(lineGeometry, lineMaterial)
        cityMap.add(mesh)
        cityMap.add(line)
      })
    })
}

function addHelper() {
  const helper = new CameraHelper(camera)
  scene.add(helper)
}

function setController() {
  const controller = new OrbitControls(
    camera,
    threeMapRef.value
  )
}
let raycaster = reactive({})
let mouse = reactive({})
let tooltipRef = ref()
function setRaycaster() {
  raycaster = new Raycaster()
  mouse = new Vector2()
  const onMouseMove = (event) => {
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    // 更改div位置
    tooltipRef.value.style.left = event.clientX + 2 + 'px'
    tooltipRef.value.style.top = event.clientY + 2 + 'px'
  }
  window.addEventListener('mousemove', onMouseMove, false)
}

function showTip() {
    // 显示省份的信息
    if (lastPick) {
      const properties = lastPick.object.parent

      tooltipRef.value.textContent = properties.name

      tooltipRef.value.style.visibility = 'visible'
    } else {
      tooltipRef.value.style.visibility = 'hidden'
    }
}


</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
}
#tooltip {
  position: absolute;
  z-index: 2;
  background: white;
  padding: 10px;
  border-radius: 2px;
  visibility: hidden;
}

</style>