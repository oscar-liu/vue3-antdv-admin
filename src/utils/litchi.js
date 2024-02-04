/**
 * 前端监控sdk
 * @author: oscar
 * @date: 2024.01
 */

import _ from 'lodash'


// 错误码
var ERROR_CONSOLE = 'console error',
    ERROR_RUNTIME = 'runtime error',
    ERROR_SCRIPT = 'script error',
    ERROR_STYLE = 'style error',
    ERROR_IMAGE = 'image error',
    ERROR_AUDIO = 'audio error',
    ERROR_VIDEO = 'video error';

// 错误类型
var LOAD_ERROR_TYPE = {
    SCRIPT: ERROR_SCRIPT,
    LINK: ERROR_STYLE,
    IMG: ERROR_IMAGE,
    AUDIO: ERROR_AUDIO,
    VIDEO: ERROR_VIDEO
};

var Litchi = function() {


    // 默认配置
    const DEFAULT_CONFIG = {
        pid: '', // rquired项目id
        uid: '', // rquired设备唯一ID，用于计算uv和设备分布，没有uid，可以用设备mac/idfa/imei替代
        sid: '', // 用户session
        token: '', // 用户token
        is_test: '', // 测试数据，不存储
        record: {
            time_on_page: true, // 是否监控用户在线时长数据，默认true
            performance: true, // 是否监控页面载入性能
            js_error: true, // 是否监控页面报错信息
            js_error_report_config: {
                ERROR_RUNTIME: true, // 运行错误
                ERROR_SCRIPT: true, // js资源加载失败
                ERROR_STYLE: true, // CSS资源加载失败
                ERROR_IMAGE: true, // 图片资源加载失败
                ERROR_AUDIO: true, // 音频资源加载失败
                ERROR_VIDEO: true, // 视频资源加载失败
                ERROR_CONSOLE: true, // Vue运行时错误
                ERROR_TRY_CATCH: true, // 未抓以错误，
                // 上报前最后判断是否需要报告该错误
                checkErrorNeedReport: (desc = '', stack = '') => {
                    return true
                }
            }
        },
        version: '1.0.0'
    }

    this.version = DEFAULT_CONFIG.version;
    this.config = DEFAULT_CONFIG


}

// 单例
Litchi.getInstance = (function() {
    let instance = null
    return function() {
        if(!instance) {
        instance = new Litchi()
        }
        return instance
    }
})()

Litchi.prototype = {
    /**
     * 设置config配置
     * @param {*} newConfig 
     */
    set(newConfig) {
        if(newConfig) {
            this.config = Object.assign(this.config, newConfig)
        }
    },


    /**
     * 手动上报数据log 
     * @param {String} type 类型
     * @param {Number} code 错误码
     * @param {Object} detail 具体信息
     * @param {Object} extra 扩展数据
     */
    log(type = '', code, detail = {}, extra = {} ) {
        const errorMsg = this.validLog(type, code ,detail, extra )
        if( errorMsg ){
            clog(errorMsg)
            return errorMsg
        }
        // 自定义fn
        let getPageTypeFunc = _.get(
            commonConfig,
            ['getPageType'],
            _.get(commonConfig, ['getPageType'])
        )
        let location = window.location
        let pageType = location.href
        try {
            pageType = ' ' + getPageTypeFunc(location)
        } catch(e) {
            debugLogger(`config.getPageType执行时异常，请注意错误信息=>`, { e, location })
            pageType = `${location.host}${location.pathname}`
        }

        const logInfo = {
            type,
            code,
            detail: this.detailAdapter(code, detail),
            extra: extra,
            common: {
                ...commonConfig,
                timestamp: Date.now(),
                runtime_version: commonConfig.version,
                page_type: pageType
            }
        }

        // 上报
        let img = new window.Image()
        img.src = "".concat( "litchi", "?d=").concat(encodeURIComponent(JSON.stringify(logInfo)))
    },

    // 检测日志是否合法
    validLog (type, code ,detail, extra) {
        
    },


    detailAdapter (code, detail) {
        return { code , detail }
    },

    /* --------------- 错误信息包装上报，可自行定义数据格式 -------------- */

    /**
     * 生成 runtime 错误日志
     * @param  {String} message 错误信息
     * @param  {String} source  发生错误的脚本URL
     * @param  {Number} lineno  发生错误的行号
     * @param  {Number} colno   发生错误的列号
     * @param  {Object} error   error对象
     * @return {Object}
     */
    formatRuntimerError(message, source, lineno, colno, error) {
        return {
            type: ERROR_RUNTIME,
            desc: message + ' at ' + source + ':' + lineno + ':' + colno,
            stack: error && error.stack ? error.stack.substring(0, 300) : 'no stack' // ETC IE <9, has no error stack
        };
    },

    /**
     * 生成 laod 错误日志
     * @param  {Object} errorTarget
     * @return {Object}
     */
    formatLoadError(errorTarget) {
        return {
            type: LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()],
            desc: errorTarget.baseURI + '@' + (errorTarget.src || errorTarget.href),
            stack: 'no stack'
        };
    }
    
}

