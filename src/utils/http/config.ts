/*
 * @Description: http 请求配置
 * @Author: oscar
 */

/**
 * 获取签名密钥
 * @param {String} key
 * @return {Object} object
 */
 export const getSecretkey = (key: string): string => {
  let secretkey = 'xwQhbzfXIIXoex2zZjVUDPEHY3g31q7y'
  if(key == 'other') {
    secretkey = 'xxx'
  }
  return secretkey
};

/**
 * 校验接口路径是否属于白名单，不需要校验TOKEN值
 * @param {String} apiUrl api 路径
 * @return {Boolean} true/false
 */
export const getWhiteApi = (apiUrl: string): boolean => {
  const whiteApis:Array<string> = [
    //api.path.name
  ];
  return whiteApis.includes(apiUrl)
};
