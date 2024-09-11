<template>
    <div class="boxstyle">
        <div class="box-title">数据占比情况</div>
        <div><Chart v-if="option1" height="250px" :option="option1" /></div>
    </div>
    <div class="boxstyle">
        <div class="box-title">趋势走势</div>
        <div><Chart v-if="option2" height="250px" :option="option2" /></div>
    </div>
    <div class="boxstyle">
        <div class="box-title">前端开发技术栈</div>
        <div><Chart v-if="option3" height="250px" :option="option3" /></div>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import Chart from '@/components/chart/index.vue'
import { getXBarOptions } from '../chartOptions/xBarOption.js'
import { getLineBgOptions } from '../chartOptions/lineOption.js'
import { getRoseOptions } from '../chartOptions/roseOption.js'
import { getChart6,getChart7, getChart8} from '@/api'

let option1 = ref()
let option2 = ref()
let option3 = ref()

onMounted(()=> {
    getChart6().then(res => {
        option1.value = getXBarOptions(res.data)
    })
    getChart7().then(res => {
        option2.value = getLineBgOptions(res.data)
    })

    getChart8().then(res => {
        const data = res.data.datas.sort((a, b) => b.value - a.value) //数组从大到小排序
        option3.value = getRoseOptions({datas:data})
    })
})

</script>

<style scoped>

</style>