const garbageType = {
  0: {name: '可回收物', class: 'color-recyclable'},
  1: {name: '厨余垃圾(湿垃圾)', class: 'color-kitchen'},
  2: {name: '有害垃圾', class: 'color-harmful'},
  3: {name: '其他垃圾(干垃圾)', class: 'color-other'}
}

const garbageTypeList = [
  {value: 0, label: '可回收物'},
  {value: 1, label: '厨余垃圾(湿垃圾)'},
  {value: 2, label: '有害垃圾'},
  {value: 3, label: '其他垃圾(干垃圾)'}
]

module.exports = {garbageType, garbageTypeList}