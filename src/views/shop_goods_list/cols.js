export default [
  {
    type: 'selection'
  },
  {
    label: '商品',
    slot: 'content',
    width: 300,
    align: 'center'
  },
  {
    label: '实际销量',
    prop: 'sale_count',
    align: 'center'
  },
  {
    label: '商品状态',
    slot: 'status',
    align: 'center'
  },
  {
    label: '审核状态',
    slot: 'audit',
    align: 'center'
  },
  {
    label: '总库存',
    prop: 'stock',
    align: 'center'
  },
  {
    label: '操作',
    slot: 'active',
    align: 'center'
  }
]
