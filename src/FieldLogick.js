
export const initArray = () => {
    const arr = []
    for(let x = 1; x < 17; x++) {
        arr.push({num: x, muveble: false})
    }
    return arr
}

export function changeFlags (state) {

    const arr = state.map((item, index, array) => {
        
        if(  array[index + 1] && 
             array[index+ 1].num ===16 &&
             index !== 3 &&
             index !== 7 &&
             index !== 11 &&
             index !== 15
         ){
            return {...item, muveble: true}
            
         } else if(
             array[index - 1] &&
             array[index - 1].num ===16 &&
             index !== 4 &&
             index !== 8 &&
             index !== 12 &&
             index !== 16
         ){
             return {...item, muveble: true}
         } else if (index < 12 && array[index + 4].num === 16) {
             return {...item, muveble: true}
         }  else if (index > 3 && array[index - 4].num === 16) {
             return {...item, muveble: true}
         } else {
         return {...item, muveble: false}
         }
     })
     return arr
 }

export const mixFields = fields => {
    const arr = fields.sort(() => Math.random() - 0.5)
    const arrNew = [...arr]
    return arrNew
}

export const checkResult = fields => {
    return fields.every((field, index) => {
        if (field.num === index +1) { return true} 
        else return false
    })
}