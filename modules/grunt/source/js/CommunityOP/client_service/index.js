angular.module("client_service", []).factory('webPayAPI', function($http) {
    return function(param, callback) {
        var data = param;
        data.mchbillno = random10digt(4) + "20160408" + random10digt(10);
        request.url = "http://115.29.222.6:8888/WeChat/Redpack/SendRedpack";
        request.data = data;
        request.method = "POST";
        $http(request).then(function(response) {
            console.log(response);
        }, function(response) {
            console.log(response);
        });

        function random10digt(bit) {
            var num = 0;
            for (var i = 0; i < bit; i++) {
                var base = Math.random();
                if (base < 0.1) {
                    base = 0.1;
                }
                num += Math.floor(base * 10) * Math.pow(10, (i));
            }
            return num;
        }
    }
}).controller('client_service', function($scope, webPayAPI) {
    var vm = this;
    //oxTWIuGaIt6gTKsQRLau2M0yL16E
    //oGFuKjs8KfkkAP7cCBVH1zM_fgE8

    //oGFuKjqFEdqhFvFzO-HNpG2hnSqg
    vm.try = function() {
        var data = {
            wishing: "恭喜您获得爱飞扬活动奖金",
            reopenid: vm.openid,
            totalamount: vm.amount
        };
        webPayAPI(data, function() {});
    };
});

var request = {
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    transformRequest: function(data) {
        return $.param(data);
    }
};