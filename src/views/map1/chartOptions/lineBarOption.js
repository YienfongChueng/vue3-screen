import * as echarts from 'echarts'
export function getLineBarOptions({bgColor,xAxisData,item1,item2}) {
    return {
        backgroundColor: bgColor,
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(1, 13, 19, 0.5)',
            borderWidth: 0,
            padding: 2,
            textStyle: {
              color: '#fff',
              fontSize: 15,
            },
            axisPointer: {
              type: 'shadow'
            },
        },
        grid: {
            top: '10%',
            bottom: '10%',
            left: '5%',
            right: '5%',
            containLabel: true,
        },
        legend: {
            // left: '280',
            // top: '10',
            textStyle: {
              padding: [4, 0, 0, 0],
              color: '33FFFF',
            },
            itemWidth: 15,
            itemHeight: 10,
            itemGap: 10,
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLine: {
              lineStyle: {
                color: 'rgba(66, 192, 255, .3)',
              },
            },
            axisLabel: {
              //x轴文字倾斜设置
              rotate: 0,
              color: '#FFFF',
            },
        },
        yAxis: [{
            type: 'value',
            splitLine: {
              show: false,
            },
            axisLabel: {
              color: '#fff',
            },
          },
          {
            type: 'value',
            interval: 20,
            // max: '50',
            // min: '0',
            scale: true,
            position: 'right',
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              formatter: '{value} 次', //右侧Y轴文字显示
              fontSize: 12,
              color: '#FFF',
            },
          },
        ],
        series: [
            {
                name: item1.name,
                type: 'bar',
                barWidth: '13px',
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: item1.color1,
                    },
                    {
                        offset: 1,
                        color: item1.color1,
                    },
                    ]),
                    borderRadius: 8,
                },
                data: item1.list,
            },
            {
                name: item2.name,
                type: 'line',
                // markPoint: {
                //     label: {
                //       show: true,
                //       position: "top",
                //       distance: 15,
                //       offset: [1, 1],
                //       lineHeight: 20,
                //       backgroundColor: '#00aaff',
                //       borderRadius: 6,
                //       borderColor: '#00aaff',
                //       borderWidth: '3',
                //       padding: [4, 3, 4],
                //       color: '#fff',
                //       fontSize: 12,
                //       fontWeight: 'normal',
                //     },
                //     symbol: "arrow",
                //     symbolSize: 10.5,
                //     symbolOffset: [0, -2],
                //     data: [{
                //       // type: 'average',
                //       name: '平均值',
                //       value: '平均浏览x次',
                //       xAxis: 3,
                //       yAxis: 23
                //     }],
                // },
                markLine: {
                    symbol: 'none',
                    data: [{
                        type: 'average',
                        name: '平均值'
                    }],
                    label: {
                        show: false
                    }
                },
                yAxisIndex: 1,
                smooth: false,
                symbol: 'circle',
                symbolSize: 9,
                itemStyle: {
                    color: '#00aaff',
                    borderColor: '#fff', //圆点透明 边框
                    borderWidth: 2,
                },
                lineStyle: {
                color: '#ffa43a',
            },
            data: item2.list,
            }
        ]
    }
}