export function getXBarOptions({yAxisData,datas}){
    const colorList = [ 
        "#39B3FF",
        "#47E0E0",
        "#7891D9",
        "#83D978",
        "#C7A530",
        "#FF8439"];
    const defaultData = [100, 100, 100, 100, 100, 100];
    let maxArr = new Array(datas.length).fill(100);
    return {
        backgroundColor: "rgba(20,28,52,0)",
        grid: {
            left: "5%",
            right: "5%",
            bottom: "5%",
            top: "10%",
            containLabel: true,
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "none",
            },
            formatter: function(params) {
              return (
                params[0].name +
                "<br/>" +
                "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                params[0].seriesName +
                " : " +
                params[0].value
              );
            },
        },
        xAxis: {
            show: false,
            type: "value",
        },
        yAxis: [{
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              color: "#fff",
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: yAxisData,
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              color: "#ffffff",
              fontSize: "12",
              formatter: function(value) {
                  return value + " %";
              },
            },
            data: datas.list,
          },
        ],
        series:[
            {
                name: "完成率",
                type: "bar",
                zlevel: 1,
                itemStyle: {
                    borderRadius: 0,
                    color: (params) => {
                        return colorList[params.dataIndex];
                    },
                },
                barWidth: 20,
                data: datas.list,
            },
            {
                name: "背景",
                type: "bar",
                barWidth: 20,
                barGap: "-100%",
                data: defaultData,
                itemStyle: {
                    color: "#1B375E",
                    borderRadius: 0,
                },
            }
        ]
    }
}