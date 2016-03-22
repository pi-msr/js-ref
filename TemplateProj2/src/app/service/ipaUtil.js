(function() {
    'use strict';

    angular
        .module('ipa')
        .factory("ipaUtil", ipaUtil);

        /* @ngInject */
        function ipaUtil($log,$ionicLoading,$ionicPopup) {

            var ipaUtil = {};
                                  
            ipaUtil.showProgressDialog = function(progressText,delay){
                 $ionicLoading.show({
                                template:progressText,
                                duration:(delay*1000)
                            });
            }

            ipaUtil.showQuickToast = function(toastText){
                 $ionicLoading.show({
                                template:toastText,
                                duration:3000//3 seconds
                            });
            }

            ipaUtil.hideProgressDialog = function(){
                 $ionicLoading.hide();
            }

            ipaUtil.showAlert = function(text,title,subtitleTxt){
               title = fillInTitleIfEmpty(title);
               return $ionicPopup.alert({
                    title:title,
                    template:text,
                    subtitle:subtitleTxt
                });
            }

            ipaUtil.showConfirm = function(text,title,subtitleTxt){
                title = fillInTitleIfEmpty(title);
                return $ionicPopup.confirm({
                    title:title,
                    template:text,
                    subtitle:subtitleTxt
                });
            }

            ipaUtil.showCustomChoice = function(text,title,subtitleTxt,btnChoiceOne,btnChoiceTwo,fnBtnOne,fnBtnTwo){
                title = fillInTitleIfEmpty(title);
                return $ionicPopup.show({
                    title:title,
                    template:text,
                    subtitle:subtitleTxt,
                    buttons:[
                        {text:btnChoiceOne,onTap:fnBtnOne},
                        {text:btnChoiceTwo,onTap:fnBtnTwo}
                    ]
                });
            }

            function fillInTitleIfEmpty(title){
               return (typeof(title == "undefined"))?"Alert":title;
            }

            return ipaUtil;
        }
})();