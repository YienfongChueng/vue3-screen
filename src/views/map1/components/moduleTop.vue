<template>
    <div class="boxstyle">
        <div class="box-title">往年数据变化趋势</div>
        <div>
            <Chart v-if="option1" height="250px" :option="option1" />
        </div>
    </div>
    <div class="boxstyle">
        <div class="box-title">设备资源情况</div>
        <div class="chart-wrap">
            <Chart v-if="option2" height="250px" :option="option2" />
            <Chart v-if="option3" height="250px" :option="option3" />
            <Chart v-if="option4" height="250px" :option="option4" />
        </div>
    </div>
    <div class="boxstyle">
        <div class="box-title">发布情况</div>
        <div><Chart v-if="option5" height="250px" :option="option5" /></div>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import Chart from '@/components/chart/index.vue'
import {getBarOptions} from '../chartOptions/barOption.js'
import {getPieOptions} from '../chartOptions/pieOption.js'
import { getChart1,getChart2,getChart3 } from '@/api'

const option1 = ref()
const option2 = ref()
const option3 = ref()
const option4 = ref()
const option5 = ref()
onMounted(()=> {
    getChart1().then(res => {
        option1.value = getBarOptions(res.data)
    })
    getChart2().then(res => {
        option2.value = getPieOptions(res.data.d1)
        option3.value = getPieOptions(res.data.d2)
        option4.value = getPieOptions(res.data.d3)
    }),
    getChart3().then(res => {
        option5.value = getBarOptions(res.data)
    })
})

</script>

<style scoped>
.chart-wrap {
    display: flex;
    justify-content: space-evenly;
}

</style>