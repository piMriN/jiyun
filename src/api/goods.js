import request from '@/utils/request'

const getGoodsList = (current, data) => {
  const query = {}
  for (const key in data) {
    if (data[key]) {
      query[key] = data[key]
    }
  }
  return request({
    url: `/admin/goods/${current}`,
    method: 'GET',
    data: query
  })
}

const getCateList = () => {
  return request({
    url: '/admin/category',
    method: 'GET'
  })
}

const getSkusList = (current) => {
  return request({
    url: `/admin/skus/${current}`,
    method: 'get'
  })
}
export default {
  getGoodsList,
  getCateList,
  getSkusList
}
