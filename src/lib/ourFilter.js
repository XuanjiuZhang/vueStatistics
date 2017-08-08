const initFilter = (Vue) => {
  Vue.filter('stringLength', function(value, maxLength = 100) {
    if (!value) { return ''}
    if(value.length >= maxLength){
      return value.substring(0, maxLength) + '...';
    }
    return value
  })
}

export default initFilter;