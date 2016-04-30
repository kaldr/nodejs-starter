angular.module("disney", ['ng', 'ngLocale', 'ui.bootstrap']).config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]).controller("reservationController", reservationController);

function reservationController(DTWGetReservationCountByDate, DTWGetOrderBySessionID, $interval, checkPurchaseFromAPI, getWeixinQRCode, updateProductPriceForADayFromAPI, sendICOrderToAPI,
  getDisneyRoomContent, getDisneyHotelContent, DTWsubmitReservationForFinalOrderToAPI, DTWsubmitReservationForFinalOrderToDisney, sendDisneyMessage, DTWsubmitReservationToDisney,
  DTWsubmitReservationToAPI, getTicketPrice, $scope, $rootScope, $filter, $location) {
  var vm = this;
  vm.currentStep = 1;
  vm.onlineStock = 15;
  vm.submitted = false;
  vm.hotel = {};
  vm.reservationForm = {};
  vm.selectDay = "one_day";
  vm.selectAge = "adult";
  vm.selectNum = 3;
  vm.startDate = '2016-06-20';
  vm.endDate = '2016-06-21';
  vm.loadingProduct = true;
  vm.invailable = false;
  vm.product = false;
  vm.VisitDate = "2016-06-20";
  vm.showPrice = {
    adult: {
      one_day: 499,
      two_day: 950,
    },
    child: {
      one_day: 375,
      two_day: 710,
    },
    elder: {
      one_day: 375,
      two_day: 710,
    }
  };
  vm.datepickerOptions = {
    dateDisabled: disabled,
    datepickerMode: 'day',
    initDate: '2016-06-20',
    minMode: 'day',
    formatYear: 'yy',
    showWeeks: false,
    min: new Date(2016, 06, 20),
    max: new Date(2016, 09, 01)

  };
  $scope.disabled = disabled;

  function disabled(date, mode) {
    //var date = data.date,
    //  mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }
  $scope.step1 = '/iflying/views/templates/web.v8/disney/order/step1.tpl';
  $scope.hotelStep1 = '/iflying/views/templates/web.v8/disney/order/hotel_step1.tpl';
  $scope.step2 = '/iflying/views/templates/web.v8/disney/order/step2.tpl';
  $scope.step3 = '/iflying/views/templates/web.v8/disney/order/step3.tpl';
  $scope.getPriceByDate = getPriceByDate;
  $scope.checkSum = checkSum;
  $scope.caculateSum = caculateSum;
  $scope.reservationTicket = reservationTicket;
  $scope.submitReservation = submitReservation;
  $scope.getHotelData = getHotelData;
  $scope.sendICOrder = sendICOdrer;
  $scope.checkAndConfirm = checkAndConfirm;
  $scope.getVisitDate = getVisitDate;
  $scope.checkInput = checkInput;
  $scope.weixinpay = weixinpay;
  $scope.alipay = alipay;
  vm.plu = {};
  activate();

  function alipay() {
    reservationTicket(submit);

    function submit() {
      $("form#alipayform").submit();
    }

  }

  function weixinpay() {
    reservationTicket(submit);

    function submit() {
      $("form#weixinpayform").submit();
    }

  }

  function getVisitDate() {
    vm.VisitDate = $("#VisitDate").val();
  }

  function checkAndConfirm() {
    var url = $location.path().split("/");
    console.log(url);
    var cost = url[3];
    var sessionID = url[4].split("/")[0];
    vm.cost = cost / 100;
    vm.sessionID = sessionID;
    DTWGetOrderBySessionID(sessionID, function(response) {
      if (response.data.length > 0) {
        var orderData = response.data[0];
        vm.username = orderData.orderHistory.customer_name;
        vm.cellphone = orderData.orderHistory.cellphone;
        vm.sessionID = orderData.orderHistory.SessionID;
        vm.orderID = orderData.orderHistory.SourceID;
        vm.sourceID = orderData.orderHistory.SourceID;
        vm.sum = orderData.orderHistory.OrderTickets.length;
        vm.VisitDate = orderData.VisitDate;
        submitReservation();
      }
    });
    checkPurchaseFromAPI(vm.sessionID, function(response) {
      if (response.data.length == 1) {
        if (response.data[0].webOrderId == vm.sessionID) {
          submitReservation();

        }
      }
    });
  }

  function checkPurchase() {
    checkPurchaseFromAPI(vm.sessionID, function(response) {
      if (response.data.length == 1) {
        if (response.data[0].webOrderId == vm.sessionID) {
          vm.currentStep = 3;
          submitReservation();
          $interval.cancel(vm.checkPurchaseTimer);

        }
      }
    });
  }

  function freshDayProductPrice(date) {
    vm.notEnough = false;
    vm.cantCheckLeft = false;
    // var date = $scope.detailData.VisitDate;
    updateProductPriceForADayFromAPI(date, function(response) {
      vm.product = response;

    });
  }

  function sendICOdrer(data) {
    data.type = 'fastorder';
    data.rn = Math.random();
    data.ptitle = '迪士尼酒店';
    data.pid = 2;
    data.ltype = 9;
    data.adrid = 9;
    data.adrstr = '上海';
    sendICOrderToAPI(data, function(response) {
      console.log(response);
      vm.submitted = true;
    });
  }

  function activate() {
    if (vm.type == 'hotel') {
      getHotelData();
    } else if (vm.type == "success") {
      vm.sessionID = $location.search().sessionID;
      vm.cost = $location.search().cost;
    } else {
      setPLU();
      selectData();
      getPriceByDate(vm.VisitDate);

    }
  }

  function setPLU() {
    vm.plu.adult = {
      one_day: 'SHTP01WSRET',
      two_day: 'SHTPP2WSRET'
    };
    vm.plu.elder = {
      one_day: 'SHTP01WSSET',
      two_day: 'SHTPP2WSSET'
    };
    vm.plu.child = {
      one_day: 'SHTP01WSCET',
      two_day: 'SHTPP2WSCET'
    };
  }

  function getHotelData() {

    if ($location.absUrl().indexOf("shdlh") > -1) {
      vm.hotelType = hotelLY;
    } else if ($location.absUrl().indexOf("shtsh") > -1) {
      vm.hotelType = hotelTH;
    }
    // vm.selectDay = $location.search().selectDay;
    // vm.selectAge = $location.search().selectAge;
    // vm.selectNum = parseInt($location.search().selectNum);
    getDisneyHotelContent(function(hotelContent) {
      vm.hotelContent = hotelContent;

    });
    getDisneyRoomContent(function(roomContent) {
      vm.roomContent = roomContent;

    });
  }
  // function getHotelData() {
  // getDisneyHotelContent(function(hotelContent) {
  // vm.hotelContent = hotelContent;
  // });
  // getDisneyRoomContent(function(roomContent) {
  // vm.roomContent = roomContent;
  // });
  // };
  // }
  // function submitHotelOrder() {
  // $scope.submitOrder = function() {
  // if ($rootScope[position[2]].scopeInfo.userInfo.firstName &&
  // $rootScope[position[2]].scopeInfo.userInfo.firstName == '') {
  // $scope.detailTipInfo = '请填写联系人姓名';
  // return;
  // }
  // if ($rootScope[position[2]].scopeInfo.userInfo.lastNameXing &&
  // $rootScope[position[2]].scopeInfo.userInfo.lastNameXing == '') {
  // $scope.detailTipInfo = '请填写联系人姓拼音';
  // return;
  // }
  // if ($rootScope[position[2]].scopeInfo.userInfo.lastNameMing &&
  // $rootScope[position[2]].scopeInfo.userInfo.lastNameMing == '') {
  // $scope.detailTipInfo = '请填写联系人名拼音';
  // return;
  // }
  // if ($rootScope[position[2]].scopeInfo.userInfo.phoneNumber &&
  // $rootScope[position[2]].scopeInfo.userInfo.phoneNumber == '') {
  // $scope.detailTipInfo = '请填写联系人手机号';
  // return;
  // }
  // if ($rootScope[position[2]].scopeInfo.allNum <= 0) {
  // $scope.detailTipInfo = '请添加房间数量再提交';
  // return;
  // }
  // // 提交数据
  // $rootScope[position[2]].scopeInfo.submitLoading = true;
  // $rootScope[position[2]].scopeInfo.orderInfo.numberOfUnits = 1;
  // $rootScope[position[2]].scopeInfo.orderInfo.ageQualifyingCode_Adults =
  // "ADULT";
  // $rootScope[position[2]].scopeInfo.orderInfo.ageQualifyingCode_Children =
  // "CHILD";
  // $rootScope[position[2]].scopeInfo.orderInfo.gender =
  // $rootScope[position[2]].scopeInfo.userInfo.guestGender;
  // $rootScope[position[2]].scopeInfo.orderInfo.firstName =
  // $rootScope[position[2]].scopeInfo.userInfo.firstName;
  // $rootScope[position[2]].scopeInfo.orderInfo.lastName =
  // $filter('uppercase')($rootScope[position[2]].scopeInfo.userInfo.lastNameXing)
  // + ' '
  // +
  // $filter('uppercase')($rootScope[position[2]].scopeInfo.userInfo.lastNameMing);
  // $rootScope[position[2]].scopeInfo.orderInfo.nameTitle =
  // $rootScope[position[2]].scopeInfo.userInfo.guestGender == 'MALE' ? 'Mr.'
  // : 'Ms.';
  // // $rootScope[position[2]].scopeInfo.orderInfo.comments =
  // // "1名儿童，张三11岁，李四3月28日生日";
  // $rootScope[position[2]].scopeInfo.orderInfo.comments = "";
  // if ($rootScope[position[2]].scopeInfo.orderInfo.Count_Children > 0) {
  // $rootScope[position[2]].scopeInfo.orderInfo.comments =
  // $rootScope[position[2]].scopeInfo.orderInfo.Count_Children +
  // '名12岁以下儿童随行;';
  // }
  // if ($rootScope[position[2]].scopeInfo.orderInfo.orderNumChildUp > 0) {
  // $rootScope[position[2]].scopeInfo.orderInfo.comments +=
  // $rootScope[position[2]].scopeInfo.orderInfo.orderNumChildUp +
  // '名12岁以上儿童随行;';
  // }
  // $rootScope[position[2]].scopeInfo.orderInfo.Phones = [ {
  // phoneRole : 'PHONE',
  // phoneType : 'MOBILE',
  // phoneNumber : $rootScope[position[2]].scopeInfo.userInfo.phoneNumber
  // } ];
  // $rootScope[position[2]].scopeInfo.orderInfo.startDate =
  // $rootScope[position[2]].VisitDate;
  // // $rootScope[position[2]].scopeInfo.orderInfo.Rates[0].effectiveDate
  // // = $rootScope[position[2]].VisitDate;
  // $rootScope[position[2]].scopeInfo.orderInfo.endDate =
  // $filter('date')($rootScope[position[2]].scopeInfo.datePicker.endDate,
  // "yyyy-MM-dd");
  // console.log($rootScope[position[2]].scopeInfo.orderInfo);
  // disneyHotelOrderSubmit($rootScope[position[2]].scopeInfo.orderInfo,
  // function(response) {
  // if (response.resultStatusFlag == 'SUCCESS') {
  // $scope.detailTipInfo = '采购完成';
  // var message = {
  // OperationMobile : $rootScope[position[2]].scopeInfo.userInfo.phoneNumber,
  // OperationNotes : "尊敬的顾客" +
  // $rootScope[position[2]].scopeInfo.userInfo.firstName +
  // "，已经帮您预定上海迪士尼乐园酒店，订单号" + response.UniqueID + "，订单将为您保留30分钟，请尽快完成付款。",
  // OperationTypeID : 2,// 固定写2
  // OrderID : response.UniqueID,// 订单ID
  // SMSOrderStatus : 3
  // // 【2暂留或预定，3提交或成交，4取消】
  // };
  // sendDisneyMessage(message, function() {
  // });
  // $scope.clearData();
  // $scope.refreshPage();
  // } else {
  // $scope.detailTipInfo = '采购失败';
  // }
  // $rootScope[position[2]].scopeInfo.submitLoading = false;
  // console.log(response);
  // });
  // };
  // }

  // function getHotelInfoByDay() {
  // getDisneyHotelDetail(param, function(hotelDetail) {
  // hotelDetail.scopeInfo = {
  // allNum : 0,
  // roomAvail : true,
  // roomAvailCode : true,
  // submitLoading : false,
  // dayPriceAll : 0,
  // canBook : true,
  // subContentID : 1
  // };
  // hotelDetail.scopeInfo.userInfo = {
  // guestGender : "MALE"
  // };
  // hotelDetail.scopeInfo.datePicker = {
  // isOpened : false,
  // endDate : null
  // };
  // var date = new Date(hotelDetail.VisitDate.replace(/-/g, "/"));
  // date.setDate(date.getDate() + 1);
  // hotelDetail.scopeInfo.datePicker.endDate = date;
  // hotelDetail.scopeInfo.dayPrice = [];
  // hotelDetail.scopeInfo.orderInfo = {};
  // callback(hotelDetail);
  // });
  // }
  function reservationTicket(callback) {
    var selectDay = vm.selectDay;
    if (checkInput(selectDay)) {
      var order = {
        "SourceID": constructSourceID(),
        "VisitDate": vm.VisitDate,
        "OrderItems": generateOrderItems(selectDay),
        "GovernmentID": vm.cellphone
      };
      DTWGetReservationCountByDate($filter('date')(vm.VisitDate, 'yyyy-MM-dd'), function(response) {
        var canReservate = false;
        vm.notEnough = false;
        if (response.data.ok) {
          vm.cantCheckLeft = false;
          // 今天已经有购买记录了
          if (response.data.result.length > 0) {
            var todayCount = response.data.result[0].count;
            // 配额大于20，今天的网上购买量小于指定数量
            if (vm.ticketInfo.Balance > 20 && todayCount + vm.sum < vm.onlineStock) {
              canReservate = true;
            } else {
              vm.notEnough = true;
            }
          } else {
            // 配额大于20
            if (vm.ticketInfo.Balance > 20) {
              canReservate = true;
            } else {
              vm.notEnough = true;
            }
          }
        } else {
          vm.cantCheckLeft = true;
          canReservate = false;
        }
        if (canReservate) {
          reservationToSystem(order);
        }
      });

      function reservationToSystem(order) {
        DTWsubmitReservationToDisney(order, function(response) {
          switch (response.Status) {
            case 0:
            case 202:
            case 203:
            case 201:
              success();
              break;
            default:
              alert(response.StatusText);
              break;
          }

          function success() {
            var rsvt = {};
            if (response) {
              rsvt = response;
            }
            console.log(response);
            rsvt.user = {};
            rsvt.user.username = '网上预订';
            rsvt.VisitDate = vm.VisitDate;
            vm.sessionID = rsvt.SessionID;
            rsvt.GovermentID = vm.gid;
            rsvt.customer_name = vm.username;
            rsvt.customer_mobile = vm.cellphone;
            // 向disney提交成功，向ERP提交
            DTWsubmitReservationToAPI(rsvt, function(response) {
              var message = {
                OperationMobile: vm.cellphone,
                OperationNotes: "尊敬的顾客" + vm.username + "，已经帮您预定了" + $filter("date")(vm.VisitDate, "yyyy年M月d日") + "上海迪士尼乐园门票" + vm.sum + "张，总价￥" + vm.cost + "，订单号" + rsvt.SessionID + "，订单将为您保留10分钟，请尽快完成付款。",
                OperationTypeID: 2, // 固定写2
                OrderID: rsvt.SessionID, // 订单ID
                SMSOrderStatus: 2
                  // 【2暂留或预定，3提交或成交，4取消】
              };

              sendDisneyMessage(message, function() {});
              vm.currentStep = 2;
              $('form#qrcode').submit();
              vm.checkPurchaseTimer = $interval(checkPurchase, 2000);
              // getWeixinQRCode(rsvt, function(response) {
              // vm.qrcode = response;
              // });
              if (typeof callback == "function") {
                callback();
              }

            });
          }

        });
      }

    }

    function constructSourceID() {
      var orderType = "WEB";
      var datetimeStr = new Date();
      var random = getRandomInt(100, 999);
      vm.sourceID = orderType + $filter("date")(datetimeStr, "yyyyMMddHHmmss") + random;
      vm.orderID = vm.sourceID;
      return vm.sourceID;
    }

    function generateOrderItems(selectDay) {
      vm.cost = 0;
      var orderItems = [];
      angular.forEach(['adult', 'child', 'elder'], function(item) {
        if (vm.orderNum[item][selectDay] > 0) {
          var orderitem = {
            PLU: vm.plu[item][selectDay],
            Quantity: vm.orderNum[item][selectDay],
            Price: vm.product[item][selectDay]
          };
          vm.cost += orderitem.Quantity * vm.showPrice[item][selectDay];
          orderItems.push(orderitem);
        }
      });
      return orderItems;
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

  function checkInput(selectDay) {
    if (selectDay == undefined) {
      selectDay = vm.selectDay;
    }
    vm.sum = 0;
    angular.forEach(['adult', 'child', 'elder'], function(item) {
      if (vm.orderNum[item][selectDay] > 0) {
        vm.sum += vm.orderNum[item][selectDay];
      }
    });
    if (vm.reservationForm.$valid && vm.sum > 0) {
      vm.error = false;
      vm.canpay = true;
      if ($("#paypanel").offset()) {
        $("html,body").animate({
          scrollTop: $("#paypanel").offset().top
        }, 1000);

      }
      return true;
    }
    vm.canpay = false;
    vm.error = true;
    return false;
  }
  /**
   * 提交预定订单
   */
  function submitReservation() {
    DTWsubmitReservationForFinalOrderToDisney({
      SourceID: vm.orderID,
      SessionID: vm.sessionID
    }, function(response) {
      switch (response.Status) {
        case 0:
        case 201:
        case 202:
        case 203:
          response.GovermentID = vm.gid;
          response.customer_name = vm.username;
          response.customer_mobile = vm.cellphone;
          response.submit_username = '网上预订';
          DTWsubmitReservationForFinalOrderToAPI({
            SessionID: vm.sessionID,
            TicketHistory: response,
          }, function(response) {
            vm.currentStep = 3;
            var message = {
              OperationMobile: vm.cellphone,
              OperationNotes: "尊敬的顾客" + vm.username + "，您已经购买了" + $filter("date")(vm.VisitDate, "yyyy年M月d日") + "上海迪士尼乐园门票" + vm.sum + "张，总价￥" + vm.cost + "，订单号" + vm.sessionID + "。",
              OperationTypeID: 2, // 固定写2
              OrderID: vm.sessionID, // 订单ID
              SMSOrderStatus: 3
                // 【2暂留或预定，3提交或成交，4取消】
            };
            sendDisneyMessage(message, function() {});
          });
          break;
        default:
          break;
      }
    });
  }

  function checkSum(type, sum, selectDay) {
    console.log("OKk");
    var count = 0;
    var flag = false;
    vm.full = false;
    angular.forEach(['adult', 'child', 'elder'], function(item) {
      if (item == type && vm.orderNum[item][selectDay] == 0 && sum < 0) {
        flag = true;
      }
    });
    if (flag) {
      return;
    }
    angular.forEach(['adult', 'child', 'elder'], function(item) {
      count += vm.orderNum[item][selectDay];
    });
    if (count < 5) {
      vm.full = false;
      count += sum;
      if (count == 5) {
        vm.full = true;
      }
      vm.orderNum[type][selectDay] += sum;
    } else {
      vm.full = true;
      count += sum;
      if (count < 5) {
        vm.full = false;
        vm.orderNum[type][selectDay] += sum;
      }
    }

  }

  function caculateSum() {

  }

  function selectData() {
    if ($location.absUrl().indexOf("order") == -1) {
      return;
    }
    vm.selectDay = $location.search().selectDay;
    vm.selectAge = $location.search().selectAge;
    vm.selectNum = parseInt($location.search().selectNum);
    vm.orderNum = {};
    angular.forEach(['adult', 'child', 'elder'], function(item) {
      vm.orderNum[item] = {};
      angular.forEach(['one_day', "two_day"], function(i) {
        vm.orderNum[item][i] = 0;
        if (item == vm.selectAge && i == vm.selectDay) {
          vm.orderNum[item][i] = vm.selectNum;
        }
      });
    });
    console.log(vm.orderNum);
  }
  /**
   * 根据日期获取价格
   */
  function getPriceByDate(date) {
    var visitDate = $filter("date")(date, "yyyy-MM-dd");
    if (visitDate < '2016-06-16') {
      visitDate = '2016-06-16';
    }
    getTicketPrice(visitDate, function(response) {
      vm.loadingProduct = false;
      if (response.length) {
        vm.ticketInfo = response[0];
        vm.product = response[0].Price;
      }
      freshDayProductPrice(visitDate);
    });
  }
}

/**
 * 获取产品的价格等信息
 *
 * @category *
 * @usage *
 * @param $http
 * @returns {Function}
 * @author kaldr
 * @email huangyu@feiyang.cn 2016年3月31日 下午4:47:22
 */
angular.module("disney").factory("getTicketPrice", getTicketPrice);

function getTicketPrice($http) {
  return func;

  function func(visitDay, callback) {
    var api = ticketAPI + "getStockForADay";
    var data = {
      date: visitDay
    };
    request.url = api;
    request.method = "POST";
    request.data = data;
    $http(request).then(success, fail);

    function success(response) {
      callback(response.data);
    }

    function fail(response) {
      callback(response);
    }
  }

}
/**
 * 提交订单到Disney，以成单
 */
angular.module("disney").factory("DTWsubmitReservationForFinalOrderToDisney", DTWsubmitReservationForFinalOrderToDisney);

function DTWsubmitReservationForFinalOrderToDisney($http) {
  return func;

  function func(params, callback) {
    var api = disneyTicketAPI + "ConfirmOrder";
    request.url = api;
    request.method = "POST";
    request.data = {
      Parameter: JSON.stringify(params)
    };
    $http(request).then(success, fail);

    function success(response) {
      callback(response.data);
    }

    function fail(response) {

    }
  }
}
/**
 * 发送迪士尼信息
 * OperationMobile，OperationNotes，OperationTypeID【2】，OrderID【订单ID】，SMSOrderStatus【2暂留或预定，3提交或成交，4取消】
 */
angular.module("disney").factory("sendDisneyMessage", sendDisneyMessage);

function sendDisneyMessage($http) {
  return func;

  function func(params, callback) {
    var api = dreamFlyUrl + "BasicData/SystemOperation/AddSMSRequest";
    request.url = api;
    request.method = "POST";
    request.data = {
      SMSRecord: JSON.stringify(params)
    };
    $http(request).then(success, fail);

    function success(response) {
      callback(response.data);
    }

    function fail(response) {

    }
  }
}
angular.module("disney").factory('DTWsubmitReservationToDisney', DTWsubmitReservationToDisney);

function DTWsubmitReservationToDisney($http) {
  return func;

  function func(input, callback) {
    var api = disneyTicketAPI + "OccupyOrder";
    var params = {};
    angular.copy(input, params);
    delete params["age"];
    delete params["type"];
    delete params["name"];
    request.url = api;
    request.method = "POST";
    request.data = {
      Parameter: JSON.stringify(params)
    };
    $http(request).then(success, fail);

    function success(response) {
      callback(response.data);
      return;
      var status = response.data.Status;
      var result = {};
      switch (status) {
        case 1:
          result.error = 1;
          result.Tip = response.StatusText;
          result.response = response.data;
          result.order = params;
          break;
        case 501:
          result.error = 501;
          result.Tip = "此票不可售";
          result.response = response.data;
          result.order = params;
          break;
        case 226:
          result.error = 226;
          result.Tip = "接口加密不正确，请联系信息中心";
          result.response = response.data;
          result.order = params;
          break;
        case 404:
          result.error = 404;
          result.Tip = "无票";
          result.reponse = response.data;
          result.order = params;
          break;
        case 0:
          result.response = response.data;
          result.order = params;
          break;
        default:
          result.Tip = response.data.StatusText;
          result.response = response.data;
          break;
      }
      callback(result);
    }

    function fail(response) {
      callback({
        error: 1,
        tip: "Disney官方接口错误",
        response: response
      });
    }
  }
}
angular.module('disney').filter('bedFilter', bedFilter);

function bedFilter() {
  return func;

  function func(items) {
    var results = [];
    angular.forEach(items, function(item) {
      if (item.Name.indexOf('折叠') == -1) {
        results.push(item);
      }
    });
    return results;
  }
}
/**
 * 提交预定订单，以占用位置
 */
angular.module("disney").factory("DTWsubmitReservationToAPI", DTWsubmitReservationToAPI);

function DTWsubmitReservationToAPI($http) {
  return func;

  function func(params, callback) {
    var api = ticketAPI + "saveAReservation";
    request.url = api;
    request.method = "POST";
    request.data = {
      data: JSON.stringify(params)
    };
    $http(request).then(success, fail);

    function success(response) {
      callback(response);
    }

    function fail(response) {
      console.log(response);
    }
  }
}
angular.module("disney").directive("governmentid", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {
      ngModel.$validators.governmentid = function(modelValue, viewValue) {
        return ngModel.$isEmpty(modelValue) || /(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(modelValue);
      };
    }
  };
});
angular.module("disney").directive("cellphone", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {
      ngModel.$validators.cellphone = function(modelValue, viewValue) {
        return ngModel.$isEmpty(modelValue) || /^1[3|4|5|7|8]\d{9}$/.test(modelValue);
      };
    }
  };
});
/**
 * 提交订单到API，以成单
 */
