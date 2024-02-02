/*
 * @Description: 获取本地缓存信息
 * @Author: oscar
 */

const TokenKey = "token"; // token
const UserInfoKey = "userInfo";

function getItem(key: string) {
  return window.localStorage.getItem(key);
}

function setItem(key:string, data:string) {
  return window.localStorage.setItem(key, data);
}

// 用户token
export const getToken = () => {
  return getItem(TokenKey);
};

export const setToken = (token:string) => {
  return setItem(TokenKey, token);
};

// 用户信息
export const getUserInfo = () => {
  const userInfo = getItem(UserInfoKey)
  return userInfo ? JSON.parse(userInfo)  : null;
};

export const setUserInfo = ( data: object) => {
  return setItem(UserInfoKey, JSON.stringify(data));
};
