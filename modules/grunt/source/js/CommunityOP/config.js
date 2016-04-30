///////////////////////////////////////////////////////////////////////////////////////////////////
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
};