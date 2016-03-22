(function() {
    'use strict';

    angular
        .module('ipa')
        .factory("ipaDll", ipaDll);

        /* @ngInject */
        function ipaDll($log,REG_Indexes,$q,packetBuilder,appState,btHelper,IPA_Commands,ipaUtil) {

            var deviceInfoNumRegisters=0;
            var regValues = [];

            var ipaDll = {};

            ipaDll.readRegister = function(regIndex){
                $log.info("Tring to read the register of the connected device - ",angular.toJson(appState.connectedDevice,true));
                var q = $q.defer();

                if(isValidRegisterIndex(regIndex)){
                    $log.debug("Register Index Valid");
                    
                    //Creating Packet Data
                    var data = new Uint8Array(2);
                        data[0] = ((regIndex >> 8) && 0xFF);
                        data[1] = (regIndex & 0xFF);

                    var packet = packetBuilder.buildPacketForCmd(IPA_Commands.CMD_REG_READ_INFO,data,true);//sending binary data
                        btHelper.sendPacket(packet).then(function(result){
                            ipaUtil.showAlert(result);
                        },function(error){
                            ipaUtil.showAlert(error);
                        });
                }
                else{
                    $log.error("Register Index Not Valid");
                    q.reject("Register Index Not Valid");
                }

                return q.promise;
            }  

            //check if a given register index is a valid index
            function isValidRegisterIndex(regIndex){

                if(regIndex<0){
                    return false;
                }

                if(regIndex > REG_Indexes.MAX_POSSIBLE_REG_INDEX){
                    return false;
                }

                if(deviceInfoNumRegisters <=0){
                    if(regIndex > 2){
                        return false;
                    }
                }

                else if(regIndex >= regValues.length){
                    return false;
                }
                return true;
            }

            return ipaDll;
        }
})();