export function getRedGradient(chart){
    const {ctx, chartArea:{top,bottom, left, right}}=chart
    const gradientSegment = ctx.createLinearGradient(left,0,right,0)
    gradientSegment.addColorStop(0,'rgba(246,107,131,1)')
    gradientSegment.addColorStop(1, 'rgba(242,27,63,.5)')
    return gradientSegment
}
export function getDarkGreenGradient(chart){
    const {ctx, chartArea:{top,bottom, left, right}}=chart
    const gradientSegment = ctx.createLinearGradient(left,0,right,0)
    gradientSegment.addColorStop(0,'rgba(23,40,21,1)')
    gradientSegment.addColorStop(1, 'rgba(49,68,46,.5)')
    return gradientSegment
}
export function getDarkBlueGradient(chart){
    const {ctx, chartArea:{top,bottom, left, right}}=chart
    const gradientSegment = ctx.createLinearGradient(left,0,right,0)
    gradientSegment.addColorStop(0,'rgba(88,111,124,1)')
    gradientSegment.addColorStop(1, 'rgba(96,174,218,.5)')
    return gradientSegment
}
export function getYellowGradient(chart){
    const {ctx, chartArea:{top,bottom, left, right}}=chart
    const gradientSegment = ctx.createLinearGradient(left,0,right,0)
    gradientSegment.addColorStop(0,'rgba(255,248,29,1)')
    gradientSegment.addColorStop(1, 'rgba(255,247,127,.5)')
    return gradientSegment
}
export function getPurpleGradient(chart){
    const {ctx, chartArea:{top,bottom, left, right}}=chart
    const gradientSegment = ctx.createLinearGradient(left,0,right,0)
    gradientSegment.addColorStop(0,'rgba(233,30,99,1)')
    gradientSegment.addColorStop(1, 'rgba(103,58,183,1)')
    return gradientSegment
}