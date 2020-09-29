import request from '@/utils/request'

export default {
  /**
   * 入参说明：
   * resources {array} 资源名字数组，name为资源名，id为资源id(可选)
   * method {string} 方法名，默认为get
   * params {object}
   * data {object}
   * loading {boolean} 是否显示加载动画
  */
  restful({ resources, method = 'get', params = {}, data = {}, loading = true, url = '' }) {
    resources.forEach(item => {
      url += `/${item.name}${item.id ? '/' + item.id : ''}` // 判断是否有资源id，若有，则拼上资源id，若无，则直接为资源名称
    })
    return request({
      url,
      method,
      params,
      data,
      loading
    })
  }
}
