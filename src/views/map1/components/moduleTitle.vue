<template>
    <div class="title">
        <Decoration8 :color="['#0258F0', '#0258F0']" style="width:300px; height:50px;" />
        <span class="title-content">{{title}}</span>
        <Decoration8 :color="['#0258F0', '#0258F0']" :reverse="true" style="width:300px; height:50px;" />
        <Decoration2 class="title-line" style="width:100%; height:10px;" />
        <span class="curdate">{{curDate}}</span>
    </div>
</template>

<script setup>
import {Decoration8,Decoration2} from '@dataview/datav-vue3'
import {ref,onBeforeUnmount } from 'vue'
import { getDateTime } from '@/utils'
const {title} = defineProps({
    title: {
        type: String,
        default: '企业销售可视化数据看板'
    }
})

const date = getDateTime()
let curDate = ref(date)
let timmer = setInterval(() => {
    curDate.value = getDateTime()
}, 1000);

onBeforeUnmount(()=> {
    timmer && clearInterval(timmer)
})

</script>

<style scoped>
.title {
    line-height: 100px;
    text-align: center;
    font-size: 30px;
    font-weight:500;
    display:flex;
    justify-content:center;
    align-items:center;
    position: relative;
}
.title-content {
    padding: 0 20px;
}
.title-line {
    position: absolute;
    bottom: 11px;

}
.curdate {
    position: absolute;
    right:30px;
    font-size:18px;
}
</style>