angular.module("disney").factory("DTWsubmitReservationForFinalOrderToAPI", DTWsubmitReservationForFinalOrderToAPI);

function DTWsubmitReservationForFinalOrderToAPI($http) {
  return func;

  function func(params, callback) {
    var api = ticketAPI + "confirmOrder";
    request.url = api;
    request.data = params;
    request.method = "POST";
    $http(request).then(success, fail);

    function success(response) {
      callback(response.data);
    }

    function fail(response) {}
  }
}
angular.module("disney").factory("getDisneyHotelContent", function($http) {
  return function(callBack) {
    request.url = baseUrl + "purchaseCenter/Disney/DisneyHotel/getAllHotel";
    request.method = "GET";
    $http(request).then(function(response) {
      if (response.data.code >= 700 && response.data.code < 800) {
        callBack(response.data.data);
      } else {
        // showErrorInfo(response.data);
      }
    }, function() {});
  };
});

angular.module('disney').factory("sendICOrderToAPI", sendICOrderToAPI);

function sendICOrderToAPI($http) {
  return func;

  function func(data, callback) {
    request.url = "http://www.iflying.com/ajax/line.php";
    request.method = "POST";
    request.data = data;
    $http(request).then(function(response) {
      callback(response);
    }, function() {});
  }
}
angular.module("disney").factory("getDisneyRoomContent", function($http) {
  return function(callBack) {
    request.url = baseUrl + "purchaseCenter/Disney/DisneyHotel/getAllRoom";
    request.method = "GET";
    $http(request).then(function(response) {
      if (response.data.code >= 700 && response.data.code < 800) {
        callBack(response.data.data);
      } else {
        // showErrorInfo(response.data);
      }
    }, function() {});
  };
});
angular.module("disney").factory("updateProductPriceForADayFromAPI", updateProductPriceForADayFromAPI);

