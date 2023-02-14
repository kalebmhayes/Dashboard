const shadowPlugin ={
    beforeDraw:  (chart, args, options)=>{
        const {ctx} = chart
        ctx.shadowColor = 'rgba(0,0,0,0.5)'
        ctx.shadowBlur = 10
        ctx.shadowOffsetX=-5
        ctx.shadowOffsetY=-5

    }
}

export default shadowPlugin