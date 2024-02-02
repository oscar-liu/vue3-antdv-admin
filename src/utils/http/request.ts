/*
 * @Description: axios
 * @Author: oscar
 * @Date: 2021-12-09 21:19:39
 */
import { getSecretkey, getWhiteApi } from "@/utils/http/config";
import { getSign } from "@/utils/http/sign";
import { getToken } from "@/utils/cache/index";
// import { showDialog, showNotify } from 'vant';
import { Modal, notification, message } from 'ant-design-vue';
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

type Result<T> = {
  code: number;
  message: string;
  data: T;
};

interface RequestConig extends AxiosRequestConfig{
  headers:any
}

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
  instance: AxiosInstance;
  // axios 实例
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = {
    baseURL: "",
    timeout: 60000
  };

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config));
    this.instance.interceptors.request.use(
      (config: RequestConig) => {
        const token = getToken()
        if(token) {
          config.headers!.token = token;
        }
        // 生成签名
        if(config.url) {
          let urls = config.url.split('/')
          let apipath = urls[1].substring(1, urls[1].length)
          let secretkey = getSecretkey(apipath) || {}
          let requestParams = config.params || {}
          if(config.method == 'post') {
            requestParams = config.data
          }
          const sign = getSign(requestParams, secretkey)
          config.headers!.sign = sign;
        }
        // 默认为json
        config.headers!.ContentType = 'application/json;charset=UTF-8'
        return config;
      },
      (err: any) => {
        // 请求错误，这里可以用全局提示框进行提示
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // console.log('AxiosResponse:', res)
        if( res.status == 200 ) {
          // 自定义业务code成功标识
          if(res.data.code == 0) {
            return res.data.data
          } else {
            // 业务异常捕获
            // 用户异常，请重新登录
            if(res.data.code == 403 || res.data.code == 1010) {
              Modal.error({
                title: 'ERROR',
                content: `${res.data.message}, 请重新登录`,
                onOk() {
                  window.localStorage.clear()
                  window.location.href = '/login'
                },
              });
            } else {
              notification['error']({
                message: 'Error',
                description:
                `${res.data.message}`
              });

              // message.error(`${res.data.message}`);
              // Modal.error({
              //   title: 'ERROR',
              //   content: `${res.data.message}`
              // });
              return Promise.reject(res.data);
            }
          }
        } else {
          // HTTP异常错误捕获
          return res;
        }

      },
      (err: any) => {
        // 这里用来处理http常见错误，进行全局提示
        let message = "";
        switch (err.response.status) {
          case 400:
            message = "请求错误(400)";
            break;
          case 401:
            message = "未授权，请重新登录(401)";
            // 这里可以做清空storage并跳转到登录页的操作
            break;
          case 403:
            message = "拒绝访问(403)";
            break;
          case 404:
            message = "请求出错(404)";
            break;
          case 408:
            message = "请求超时(408)";
            break;
          case 500:
            message = "服务器错误(500)";
            break;
          case 501:
            message = "服务未实现(501)";
            break;
          case 502:
            message = "网络错误(502)";
            break;
          case 503:
            message = "服务不可用(503)";
            break;
          case 504:
            message = "网络超时(504)";
            break;
          case 505:
            message = "HTTP版本不受支持(505)";
            break;
          default:
            message = `连接出错(${err.response.status})!`;
        }
        // 这里错误消息可以使用全局弹框展示出来
        // showDialog({
        //   message: `${message}`,
        // }).then(() => {
        //   // todo 错误上报
        // });
        return Promise.reject(err.response);
      }
    );
  }

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.delete(url, config);
  }
}

// 默认导出Request实例
export default new Request({})
