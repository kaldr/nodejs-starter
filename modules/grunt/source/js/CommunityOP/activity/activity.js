angular.module("activity", []);
// 邀请用户到活动中
angular.module("activity").factory('userJoinActivity', function($http) {
    return function(data, callback) {
        request.method = "POST";
        request.url = activityAPI + "bindUserToActivity";
        request.data = data;
        $http(request)
            .then(function successCallback(data, status, headers, config) {
                    callback(data.data);
                },
                function errorCallback(data, status, headers, config) {
                    callback(data.data);
                });
    }
});
// 获取一个活动的状态
angular.module("activity").factory('getAnActivityStatus', function($http) {
    return function(activityID, callback) {
        request.method = "POST";
        request.url = activityAPI + "getAnActivityStatus";
        request.data = {
            activityID: activityID
        };
        $http(request)
            .then(function successCallback(data, status, headers, config) {
                    callback(data.data);
                },
                function errorCallback(data, status, headers, config) {
                    callback(data.data);
                });
    }
});

// 获取一个活动的全部过程
angular.module("activity").factory('getActivityFromAPI', function($http) {
    return function(activityID, callback) {
        request.method = "POST";
        request.url = activityAPI + "getAnActivity";
        request.data = {
            activityID: activityID
        };
        $http(request)
            .then(function successCallback(data, status, headers, config) {
                    callback(data.data);
                },
                function errorCallback(data, status, headers, config) {
                    callback(data.data);
                });
    }
});
// 添加一个活动
angular.module("activity").factory('createAnActivity', function($http) {
    return function(data, callback) {
        request.method = "POST";
        request.url = activityAPI + "createAnActivity";
        request.data = {
            data: data
        };
        $http(request)
            .then(function successCallback(data, status, headers, config) {
                    callback(data);
                },
                function errorCallback(data, status, headers, config) {
                    callback(data);
                });
    }
});