import express from 'express'
const app = express()
const port = 3000

app.get('/chart1',(req,res)=> {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const data = {
        bgColor: '#080b3000',
        legendData: ['test1', 'test2', 'test3'],
        xAxisData:['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
        datas:[
            {
                name: 'test1',
                color1: '#fccb05',
                color2: '#f5804d',
                list:[400, 400, 300, 300, 300, 400, 400, 400, 300]
            },
            {
                name: 'test2',
                color1: '#8bd46e',
                color2: '#09bcb7',
                list:[400, 500, 500, 500, 500, 400, 400, 500, 500]
            },{
                name: 'test3',
                color1: '#248ff7',
                color2: '#6851f1',
                list:[400, 600, 700, 700, 1000, 400, 400, 600, 700]
            }
        ]
    }
    res.send(data)
})

app.get('/chart2',(req,res)=> {
    // const data = {
        
    // }
    const data = {
        d1: {
            item1: {
                value: 40,
                richColor:'#5FB878',
                itemColor:'#5FB878',
                text: '运行',
                textUnit:'台',
                name:'设备',
            },
           item2: {
               value: 75,
               richColor:'#E1E8EE',
               itemColor:'#E1E8EE',
           }
        },
        d2: {
            item1: {
                value: 34,
                richColor:'#01AAED',
                itemColor:'#01AAED',
                text: '计划',
                textUnit:'台',
                name:'设备',
            },
           item2: {
               value: 50,
               richColor:'#E1E8EE',
               itemColor:'#E1E8EE',
           }
        },
        d3: {
            item1: {
                value: 21,
                richColor:'#FF5722',
                itemColor:'#FF5722',
                text: '停机',
                textUnit:'台',
                name:'设备',
            },
           item2: {
               value: 25,
               richColor:'#E1E8EE',
               itemColor:'#E1E8EE',
           }
        }
    }
    res.send(data)
})

app.get('/chart3',(req,res) => {
    const data = {
        bgColor: '#00211f00',
        xAxisData:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        yAxisUnit: '单位：元',
        datas: [
            {
                name: '未发布',
                barWidth: '25%',
                color1: '#00bff2',
                color2: '#00bff2',
                list:[10, 30, 40, 120, 50, 90, 60, 40, 15, 60, 30, 15]
            },
            {
                name: '发布',
                barWidth: '25%',
                color1: '#fecb12',
                color2: '#fecb12',
                list:[5, 40, 60, 110, 40, 100, 70, 50, 20, 110, 40, 10]
            },
        ]
    }
    res.send(data)
})

app.get('/chart4',(req,res) => {
    const data = {
        bgColor: '#03060F00',
        xAxisData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datas: [
            {
                name: '今年',
                itemColor: '#ffcb00',
                list:[14, 75, 85, 24, 75, 23, 24, 43, 87, 72, 12, 53]
            },
            {
                name: '去年',
                itemColor: '#15faff',
                list:[85, 15, 24, 74, 75, 43, 42, 54, 43, 32, 52, 13]
            },
            {
                name: '前年',
                itemColor: '#00aa7f',
                list:[25, 65, 24, 4, 15, 73, 42, 54, 63, 42, 22, 93]
            },
        ]
    }
    res.send(data)
})

app.get('/chart5',(req,res) => {
    const data = {
        bgColor: '#0D275300',
        xAxisData:  ['娱乐', '科技', '学习', '文学', '体育', '美妆', '游戏'],
        item1:{
            name: '浏览',
            list: [31, 50, 20, 10, 24, 19.6, 12],
            color1: '#29acff',
            color2: '#4bdfff'
        },
        item2: {
            name: '用户',
            list: [63, 85, 57, 32.8, 43, 31.2, 26.9]
        }
    }
    res.send(data)
})

app.get('/chart6',(req,res) => {
    const data = {
        yAxisData:  ["1月", "2月", "3月", "4月", "5月", "6月"],
        datas:{
            list: [50, 60, 70, 20, 30, 10]
        }
    }
    res.send(data)
})

app.get('/chart7',(req,res) => {
    const data = {
        xAxisData:  ["2014", "2015", "2016", "2017", "2018", "2019"],
        datas:{
            list: [150, 200, 259, 360, 378, 450, 450]
        }
    }
    res.send(data)
})

app.get('/chart8',(req,res) => {
    const data = {
        datas:[
            {
                value: 1048,
                name: 'HTML'
            },
            {
                value: 735,
                name: 'CSS'
            },
            {
                value: 380,
                name: 'Javscript'
            },
            {
                value: 484,
                name: 'Vue'
            },
            {
                value: 300,
                name: ' React'
            },
            {
                value: 600,
                name: ' uniapp'
            },
        ]
    }
    res.send(data)
})




app.listen(port,()=> {
    console.log(`服务已启动:${port}`,)
})