function updateProductPriceForADayFromAPI($http) {
  return func;

  function func(date, callback) {
    var api = disneyProductAPI + "getProductForADayFromAPI" + "/" + date;
    request.url = api;
    request.method = "GET";
    $http(request).then(success, fail);

    function success(response) {
      callback(response.data);
    }

    function fail(response) {

    }
  }
}

angular.module("disney").factory("checkPurchaseFromAPI", checkPurchaseFromAPI);

function checkPurchaseFromAPI($http) {
  return func;

  function func(sessionID, callback) {
    var api = onlinePurchaseAPI + "checkPurchase";
    request.url = api;
    request.data = {
      sessionID: sessionID
    };
    request.method = "POST";
    $http(request).then(success, fail);

    function success(response) {
      callback(response.data);
    }

    function fail(response) {
      callback(response);
    }
  }
}
angular.module("disney").factory("getWeixinQRCode", getWeixinQRCode);

function getWeixinQRCode($http) {
  return func;

  function func(data, callback) {
    var api = "http://pay.iflying.com/WeiXin/NativePic.aspx";
    request.url = api;
    request.data = {
      orderAmount: 001,
      orderType: 'ticket',
      orderFromId: data.SessionID,
      orderId: data.SourceID
    };
    request.method = "POST";
    console.log(request);
    $http(request).then(success, fail);

    function success(response) {
      callback(response);
    }

    function fail(response) {
      callback(response);
    }
  }
}
/**
 * 获取订单历史，即获取采购成功的票
 */
