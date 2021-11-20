export const saveToLocalStorage =(key,value)=>{
    console.log(value)
    return localStorage.setItem(key,JSON.stringify(value))
}

export const getFromLocalStorage=(key)=>{
    return JSON.parse(localStorage.getItem(key))
}