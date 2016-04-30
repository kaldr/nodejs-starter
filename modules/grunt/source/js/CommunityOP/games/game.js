angular.module( 'game', [] );
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
