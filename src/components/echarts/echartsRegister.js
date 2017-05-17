import echarts from 'echarts';
import registerChinaMap from './echartsChinaMap';
registerChinaMap(echarts);

export default echarts;


/*var angular = window.angular; 
angular.module('app.common')
  .service('getECharts', ['$q', function($q) {
    var eCharts, deferred = $q.defer();

    require.ensure([], function() {
      eCharts = require('echarts');
      var chinaMapRegister = require('./echartsChinaMap.js');
      chinaMapRegister.registerChinaMap(eCharts);
      deferred.resolve(eCharts);
    }, 'echarts');

    return deferred.promise;
  }])
  .service('echartsProRegister', ['getECharts', 'sceneApiService', '$q', function (getECharts, sceneApiService, $q) {
    var registeredProvince = [];
    return {
      registerProvince: function(province){
        var regPro = registeredProvince.find(function (regPro) {
          return regPro == province;
        });
        var deferred = $q.defer();
        if(regPro){
          deferred.resolve('province, ' + province + ' already registered!');
        }else{
          registeredProvince.push(province);
          sceneApiService.getProvinceMap(province)
            .then(function(response){

              getECharts.then(function(eCharts){
                eCharts.registerMap(province, response.data);
                deferred.resolve('province, ' + province + ' registered!');
              });

            }, function(response){
              console.log(response);
              deferred.reject(province + ' is not registered.');
            });
        }
        return deferred.promise;
      }
    };

  }]);*/