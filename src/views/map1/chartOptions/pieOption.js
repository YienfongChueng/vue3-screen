export function getPieOptions({item1,item2}) {
    return {
        backgroundColor: "",
        series: [{
            name: 'pie',
            type: 'pie',
            clockwise: false,
            radius: [50, 80],
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            itemStyle: {
                shadowBlur: 0,
                shadowColor: '#203665'
            },
            center: ['50%', '50%'],
            data: [
                {
                    value:item1.value,
                    label:{
                        position: 'center',
                        show: true,
                        fontSize: '18',
                        fontWeight: 'normal',
                        color: '#fff',
                        rich: {
                            a: {
                              color: item1.richColor,
                              align: 'center',
                              fontSize: 18,
                              fontWeight: "bold"
                            },
                            b: {
                              color: '#fff',
                              align: 'center',
                              fontSize: 13
                            }
                          },
                        formatter: function(params) {
                            return `{b|${item1.text}\n\n}{a|${params.value}${item1.textUnit}}\n\n{b|${params.percent}%}`;
                        }
                    },
                    itemStyle: {
                        color: item1.itemColor,
                        shadowColor: item1.itemColor,
                        shadowBlur: 0
                    }

                },
                {
                    value: item2.value,
                    name: 'invisible',
                    itemStyle: {
                        color: item2.itemColor
                    },
                    emphasis: {
                        color: item2.itemColor
                    }
                }
            ]
            
        }]
    }
}