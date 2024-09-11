export function getRoseOptions({datas}){
    const backgroundColor = '#10173600';
    const title = {
      text: '前端开发',
      textStyle: {
        color: '#fff',
        fontSize: 12,
      },
      padding: 0,
      top: 35,
      left: 'center',
    };
    const legend = {
      //data，就是取得每个series里面的name属性。
      orient: 'vertical',
      icon: 'circle', //图例形状
      padding: 0,
      bottom: 'center',
      right: 40,
      itemWidth: 14, //小圆点宽度
      itemHeight: 14, // 小圆点高度
      itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
      textStyle: {
        fontSize: 14,
        color: '#ffffff',
      },
    };
    const tooltip = {
      show: true,
      formatter: '{b}:{d}%',
    };
    const color = ['#03acd1', '#04cab7', '#03c781', '#fce348', '#fc2d8a', '#0292fe'];
    return {
        backgroundColor,
        color,
        // title,
        tooltip,
        legend,
        series:[{
            name: '前端开发',
            type: 'pie',
            center: ['50%', '50%'], //圆心的位置
            top: '2%', //单单指的饼图距离上面的距离，top越大饼图越小
            left: '-30%', //单单指的饼图距离左面的距离，会改变饼图的大小
            radius: ['0%', '70%'], //环形图的本质就在这里 [内半径!=0，外半径] 外半径越大，圆越大
            avoidLabelOverlap: false, //做同心圆用到
            clockwise: false, //顺时针排列
            startAngle: 160, //起始角度 影响不大
            roseType: "area", //area|radius
            label: {
                show: true, //false不显示饼图上的标签
                position: 'outside', //inside（在饼图上显示）,outside(默认就会出现引导线) center
                formatter: '{b}:{c}',
                color: '#fff'
            },
            //只有设置了label:show=ture;position=outside 设置labelLine才会有效
            labelLine: {
                show: true, //显示引导线
                length: 30, //连接饼图第1段线条的长度 length length2 不写自适应
                length2: 10, //链接饼图第2段线条长度
                smooth: true, //是否光滑连接线
            },
            itemStyle: {
                //每个扇形的设置
                borderColor: 'rgba(0,0,0,.1)', //扇形边框颜色
                borderWidth: 0, //扇形边框大小 要先给borderColor颜色 设置borderWidth才会有效果
            },
            emphasis: {
                scale: true,
                scaleSize: 10,//启用鼠标放上去放大效果，这个挺好的
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
            data: datas
        }]
    }
}