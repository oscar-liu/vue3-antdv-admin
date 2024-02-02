/*
 * @Description: 签名规则
 * @Author: oscar
 */
import md5 from "md5";

/**
 * 签名规则
 * @param {Object} $data 签名参数对象
 * @param {String} $appkey 签名appkey
 * @returns String
 */
export const getSign = (data:any, appkey:string) => {
  const appKey = appkey;
  const dataArrs = objKeySort(data); // 排序

  let str = "";
  let tmp = "";
  for (const index in dataArrs) {
    str =
      str == ""
        ? index + "=" + data[index]
        : str + "," + index + "=" + data[index];
  }
  if (str) {
    tmp = ",";
  }
  str += tmp + "appkey=" + appKey;
  return md5(str).toLowerCase();
};

// 对象按键值排序
function objKeySort(obj:any) {
  const newkey = Object.keys(obj).sort();
  const newObj:any = {};
  for (let i = 0; i < newkey.length; i++) {
    if (obj[newkey[i]] === undefined) {
      delete obj[newkey[i]];
    } else {
      newObj[newkey[i]] = obj[newkey[i]];
    }
  }
  return newObj;
}
