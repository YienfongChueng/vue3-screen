export const getDateTime = (type='datetime')=> {
    const date = new Date()
    const y = date.getFullYear('yyyy').toString()
    const m = (date.getMonth() + 1).toString()
    const d = date.getDate().toString()
    const h = date.getHours().toString()
    const mm = date.getMinutes().toString()
    const ss = date.getSeconds().toString()
    const date1 = `${y}年${m.padStart(2,'0')}月${d.padStart(2,'0')}日`
    const time = `${h.padStart(2,'0')}:${mm.padStart(2,'0')}:${ss.padStart(2,'0')}`
    switch (type) {
        case 'datetime':
            return `${date1} ${time}`
        case 'date':
            return date1
        case 'time':
            return time
        default:
            return date
    } 
}

export const debounce = (fn,delay = 300,...args) => {
    let timeout
    return function(){
        console.log("触发防抖")
        if(timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn.apply(this,args)
        }, delay);
    }
}