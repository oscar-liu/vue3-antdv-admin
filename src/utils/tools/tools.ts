/**
 * 工具类
 */

/**
 * 获取对象的指定key值
 * @param keys
 * @param datas
 * @returns
 */
export const getKeys = (keys: any, datas: any) => {
    let tmp: any = {}
    for(let k in keys ){
        if(datas[k] ) {
            tmp[k] = datas[k]
        }
    }
    return tmp
}

// 清空对象值
export const clearObjValues = (obj: Object, fields = "*") => {
    let tmp = {}
    let targetField:any = []
    for(let k in obj ){
        let emptyValue:any
        let value = obj[k]
        if(fields != "*"){
            targetField = fields.split(",")
            if( !targetField.includes(k)) {
                continue
            }
        }
        switch (typeof value) {
            case "string":
                emptyValue = ""
                break;
            case "number":
                emptyValue = 0
                break;
            case "boolean":
                emptyValue = false
                break;
            case "object":
                if(value.constructor === Array) {
                    emptyValue = []
                } else {
                    emptyValue = {}
                }
                break;
            default:
                emptyValue = null
                break;
        }
        tmp[k] = emptyValue
    }
    return tmp
}
