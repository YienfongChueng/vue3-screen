import * as echarts from 'echarts'

export function getLineOptions({bgColor,xAxisData,datas}){
    return {
        backgroundColor: bgColor || '',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                  color: '#15ecf4',
                },
            },
            formatter: function(params) {
                var result = params[0].name + '<br>';
                params.forEach(function(item) {
                  result +=
                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
                    item.color +
                    '"></span>';
                  // 判断设置增长还是降低
                  if (parseFloat(item.data) >= 50) {
                    result += item.seriesName + ': ' + item.data + '%<br>';
                  } else if (parseFloat(item.data) < 50) {
                    result += item.seriesName + ': ' + item.data + '%<br>';
                  }
                });
                return result;
            },
        },
        legend: {
            // data: ['今年', '去年', '前年'],
            textStyle: {
              fontSize: 12,
              color: '#858ba1',
            },
            top: '2%',
            left: '5%',
        },
        grid: {
            bottom: 50,
            left: 70,
            right: 50,
        },
        // dataZoom: [{
        //     type: 'slider',
        //     show: true,
        //     xAxisIndex: [0],
        //     left: '10%',
        //     bottom: 0,
        //     height: 8,
        //     borderColor: '#37558a',
        //     start: 1,
        //     end: 45, //初始化滚动条
        //     textStyle: {
        //       color: '#fff',
        //     },
        // }],
        xAxis: {
            axisLine: {
              show: false,
              lineStyle: {
                color: '#15faff',
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              //改变刻度字体样式
              color: '#fff',
            },
            data: xAxisData
        },
        yAxis: {
            splitNumber: 4,
            interval: 25,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#4b4d64',
              },
            },
            axisLabel: {
              formatter: '{value} %',
              //改变刻度字体样式
              color: '#fff',
            },
        },
        series: datas&&datas.map(item => (
            {
                name: item.name,
                type: 'line',
                // smooth: true, // 设置拆线平滑
                symbol: 'circle',
                symbolSize: 10,
                itemStyle: {
                    color: item.itemColor,
                },
                data: item.list,
            }
        ))

    }
}

export function getLineBgOptions({bgColor,xAxisData,datas}) {
  return {
    backgroundColor: bgColor,
    grid: {
      top: "18%",
      left: "1%",
      right: "1%",
      bottom: "25%",
      containLabel: true
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0,
                color: "rgba(255,255,255,0)", // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(255,255,255,1)", // 50% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(255,255,255,0)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: true,
      axisLine: {
        //坐标轴轴线相关设置。数学上的x轴
        show: true,
        lineStyle: {
          color: "rgba(255,255,255,0.4)",
        },
      },
      axisLabel: {
        //坐标轴刻度标签的相关设置
        color: "#d1e6eb",
        margin: 15,
      },
      axisTick: {
        show: false,
      },
      data: xAxisData,
    },
    yAxis: {
      type: "value",
      min: 0,
      splitNumber: 4,
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
        margin: 20,
        color: "#d1e6eb",
      },
      axisTick: {
        show: false,
      },
    },
    series: [{
      name: "注册总量",
      type: "line",
      // smooth: true, //是否平滑曲线显示
      // symbol:'circle', // 默认是空心圆（中间是白色的），改成实心圆
      showAllSymbol: true,
      // symbol: 'image://./static/images/guang-circle.png',
      symbolSize: 8,
      lineStyle: {
        color: "#53fdfe", // 线条颜色
        borderColor: "#f0f",
      },
      label: {
        show: true,
        position: "top",
        color: "#fff",
      },
      itemStyle: {
          color: "rgba(255,255,255,1)",
      },
      tooltip: {
        show: false,
      },
      areaStyle: {
        //区域填充样式
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [{
                offset: 0,
                color: "rgba(0,150,239,0.3)",
              },
              {
                offset: 1,
                color: "rgba(0,253,252,0)",
              },
            ],
            false
          ),
          shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
          shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
      },
      data: datas.list,
    }]
  }
}