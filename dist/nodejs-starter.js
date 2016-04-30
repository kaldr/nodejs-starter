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
});;angular.module("client_service", []).factory('webPayAPI', function($http) {
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
};;///////////////////////////////////////////////////////////////////////////////////////////////////
// config and public variables
///////////////////////////////////////////////////////////////////////////////////////////////////
var lotteryAPI = 'http://communityop.iflying.com/activity/games/LotteryAPI/';
var gameAPI = 'http://communityop.iflying.com/activity/games/GameAPI/';
var activityAPI = 'http://communityop.iflying.com/activity/common/ActivityAPI/';
var request = {
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    transformRequest: function(data) {
        return $.param(data);
    }
};;{
    "_id": ObjectId("57032849b0ae1ca0548b457e"),
    "title": "宁波国际投资咨询有限公司职工泰宁疗养活动",
    "theme": "欢迎来到美丽的泰宁",
    "content": "2016年国投公司创新旅行",
    "startTime": "",
    "endTime": "",
    "createTime": "1459824712557",
    "delStatus": false,
    "currentScene": 1,
    "currentSession": 1,
    "currentGame": 1,
    "invitingTime": "",
    "stopTime": "",
    "start": 0,
    "inviting": 0,
    "stop": 0,
    "end": 0,
    "type": {
        "ID": "5",
        "title": "旅行中场活动"
    },
    "creatorInfo": {
        "username": "朱晓丽",
        "userid": "000000000000000000000071",
        "department": {
            "ID": "000000000000000000000090"
        },
        "company": {
            "ID": "000000000000000000000001"
        }
    },
    "enterMode": {
        "ID": "2",
        "title": "报名",
        "url": ""
    },
    "operation": {
        "startMode": {
            "ID": "2",
            "title": "操作人员控制"
        },
        "endMode": {
            "ID": "2",
            "title": "操作人员控制"
        },
        "operator": [{
            "userid": "000000000000000000000071",
            "username": "朱晓丽"
        }]
    },
    "staff": [{
        "userid": "000000000000000000000071",
        "username": "朱晓丽"
    }],
    "scene": [{
        "ID": 1,
        "title": "4月8日晚宴抽奖",
        "type": {
            "ID": "4",
            "title": "宴席"
        },
        "theme": "晚宴",
        "content": "晚宴",
        "planStartTime": "Fri Apr 08 2016 18:00:00 GMT+0800 (CST)",
        "planEndTime": "Fri Apr 08 2016 21:00:00 GMT+0800 (CST)",
        "startTime": "",
        "endTime": "",
        "session": [{
            "ID": 1,
            "title": "飞扬有奖回馈",
            "type": {
                "ID": "1",
                "title": "抽奖环节"
            },
            "operation": {
                "startMode": {
                    "ID": "2",
                    "title": "操作人员控制"
                },
                "endMode": {
                    "ID": "2",
                    "title": "操作人员控制"
                },
                "operator": [{
                    "userid": "000000000000000000000071",
                    "username": "朱晓丽"
                }]
            },
            "game": [{
                "ID": 1,
                "title": "第一轮抽奖",
                "type": {
                    "ID": "1",
                    "title": "抽奖"
                },
                "lotteryMode": {
                    "drawTimesPerPerson": 3
                },
                "operation": {
                    "startMode": {
                        "ID": "2",
                        "title": "操作人员控制"
                    },
                    "endMode": {
                        "ID": "2",
                        "title": "操作人员控制"
                    },
                    "operator": [{
                        "userid": "000000000000000000000071",
                        "username": "朱晓丽"
                    }]
                },
                "prizes": [{
                    "title": "东钱湖随风阳光沙滩2张",
                    "img": "/public/images/CommunityOP/Activity/taining/dongqianhu.jpg",
                    "count": 1
                }, {
                    "title": "小龙1个",
                    "img": "",
                    "count": 2
                }, {
                    "title": "旅游现金券10元周边游",
                    "img": "",
                    "count": 15
                }]
            }, {
                "ID": 2,
                "title": "第二轮抽奖",
                "type": {
                    "ID": "1",
                    "title": "抽奖"
                },
                "lotteryMode": {
                    "drawTimesPerPerson": 3
                },
                "operation": {
                    "startMode": {
                        "ID": "2",
                        "title": "操作人员控制"
                    },
                    "endMode": {
                        "ID": "2",
                        "title": "操作人员控制"
                    },
                    "operator": [{
                        "userid": "000000000000000000000071",
                        "username": "朱晓丽"
                    }]
                },
                "prizes": [{
                    "title": "天童国家森里公园2张",
                    "img": "/public/images/CommunityOP/Activity/taining/tiantong.jpg",
                    "count": 1
                }, {
                    "title": "小龙1个",
                    "img": "",
                    "count": 2
                }, {
                    "title": "旅游现金券50元国内飞机线",
                    "img": "",
                    "count": 15
                }]
            }, {
                "ID": 3,
                "title": "第三轮抽奖",
                "type": {
                    "ID": "1",
                    "title": "抽奖"
                },
                "lotteryMode": {
                    "drawTimesPerPerson": 3
                },
                "operation": {
                    "startMode": {
                        "ID": "2",
                        "title": "操作人员控制"
                    },
                    "endMode": {
                        "ID": "2",
                        "title": "操作人员控制"
                    },
                    "operator": [{
                        "userid": "000000000000000000000071",
                        "username": "朱晓丽"
                    }]
                },
                "prizes": [{
                    "title": "小龙1个",
                    "img": "",
                    "count": 1
                }, {
                    "title": "东钱湖随风阳光沙滩2张",
                    "img": "/public/images/CommunityOP/Activity/taining/dongqianhu.jpg",
                    "count": 1
                }, {
                    "title": "天童国家森里公园2张",
                    "img": "/public/images/CommunityOP/Activity/taining/tiantong.jpg",
                    "count": 1
                }, {
                    "title": "旅游现金券100元出境飞机线",
                    "img": "",
                    "count": 15
                }]
            }]
        }]
    }, {
        "ID": 2,
        "title": "4月9日晚宴抽奖",
        "type": {
            "ID": "4",
            "title": "宴席"
        },
        "theme": "晚宴",
        "content": "晚宴",
        "planStartTime": "Sat Apr 09 2016 18:00:00 GMT+0800 (CST)",
        "planEndTime": "Sat Apr 09 2016 21:00:00 GMT+0800 (CST)",
        "startTime": "",
        "endTime": "",
        "session": [{
            "ID": 1,
            "title": "飞扬有奖回馈",
            "type": {
                "ID": "1",
                "title": "抽奖环节"
            },
            "operation": {
                "startMode": {
                    "ID": "2",
                    "title": "操作人员控制"
                },
                "endMode": {
                    "ID": "2",
                    "title": "操作人员控制"
                },
                "operator": [{
                    "userid": "000000000000000000000071",
                    "username": "朱晓丽"
                }]
            },
            "game": [{
                "ID": 1,
                "title": "第一轮抽奖",
                "type": {
                    "ID": "1",
                    "title": "抽奖"
                },
                "lotteryMode": {
                    "drawTimesPerPerson": 3
                },
                "operation": {
                    "startMode": {
                        "ID": "2",
                        "title": "操作人员控制"
                    },
                    "endMode": {
                        "ID": "2",
                        "title": "操作人员控制"
                    },
                    "operator": [{
                        "userid": "000000000000000000000071",
                        "username": "朱晓丽"
                    }]
                },
                "prizes": [{
                    "title": "东钱湖随风阳光沙滩2张",
                    "img": "/public/images/CommunityOP/Activity/taining/dongqianhu.jpg",
                    "count": 1
                }, {
                    "title": "小龙1个",
                    "img": "",
                    "count": 2
                }, {
                    "title": "旅游现金券10元周边游",
                    "img": "",
                    "count": 15
                }]
            }, {
                "ID": 2,
                "title": "第二轮抽奖",
                "type": {
                    "ID": "1",
                    "title": "抽奖"
                },
                "lotteryMode": {
                    "drawTimesPerPerson": 3
                },
                "operation": {
                    "startMode": {
                        "ID": "2",
                        "title": "操作人员控制"
                    },
                    "endMode": {
                        "ID": "2",
                        "title": "操作人员控制"
                    },
                    "operator": [{
                        "userid": "000000000000000000000071",
                        "username": "朱晓丽"
                    }]
                },
                "prizes": [{
                    "title": "天童国家森里公园2张",
                    "img": "/public/images/CommunityOP/Activity/taining/tiantong.jpg",
                    "count": 1
                }, {
                    "title": "小龙1个",
                    "img": "",
                    "count": 2
                }, {
                    "title": "旅游现金券50元国内飞机线",
                    "img": "",
                    "count": 15
                }]
            }, {
                "ID": 3,
                "title": "第三轮抽奖",
                "type": {
                    "ID": "1",
                    "title": "抽奖"
                },
                "lotteryMode": {
                    "drawTimesPerPerson": 3
                },
                "operation": {
                    "startMode": {
                        "ID": "2",
                        "title": "操作人员控制"
                    },
                    "endMode": {
                        "ID": "2",
                        "title": "操作人员控制"
                    },
                    "operator": [{
                        "userid": "000000000000000000000071",
                        "username": "朱晓丽"
                    }]
                },
                "prizes": [{
                    "title": "福泉山景区门票2张",
                    "img": "/public/images/CommunityOP/Activity/taining/fuquanshan.jpg",
                    "count": 1
                }, {
                    "title": "小龙1个",
                    "img": "",
                    "count": 1
                }, {
                    "title": "旅游现金券100元出境飞机线",
                    "img": "",
                    "count": 15
                }]
            }]
        }]
    }],
    "orderID": "",
    "gameStart": 0,
    "gameInviting": NumberLong(1),
    "gameEnd": 0
};angular.module( 'game', [] );
// 开始一个游戏
angular.module( "game" ).factory( 'startAGame', function ( $http ) {
  return func;

  function func( data, callback ) {
    request.method = "POST";
    request.url = gameAPI + "startAGame";
    request.data = data;
    $http( request )
      .then( function successCallback( data, status, headers, config ) {
          callback( data );
        },
        function errorCallback( data, status, headers, config ) {
          callback( data );
        } );
  }
} );
// 结束一个游戏
angular.module( "game" ).factory( 'endAGame', function ( $http ) {
  return function( data, callback ) {
    request.method = "POST";
    request.url = gameAPI + "endAGame";
    request.data = data;
    $http( request )
      .then( function successCallback( data, status, headers, config ) {
          callback( data );
        },
        function errorCallback( data, status, headers, config ) {
          callback( data );
        } );
  }
} );
// 开始邀请加入一个游戏
angular.module( "game" ).factory( 'inviteIntoAGame', function ( $http ) {
  return function( data, callback ) {
    request.method = "POST";
    request.url = gameAPI + "inviteIntoAGame";
    request.data = data;
    $http( request )
      .then( function successCallback( data, status, headers, config ) {
          callback( data );
        },
        function errorCallback( data, status, headers, config ) {
          callback( data );
        } );
  }
} );
// 加入一个游戏
angular.module( "game" ).factory( 'joinGame', function ( $http ) {
  return function( data, callback ) {
    request.method = "POST";
    request.url = gameAPI + "joinGame";
    request.data = data;
    $http( request )
      .then( function successCallback( data, status, headers, config ) {
          callback( data );
        },
        function errorCallback( data, status, headers, config ) {
          callback( data );
        } );
  }
} );
;///////////////////////////////////////////////////////////////////////////////////////////////////
// module
///////////////////////////////////////////////////////////////////////////////////////////////////
var lottery = angular.module('lottery', ['ui.bootstrap', 'activity', 'game',
    'HYPublicDirective', 'ngCookies'
]).config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.html5Mode(true);
    }
]);