// 实例化
var litchi = Litchi.getInstance()
var commonConfig = litchi.config

litchi && litchi.set({
    pid: 'joey',
    sid: "",
    token: localStorage.getItem('token'),
    is_test: false,
    version: '1.0.0'
})




const OFFLINE_MILL = 15 * 60 * 1000; // 定义不在线时间，15分钟无操作行为即为离线
const SEND_MILL = 5 * 1000; // 每间隔5s打点一次
let lastTime = Date.now()

window.addEventListener('click', function() {
    // 检测是否监控用户在线时长
    let isTimeOnPageFlag = true // todo ? 获取配置开关
    let isOldTimeonPageFlagon = true // todo ？获取在线时长
    let needRecordTimeOnPage = isTimeOnPageFlag || isOldTimeonPageFlagon
    if(needRecordTimeOnPage === false) {
        debugLogger("config.record.time_on_page false")
        return 
    }

    // 计算
    let now = Date.now()
    // 单击事件的时间 - js加载的时间
    let duration = now - lastTime

    if(duration > OFFLINE_MILL) {
        // 大于定义的离线时间，重新定义lastTime值为当前时间
        lastTime = Date.now()
    } else if (duration > SEND_MILL) {
        // 大于定义的间隔打点时间
        lastTime = Date.now()
        debugLogger('发送用户留存时间埋点，埋点内容:', {
            duration_ms: duration
        })
        litchi.log.product(10001, {
            duration_ms: duration
        })
    }
}, false)



/**
 * 错误处理事件
 * @param {Object} errorInfo 
 */
const handleError = (errorInfo) => {
    console.log("handleError", errorInfo)
}

const debugLogger = (message, result = {}) => {
    console.log("debugLogger:", message, result)
}

// 监听全局错误
window.addEventListener('error', function(event) {
    // 过滤target为window的异常
    var errorTarget = event.target
    var errorName = errorTarget.nodeName ? errorTarget.nodeName.toUpperCase() : '_errorName '
    if( errorTarget != window && errorTarget.name && LOAD_ERROR_TYPE[errorName]) {
        handleError( litchi.formatLoadError(errorTarget))
    } else {
        let { message, filename, lineno, colno, error } = event
        handleError( litchi.formatRuntimerError(message, filename, lineno, colno, error ))
    }
}, true)

// 监听浏览器中捕获到未处理的Promise错误
window.addEventListener('unhandledrejection', function(event) {
    handleError(event)
}, true)


window.onload = () => {
    // 检查是否监控性能指标
    const isPerformanceFlagOn = _.get(
      commonConfig,
      ['record', 'performance'],
      _.get(commonConfig, ['record', 'performance'])
    )
    const isOldPerformanceFlagOn = _.get(commonConfig, ['performance'], false)
    const needRecordPerformance = isPerformanceFlagOn || isOldPerformanceFlagOn
    if (needRecordPerformance === false) {
      debugLogger(`config.record.performance值为false, 跳过性能指标打点`)
      return
    }
  
    const performance = window.performance
    if (!performance) {
      // 当前浏览器不支持
      console.log('你的浏览器不支持 performance 接口')
      return
    }
    const times = performance.timing.toJSON()
  
    debugLogger('发送页面性能指标数据, 上报内容 => ', {
      ...times,
      url: `${window.location.host}${window.location.pathname}`
    })
  
    litchi.log('perf', 20001, {
      ...times,
      url: `${window.location.host}${window.location.pathname}`
    })
  }

console.error = (function(origin){
    return function(info) {
        var errorLog = {
            type: ERROR_CONSOLE,
            desc: info
        }
        handleError(errorLog)
        origin.call(console, info)
    }
})(console.error)



// 上报数据抽象
export const Elog = litchi.log.error = (code, detail, extra) => {
    return litchi.log('error', code, detail, extra )
}
export const Plog = litchi.log.product = (code, detail, extra ) => {
    return litchi.log('product', code, detail, extra )
}
export const Ilog = litchi.log.info = (code, detail, extra ) => {
    return litchi.log('info', code, detail, extra )
}

