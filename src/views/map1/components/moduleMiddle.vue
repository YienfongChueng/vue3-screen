<template>
    <div class="boxstyle">
        <div class="box-title">趋势走势情况</div>
        <div>
            <Chart v-if="option1" height="250px" :option="option1" />
        </div>
    </div>
    <div class="boxstyle">
        <div class="box-title">用户浏览访问情况</div>
        <div> <Chart v-if="option2" height="250px" :option="option2" /></div>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import Chart from '@/components/chart/index.vue'
import { getLineOptions } from '../chartOptions/lineOption.js'
import { getLineBarOptions } from '../chartOptions/lineBarOption.js'
import { getChart4,getChart5 } from '@/api'

const option1 = ref()
const option2 = ref()
onMounted(()=> {
    getChart4().then(res => {
        option1.value = getLineOptions(res.data)
    })
    getChart5().then(res => {
        option2.value = getLineBarOptions(res.data)
    })
})

</script>

<style scoped>

</style>