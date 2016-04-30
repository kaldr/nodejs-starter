angular.module('app', []).controller("process", function($scope, $http) {
  $scope.data = {};
  $scope.getAllProcessConfig = function() {
    $http({
      url: "http://erp.iflying.com/Check_config/getAllCheckConfig"
    }).then(function(response) {
      if (response.data.code >= 700 && response.data.code < 800) {
        $scope.checkProcesses = response.data.data;
      }
    }, function() {

    });
  };

  $scope.getAllRemindTypes = function() {
    $http({
      url: "http://erp.iflying.com/Check_config/getAllRemindTypes"
    }).then(function(response) {
      if (response.data.code >= 700 && response.data.code < 800) {
        $scope.remindTypes = response.data.data.result;
      }
    }, function() {
    });
  };

  $scope.getAllLabel = function() {
    $http({
      url: "http://erp.iflying.com/Check_config/getAllLabel"
    }).then(function(response) {
      if (response.data.code >= 700 && response.data.code < 800) {
        $scope.label = response.data.data.result;
        label = $scope.label;
      }
    }, function() {
    });
  };

  $scope.getAllPerson = function(){
    $http({
      url: "http://erp.iflying.com/common/user/getPersonnel?lock=0&limit=99999"
    }).then(function(response) {
      if (response.data.code >= 700 && response.data.code < 800) {
        $scope.person = response.data.data.list;
        person = $scope.person;
      }
    }, function() {
    });
  };

  $scope.getAllDepartment = function(){
    $http({
      url: "http://erp.iflying.com/common/Department/getDepartment"
    }).then(function(response) {
      if (response.data.code >= 700 && response.data.code < 800) {
        $scope.department = response.data.data;
        department = $scope.department;
      }
    }, function() {
    });
  };

  $scope.getAllProcessConfig();
  $scope.getAllRemindTypes();
  $scope.getAllLabel();
  $scope.getAllPerson();
  $scope.getAllDepartment();

  $scope.showCheckDetail = function(item) {
    $scope.showMode = 'edit';
    $scope.CheckDetail = item;
  };

  $scope.addCheckProcess = function() {
    $scope.showMode = 'add';
    $scope.CheckDetail = {
      process: [],
      name: ''
    };
  };

  $scope.addLabel = function(item){
    item.label.push($scope.data.selectLabel);
  };

  $scope.addPerson = function(item){
    item.personID.push($scope.data.selectPerson);
  };

  $scope.addDepartment = function(item){
    item.department.push($scope.data.selectDepartment);
  };

  $scope.changeCheckID = function(item) {
    _.find($scope.remindTypes, function(process) {
      if (item.name == process.subTypes.name) {
        item.checkID = process.subTypes.ID;
      }
    });
  };

  $scope.delLabel = function(process,label){
    process.label = _.without(process.label,label);
  };

  $scope.delDepartment = function(process,department){
    process.department = _.without(process.department,department);
  };

  $scope.delPerson = function(process,personID){
    process.personID = _.without(process.personID,personID);
  };

  $scope.configProcess = function(process){
    if(process.isShow){
      process.isShow = false;
    }else{
      process.isShow = true;
    }
  };

  $scope.CheckType = [{
    id: 1,
    value: '根据标签审核'
  }, {
    id: 2,
    value: '根据部门审核'
  }, {
    id: 3,
    value: '根据人员'
  }, {
    id: 1,
    value: '根据标签和部门审核'
  }];

  $scope.Boolean = [{
    id: true,
    value: '是'
  }, {
    id: false,
    value: '否'
  }];

  $scope.addProcess = function() {
    $scope.CheckDetail.process.push({
      checkID: 0,
      checkType: 1,
      customize: false,
      department: [],
      label: [],
      multiple: false,
      name: '',
      personID: []
    });
  };

  $scope.delProcess = function(item) {
    $scope.CheckDetail.process = _.without($scope.CheckDetail.process, item);
  };

  $scope.delCheckProcess = function(item){
    $http({
      url: "http://erp.iflying.com/Check_config/delCheckProcess?id="+item._id.$id
    }).then(function(response) {
      $scope.isSubmit = false;
      $scope.getAllProcessConfig();
      $scope.showMode = '';
    }, function() {

    });
  };

  $scope.saveCheckProcess = function() {
    $scope.isSubmit = true;
    $http({
      url: "http://erp.iflying.com/Check_config/saveCheckProcess",
      params: {
        detail: $scope.CheckDetail
      },
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(response) {
      $scope.isSubmit = false;
      $scope.getAllProcessConfig();
      $scope.showMode = '';
    }, function() {

    });
  };
});

angular.module('app').filter('labelfilter',function(){
  return function(input){
    var o = _.find(label,function(item){
      if(item.Label.NO==input){
        return true;
      }
    });
    if(o){
      return o.Label.name;
    }else{
      return '-';
    }
  };
});

angular.module('app').filter('departmentfilter',function(){
  return function(input){
    var o = _.find(department,function(item){
      if(item._id.$id==input){
        return true;
      }
    });
    if(o){
      return o.Name;
    }else{
      return '-';
    }
  };
});

angular.module('app').filter('personfilter',function(){
  return function(input){
    var o = _.find(person,function(item){
      if(item._id.$id==input){
        return true;
      }
    });
    if(o){
      return o.FullName;
    }else{
      return '-';
    }
  };
});