// /////////////////////////////////////////////////////////////////////////////////////////////////
// controller
// /////////////////////////////////////////////////////////////////////////////////////////////////
function lotteryController($interval, $location, $cookies, $filter, $rootScope,
    $scope, $anchorScroll,
    getActivityFromAPI, userJoinActivity, inviteCustomers, getAnActivityStatus,
    startLottery, enterLottery, endLottery, draw, getWinners, getPlayerStatus,
    getPlayerPrize) {
    var vm = this;
    vm.lotteryID = '5718237886955579423114d2'; //16
    // join button status
    vm.canJoin = false;
    vm.joining = false;
    // user button actions
    vm.buttonJoinTheActivity = buttonJoinTheActivity;
    vm.checkJoinInput = checkJoinInput;
    vm.buttonPrepared = buttonPrepared;
    vm.buttonDraw = buttonDraw;
    vm.drawTime = {};
    vm.joinedGame = {};
    vm.myPrize = [];
    vm.myActivityPrize = [];
    // admin buton actions
    vm.buttonPleasePrepare = buttonPleasePrepare;
    vm.buttonStartDraw = buttonStartDraw;
    vm.buttonEndLottery = buttonEndLottery;
    vm.buttonNextRound = buttonNextRound;
    // view model
    vm.user = {
        activityID: vm.lotteryID
    };
    vm.panel = {
        adminpanel: true,
        userpanel: true,
    };
    vm.stage = {
        needJoin: true,
        stepList: true,
        winnerList: true,
        comment: true,
        prizeList: true,
        gamePanel: true
    };
    // view element
    vm.currentCalculate = currentCalculate;
    vm.current = {};
    vm.nowInviting = 0;
    vm.winners = [];
    vm.goto = goto;

    function goto(hash) {
        $('html,body').animate({
            scrollTop: $('#' + hash).offset().top
        }, 500);
        // $location.hash( hash );
        // $anchorScroll();
    }
    // /////////////////////////////////
    // View
    // /////////////////////////////////
    function currentCalculate() {

        var scene = _.find(vm.activity.scene, function(item) {
            return item.ID == vm.activity.currentScene;
        });

        vm.current.scene = {
            title: scene.title,
            ID: scene.ID,
            count: scene.session.length
        };

        var session = _.find(scene.session, function(item) {
            return item.ID == vm.activity.currentSession;
        });
        vm.current.session = {
            title: session.title,
            ID: session.ID,
            count: session.game.length
        };

        var game = _.find(session.game, function(item) {
            return item.ID == vm.activity.currentGame;
        });
        vm.currentDrawLimit = game.lotteryMode.drawTimesPerPerson;
        vm.current.game = {
            title: game.title,
            ID: game.ID
        };
        if (scene.ID == 2 && game.ID == 3) {
            vm.activity.end = 1;
        }
    }
    // /////////////////////////////////
    // User funcs
    // /////////////////////////////////
    function buttonJoinTheActivity() {
        if (checkJoinInput()) {
            vm.joining = true;
            vm.canJoin = false;
            userJoinActivity(vm.user, function(response) {
                vm.joining = false;
                if (response.code == 700) {
                    vm.joining = false;
                    vm.stage.needJoin = false;
                    $cookies.putObject('user', vm.user);
                } else {
                    vm.canJoin = true;
                }
            });
        }
    }

    function buttonPrepared() {
        var userdata = {
            activityID: vm.lotteryID,
            sceneID: vm.activity.currentScene,
            sessionID: vm.activity.currentSession,
            gameID: vm.activity.currentGame,
            username: vm.user.username,
            cellphone: vm.user.cellphone
        };
        enterLottery(userdata, function(response) {
            vm.waitingForOthers = 1;
            vm.joinedGame[vm.activity.currentScene][vm.activity.currentSession]
                [vm.activity.currentGame] = true;
        });

    }

    function buttonDraw() {
        vm.drawing = true;
        vm.drawTime[vm.activity.currentScene][vm.activity.currentSession][vm.activity
            .currentGame
        ] += 1;
        var userdata = {
            activityID: vm.lotteryID,
            sceneID: vm.activity.currentScene,
            sessionID: vm.activity.currentSession,
            gameID: vm.activity.currentGame,
            username: vm.user.username,
            cellphone: vm.user.cellphone,
            drawTime: vm.drawTime[vm.activity.currentScene][vm.activity.currentSession]
                [vm.activity.currentGame]
        };

        draw(userdata, function(response) {
            $interval(function() {
                if (userdata.drawTime == vm.currentDrawLimit) {
                    vm.noChanceToDraw = true;
                }
                if (response) {
                    if (response.status) {
                        vm.myPrize.unshift({
                            status: 2
                        });
                        vm.noChanceToDraw = true;
                    } else {
                        if (response.prize) {
                            vm.myPrize.unshift({
                                id: response._id.$id,
                                title: response.prize,
                                status: 1
                            });
                            vm.myActivityPrize.unshift({
                                id: response._id.$id,
                                title: response.prize,
                                prize: response.prize,
                                status: 1
                            });
                        } else {
                            vm.myPrize.unshift({
                                status: 0
                            });
                        }
                    }
                } else {
                    vm.myPrize.unshift({
                        status: 0
                    });
                }
                vm.drawing = false;
            }, 4000, 1);
        });
    }
    // 检查输入是否正确
    function checkJoinInput() {
        if (vm.joinForm.$valid) {
            vm.canJoin = true;
            return true;
        } else {
            vm.canJoin = false;
            return false;
        }

    }
    // /////////////////////////////////
    // admin funcs
    // /////////////////////////////////
    function buttonPleasePrepare() {
        var data = {
            activityID: vm.lotteryID,
            sceneID: vm.activity.currentScene,
            sessionID: vm.activity.currentSession,
            gameID: vm.activity.currentGame
        };
        inviteCustomers(data, function(response) {
            if (response.code == 700) {
                vm.activity.gameInviting = 1;
                vm.nowInviting = 1;
                $interval(function() {
                    vm.nowInviting = 0;
                }, 5000, 1);
            }
        });
    }

    function buttonNextRound() {
        vm.activity.currentGame = parseInt(vm.activity.currentGame);
        vm.activity.currentScene = parseInt(vm.activity.currentScene);
        if (vm.activity.currentGame < 3) {
            vm.activity.currentGame += 1;
        } else if (vm.activity.currentScene < 2) {
            vm.activity.currentScene += 1;
            vm.activity.currentGame = 1;
        }
        if (vm.activity.currentGame == 3 && vm.activity.currentScene == 2) {
            vm.activity.end = 1;
        }
        vm.activity.gameEnd = 0;
        currentCalculate();
    }

    function buttonStartDraw() {
        var data = {
            activityID: vm.lotteryID,
            sceneID: vm.activity.currentScene,
            sessionID: vm.activity.currentSession,
            gameID: vm.activity.currentGame
        };
        vm.activity.gameStart = 1;
        vm.activity.gameInviting = 0;
        vm.nowDrawing = 1;
        startLottery(data, function(response) {
            console.log(response);
            if (response.data.code == 700) {
                $interval(function() {
                    vm.nowDrawing = 0;
                }, 5000, 1);
            } else {
                vm.activity.gameInviting = 1;
                vm.activity.gameStart = 0;
                vm.nowDrawing = 0;
            }
        });
    }

    function buttonEndLottery() {
        var data = {
            activityID: vm.lotteryID,
            sceneID: vm.activity.currentScene,
            sessionID: vm.activity.currentSession,
            gameID: vm.activity.currentGame
        };
        endLottery(data, function(response) {
            vm.winners = response.data;
            vm.activity.gameEnd = 1;
            vm.activity.gameStart = 0;
        });
    }
    // /////////////////////////////////
    // config and activate
    // /////////////////////////////////
    activate();

    function activate() {
        getActivity();
        getUserInfoByCookie();
    }

    function getAdminInfo() {
        if ($location.path().indexOf('admin') > -1) {
            vm.panel = {
                adminpanel: true,
                userpanel: false
            };
            showWinners();
        } else {
            vm.panel = {
                adminpanel: false,
                userpanel: true
            };
            vm.updateStatusTimer = $interval(function() {
                getAnActivityStatus(vm.lotteryID, function(response) {
                    var data = response.data[0];
                    vm.activity.currentScene = data.currentScene;
                    vm.activity.currentGame = data.currentGame;
                    vm.activity.currentSession = data.currentSession;
                    vm.activity.gameEnd = data.gameEnd;
                    vm.activity.gameInviting = data.gameInviting;
                    vm.activity.gameStart = data.gameStart;
                    if (data.gameInviting) {
                        if (vm.noChanceToDraw) {
                            vm.noChanceToDraw = false;
                        }
                    }
                    currentCalculate();

                    if (data.gameStart) {
                        vm.waitingForOthers = 0;
                    }
                    if (data.gameEnd) {
                        var query = {
                            activityID: vm.lotteryID,
                            sceneID: vm.activity.currentScene,
                            sessionID: vm.activity.currentSession,
                            gameID: vm.activity.currentGame
                        };
                    }
                });
            }, 5000);
        }
    }

    function getActivity() {
        getActivityFromAPI(vm.lotteryID, function(response) {
            vm.activity = response.data[0];
            calculateDrawTime();
            currentCalculate();
            getAdminInfo();
        });
    }

    function calculateDrawTime() {
        vm.activity.scene.forEach(function(scene) {
            vm.drawTime[scene.ID] = {};
            vm.joinedGame[scene.ID] = {};
            scene.session.forEach(function(session) {
                vm.drawTime[scene.ID][session.ID] = {};
                vm.joinedGame[scene.ID][session.ID] = {};
                session.game.forEach(function(game) {
                    vm.drawTime[scene.ID][session.ID][game.ID] = 0;
                    vm.joinedGame[scene.ID][session.ID][game.ID] = 0;
                });
            });
        });
    }

    function showWinners() {
        getWinners({
            activityID: vm.lotteryID
        }, function(response) {
            vm.winners = response.data.data;
        });
    }

    function getUserInfoByCookie() {
        vm.stage.needJoin = true;
        var user = $cookies.getObject('user');
        if (user != undefined) {
            if (user.username && user.cellphone) {
                vm.user.username = user.username;
                vm.user.cellphone = user.cellphone;
                vm.stage.needJoin = false;
                getPlayerPrize({
                    activityID: vm.lotteryID,
                    username: user.username,
                    cellphone: user.cellphone
                }, function(response) {
                    console.log(response);
                    vm.myActivityPrize = response.data;
                });
                getPlayerStatus({
                    activityID: vm.lotteryID,
                    username: user.username,
                    cellphone: user.cellphone
                }, function(response) {
                    if (response.data.length) {
                        response = response.data[0];
                        vm.joinedGame[response.currentSceneID] = {};
                        vm.joinedGame[response.currentSceneID][response.currentSessionID] = {};
                        vm.joinedGame[response.currentSceneID][response.currentSessionID]
                            [response.currentGameID] = response.status;
                    }
                });
            }
        }


    }

}
angular.module("lottery").controller('lotteryController',
    lotteryController);

