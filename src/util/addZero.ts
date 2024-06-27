// 小于十前面补充0的方法
export const addZero = (num:number) => {
    return num > 9 ? num : `0${num}` 
}