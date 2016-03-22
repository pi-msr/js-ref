(function() {
    'use strict';

    angular
        .module('ipa')
        .controller('SettingsController',SettingsController);

         /* @ngInject */
        function SettingsController($log,btHelper,$ionicPlatform,packetBuilder,IPA_Commands,ipaUtil,appState) {

            var vm = this;
                vm.creationDate = 1449548491092;
                vm.availableBtdevices = []; 
                vm.selectedDevice;
                vm.isDeviceConnected = false;
                vm.devivceConnStatus = "disconnected";
                vm.cmdList = [];
                vm.selectedCmd;
                vm.payLoadText;

                activate();

                function activate(){
                    vm.isDevice = !$ionicPlatform.is('browser');
                    ipaUtil.showProgressDialog("Initializing...",1);                   
                    listBtdevices();
                    listCmds();
                    $log.debug("Setting Controller Activated",vm.isDeviceConnected);
                }

                function listCmds(){                    
                    vm.cmdList = btHelper.listTestCmds();                    
                }

                function setConsoleText(text){                    
                    document.getElementById('console').innerHTML ="";                 
                    document.getElementById('console').innerHTML = document.getElementById('console').innerHTML.replace('',text);
                }
                
                function listBtdevices(){ 
                    if(vm.isDevice){
                        btHelper.list().then(function(result){
                            $log.debug("Found the Device List",angular.toJson(result,true));                          
                            vm.availableBtdevices = result;
                        },function(error){
                            $log.error("Error in Listing the Bluetooth devices ",error);
                        });
                    }
                    else{
                        $log.debug("Adding sample devices for brower mode");

                        //sample devices for bt serial
                        vm.availableBtdevices.push({"id": "00:07:80:50:C5:B5","name": "UB500-A05120006","address": "00:07:80:50:C5:B5"});
                        vm.availableBtdevices.push({"id": "00:07:80:50:C5:A9","name": "UB500-A05120005","address": "00:07:80:50:C5:A9"});
                    }                                   
                    
                }

               
                vm.emptyPayLoad = function(){                  
                    vm.payLoadText="";                                    
                }

                vm.connectToDevice = function(){                   
                    $log.info("Trying to Connect to the Device - ",vm.selectedDevice);
                    ipaUtil.showProgressDialog("Connecting...");
                    btHelper.connect({address:vm.selectedDevice}).then(function(result){
                        $log.debug(result);
                        ipaUtil.showAlert(result);
                        vm.devivceConnStatus = "connected"; //update UI
                        vm.isDeviceConnected = true; 
                        appState.connectedDevice = {address:vm.selectedDevice};
                        ipaUtil.hideProgressDialog();
                    },function(error){
                        $log.error(error);
                        ipaUtil.hideProgressDialog();
                        ipaUtil.showAlert(error);
                    });
                }

                vm.writeToDevice = function(){
                    $log.info("Writing to Device - ",vm.selectedDevice);
                    var packet = packetBuilder.buildPacketForCmd(vm.selectedCmd,vm.payLoadText,false);//sending string data.to be encoded at packet builder
                    $log.debug("Sending Packet",angular.toJson(packet,true));
                    btHelper.sendPacket(packet).then(function(result){
                        ipaUtil.showAlert("Data write successfull");
                        $log.debug(result);                        
                    },function(error){
                        $log.error(error);
                         ipaUtil.showAlert("error in writing data");                          
                    });
                } 

                vm.checkDataAvailability = function(){   
                    $log.debug("Aquiring the number of bytes available to read");
                     ipaUtil.showProgressDialog("Checking...");
                    btHelper.checkAvilableData().then(function(numBytes){
                        $log.log("Bytes Available to be Read",numBytes);
                        ipaUtil.hideProgressDialog();
                        ipaUtil.showAlert(numBytes,"Bytes Available to be Read");    
                    },function(error){
                        $log.debug(error);
                        ipaUtil.hideProgressDialog(); 
                        ipaUtil.showAlert(error); 
                    });     
                }

                vm.readFromDevice = function(){   
                    $log.info("Reading from Device - ",vm.selectedDevice);
                    ipaUtil.showProgressDialog("Reading...");
                    btHelper.readPacket().then(function(result){                      
                        $log.log(result);
                        ipaUtil.hideProgressDialog(); 
                        setConsoleText(result);                      
                    },function(error){
                        $log.debug(error);
                        ipaUtil.hideProgressDialog(); 
                        ipaUtil.showAlert(error);                       
                    }); 
                }

                vm.diconnectFromDevice = function(){
                    if(vm.isDeviceConnected){
                        btHelper.close().then(function(){
                            vm.devivceConnStatus = "disconnected";                           
                            vm.isDeviceConnected = false; //connect device enabled
                            ipaUtil.showAlert("successfully disconnected from the device");
                        },function(){
                            ipaUtil.showAlert("unable to disconnect to device.please try again shortly");
                        });
                    } 
                } 



              
        }
})();