// /////////////////////////////////////////////////////////////////////////////////////////////////
// factory
// /////////////////////////////////////////////////////////////////////////////////////////////////
// 邀请顾客到抽奖中
angular.module("lottery").factory('inviteCustomers', function($http) {
    return function(data, callback) {
        request.method = "POST";
        request.url = lotteryAPI + "inviteCustomers";
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

// 开始抽奖
angular.module("lottery").factory('startLottery', function($http) {
    return function(data, callback) {
        request.method = "POST";
        request.url = lotteryAPI + "startLottery";
        request.data = data;
        $http(request)
            .then(function successCallback(data, status, headers, config) {
                    callback(data);
                },
                function errorCallback(data, status, headers, config) {
                    callback(data);
                });
    }
});
// 结束抽奖
angular.module("lottery").factory('endLottery', function($http) {
    return function(data, callback) {
        request.method = "POST";
        request.url = lotteryAPI + "endLottery";
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
// 将中奖者返回到游戏中
angular.module("lottery").factory('getWinners', function($http) {
    return function(data, callback) {
        request.method = "POST";
        request.url = lotteryAPI + "getWinners";
        request.data = data;
        $http(request)
            .then(function successCallback(data, status, headers, config) {
                    callback(data);
                },
                function errorCallback(data, status, headers, config) {
                    callback(data);
                });
    }
});
// 执行一次抽奖
angular.module("lottery").factory('draw', function($http) {
    return function(data, callback) {
        request.method = "POST";
        request.url = lotteryAPI + "draw";
        request.data = data;
        $http(request)
            .then(function successCallback(data, status, headers, config) {
                    callback(data.data.data);
                },
                function errorCallback(data, status, headers, config) {
                    callback(data.data.data);
                });
    }
});
// 准备好，进入抽奖
angular.module("lottery").factory('enterLottery', function($http) {
    return function(data, callback) {
        request.method = "POST";
        request.url = lotteryAPI + "enterLottery";
        request.data = data;
        $http(request)
            .then(function successCallback(data, status, headers, config) {
                    callback(data);
                },
                function errorCallback(data, status, headers, config) {
                    callback(data);
                });
    }
});
// 查询顾客的状态
angular.module("lottery").factory('getPlayerStatus', function($http) {
    return function(data, callback) {
        request.method = "POST";
        request.url = lotteryAPI + "getPlayerStatus";
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
// 查询顾客的状态
angular.module("lottery").factory('getPlayerPrize', function($http) {
    return function(data, callback) {
        request.method = "POST";
        request.url = lotteryAPI + "getPlayerPrize";
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

// /////////////////////////////////////////////////////////////////////////////////////////////////
// filter
// /////////////////////////////////////////////////////////////////////////////////////////////////