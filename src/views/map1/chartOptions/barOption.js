import * as echarts from 'echarts'
export function getBarOptions({bgColor,xAxisData,yAxisUnit,datas}) {
    const series = datas&&datas.map(item => {
        return {
            name: item.name,
            type: 'bar',
            barWidth: item.barWidth || '15%',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: item.color1 || '#fccb05'
                  }, {
                    offset: 1,
                    color: item.color2 || '#f5804d'
                  }]),
                  borderRadius: 12,
            },
            data: item.list
        }
    })
    return {
        backgroundColor: bgColor,
        title: {
            text: '',
            textStyle:{
                align: 'center',
                color: '#fff',
                fontSize: 20,
            },
            top: '5%',
            left: 'center',
        },
        tooltip: {
            trriger: 'axios',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '2%',
            right: '4%',
            bottom: '14%',
            top: '16%',
            containLabel: true
        },
        legend: {
            // data: legendData,
            right: 10, //top: "8%",
            top: 12,
            textStyle: {
                color: "#fff"
            },
            itemWidth: 12,
            itemHeight: 10,
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLine: {
                lineStyle: {
                  color: 'white'
      
                }
            },
            axisLabel: {
                // interval: 0,
                // rotate: 40,
                fontFamily: 'Microsoft YaHei'
            },
        },
        yAxis: {
            type: 'value',
            name: yAxisUnit || '',
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'white'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(255,255,255,0.3)'
                }
              },
              axisLabel: {}
        },
        // dataZoom: [{ // 区域缩放
        //     show: true,
        //     height: 12,
        //     xAxisIndex: [0],
        //     bottom: '8%',
        //     start: 10,
        //     end: 90,
        //     handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        //     handleSize: '110%',
        //     handleStyle: {
        //       color: "#d3dee5",
    
        //     },
        //     textStyle: {
        //       color: "#fff"
        //     },
        //     borderColor: "#90979c"
        //   }, {
        //     type: "inside",
        //     show: true,
        //     height: 15,
        //     start: 1,
        //     end: 35
        // }],
        series: series
    }
}