angular.module("disney").factory("DTWGetOrderBySessionID", DTWGetOrderBySessionID);

function DTWGetOrderBySessionID($http) {
  return func;

  function func(sessionID, callback) {
    var api = onlinePurchaseAPI + "getOrderBySessionID/" + sessionID;
    request.url = api;
    request.method = "GET";
    console.log(request);
    $http(request).then(success, fail);

    function success(response) {
      callback(response.data);
    }

    function fail(response) {
      return [];
    }
  }
}
/**
 * 获取订单历史，即获取采购成功的票
 */
angular.module("disney").factory("DTWGetReservationCountByDate", DTWGetReservationCountByDate);

function DTWGetReservationCountByDate($http) {
  return func;

  function func(date, callback) {
    var api = onlinePurchaseAPI + "checkTodayReservation/" + date;
    request.url = api;
    request.method = "GET";
    console.log(request);
    $http(request).then(success, fail);

    function success(response) {
      callback(response.data);
    }

    function fail(response) {
      return [];
    }
  }
}
// ///////////////////////////
var request = {
  method: "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  transformRequest: function(data) {
    return $.param(data);
  }
};
var onlinePurchaseAPI = "http://disneyerp.iflying.com/purchaseCenter/Disney/OnlineDisneyPurchase/"
var disneyProductAPI = "http://disneyerp.iflying.com/purchaseCenter/Disney/DisneyProduct/";
var hotelLY = 'SHDLH';
var hotelTH = 'SHTSH';
var baseUrl = 'http://disneyerp.iflying.com/';
var dreamFlyUrl = "http://115.29.222.6:8888/";
var ticketAPI = 'http://disneyerp.iflying.com/purchaseCenter/Disney/DisneyTicketAPI/';
var disneyTicketAPI = "http://disneyerp.iflying.com/purchaseCenter/Disney/DisneyTicket/";
var hotelAPI = "";
var disneyHotelAPI = "";
var hotelAPI = 'http://disneyerp.iflying.com/purchaseCenter/Disney/DisneyTicketAPI';
