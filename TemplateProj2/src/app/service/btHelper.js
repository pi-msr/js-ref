(function() {
    'use strict';

    angular
        .module('ipa')
        .factory("btHelper", btHelper);

        /* @ngInject */
        function btHelper($log,IPA_Constants,IPA_Commands,$cordovaBLE,$cordovaBluetoothSerial,$q,$ionicPlatform,$interval,$timeout) {

            var self = this;
                self.btMode = IPA_Constants.BT_SERIAL;//defaults to serial BT
                self.availableDevices = [];//available devices array
                self.rejectcounter = 0; //rejection counter -for browser simulation only
                self.intervalPromise;//interval promise
                self.isConnected = false;//connected flag               

            var btHelper = {}; 

            //sets the BT Mode to Connect
            btHelper.setType = function(btType){  
                self.btMode = btType;
            }

            //listingn test commands
            btHelper.listTestCmds = function(){
                var cmdArr = [
                    {cmdname:"CMD_ID",cmdval:0x00},
                    {cmdname:"CMD_ECHO",cmdval:0x01},                  
                    {cmdname:"CMD_REBOOT",cmdval:0x20},
                    {cmdname:"CMD_DO_SELF_CHECK_TEST",cmdval:0x55}
                    ];

                return cmdArr;
            }

            //checks the avaliability of bytes
            btHelper.checkAvilableData = function(){
                var q = $q.defer();
                var isByteCheckComplete=false;
                if(self.btMode == IPA_Constants.BT_SERIAL){

                    $timeout(function(){
                            if(!isByteCheckComplete){ 
                                $interval.cancel(self.intervalPromise);
                                q.reject("Check Data timeout Exceeded.Try again shortly");       
                            }
                    },(IPA_Constants.IPA_BT_TIMEOUT*1000));//8 second read delay

                    self.intervalPromise = $interval(function(){
                        $log.debug("Re-trying check bytes..."); //test code only for debug   
                        $cordovaBluetoothSerial.available(function(numBytes){
                        isByteCheckComplete = true;    
                        $interval.cancel(self.intervalPromise);                   
                        q.resolve(numBytes);
                    });
                        
                    },IPA_Constants.IPA_PACKET_DELAY);
                 
                }
                else if(self.btMode == IPA_Constants.BLE){                  
                    q.reject("BLE available data function not yet implemented");
                }
                else{
                    q.reject("Unable to check data availability,BT type not specified");
                }

                return q.promise;
            }

            //connect to device
            btHelper.connect = function(device){
                var q = $q.defer();                

                if($ionicPlatform.is('browser')){                    
                  
                    //simulation code for the browser
                    $timeout(function(){
                            if(!self.isConnected){ 
                                $interval.cancel(self.intervalPromise);
                                q.reject("Cannot Connect to BT from Browser");       
                            }
                        },(1000));//1 seonds for browser ONLY
                
                }
                else{
                    
                    if(self.btMode == IPA_Constants.BT_SERIAL){
                        $timeout(function(){
                            if(!self.isConnected){ 
                                $interval.cancel(self.intervalPromise);
                                q.reject("Connection timeout Exceeded.Try again shortly");       
                            }
                        },(IPA_Constants.IPA_BT_TIMEOUT*1000));

                        self.intervalPromise = $interval(function(){
                                                $log.debug("Re-trying connection..."); //test code only for debug                                              
                                                $cordovaBluetoothSerial.connect(device.address).then(function(){ 
                                                    self.isConnected = true;
                                                    $interval.cancel(self.intervalPromise);
                                                    q.resolve("Successully Connected to Device");  
                                                });                                                                     
                                    },IPA_Constants.IPA_EXECUTION_DELAY);//re-try connection evety 10ms  till given timeout
                    }
                    else if(self.btMode == IPA_Constants.BT_BLE){
                        $log.warn("BLE connect function not yet implemented");
                        q.reject();
                    }              
                    else{
                        q.reject();
                        $log.error("Unable to close connection,BT type not specified");
                    }
                }
                return q.promise;
            }

            //disconnects from device
            btHelper.close = function(){
                var q = $q.defer();
                if(self.btMode == IPA_Constants.BT_SERIAL){
                     $cordovaBluetoothSerial.disconnect().then(function(){
                        $log.debug("Successully Disconnected From Device");
                         self.isConnected=false;
                        q.resolve();
                    },function(error){                       
                        $log.error(error);                        
                        q.reject(error);
                    });
                }
                else if(self.btMode == IPA_Constants.BT_BLE){
                    $log.warn("BLE disconnect function not yet implemented");
                }
                else{
                    $log.error("Unable to close connection,BT type not specified");
                }

                return q.promise;

            }


            //sends a packet
            btHelper.sendPacket = function(packet){
                var q = $q.defer();               
                if(self.btMode == IPA_Constants.BT_SERIAL){
                    $cordovaBluetoothSerial.write(packet).then(function(){                            
                        q.resolve("data write successfull");                           
                    },function(error){ 
                        q.reject(error);
                    });                                                                   
                }
                else if(self.btMode == IPA_Constants.BT_BLE){
                     q.reject("sendPacket not yet implemented for BLE");
                }
                else{
                    q.reject("Bluetooth Type not set or Invalid Bluetooth type.");
                }

                return q.promise;
            }

            //reads a packet
            btHelper.readPacket = function(){
                var q = $q.defer();
                var isReadComplete=false;               
                if(self.btMode == IPA_Constants.BT_SERIAL){

                    $timeout(function(){
                            if(!isReadComplete){ 
                                $interval.cancel(self.intervalPromise);
                                q.reject("Read timeout Exceeded.Try again shortly");       
                            }
                    },(IPA_Constants.IPA_BT_TIMEOUT*1000));

                    self.intervalPromise = $interval(function(){
                        $log.debug("Re-trying read..."); //test code only for debug   
                        $cordovaBluetoothSerial.read().then(function(result){
                            $log.log("read result -> ",result);
                            if(result){
                                isReadComplete = true;
                                $interval.cancel(self.intervalPromise);
                                q.resolve(result);
                            }
                        });

                    },IPA_Constants.IPA_PACKET_DELAY);

                }
                else if(self.btMode == IPA_Constants.BT_BLE){
                     q.reject("readPacket not yet implemented for BLE");
                }
                else{                   
                    q.reject("Bluetooth Type not set or Invalid Bluetooth type.");
                }
                return q.promise;
            }


            //lists available BT devices
            btHelper.list = function(){
                self.availableDevices = self.availableDevices.splice(0,self.availableDevices.length);//empty existing list
                var q = $q.defer();
                if(self.btMode == IPA_Constants.BT_SERIAL){
                    $log.warn("Listing OS Paired Bluetooth Devices ONLY");
                    $cordovaBluetoothSerial.list().then(function(result){ 
                        angular.forEach(result,function(value){                           
                            self.availableDevices.push({id:value.id,name:value.name,address:value.address});
                        });                        
                         q.resolve(self.availableDevices.removeDuplicatesByKey('id'));
                    },function(error){                       
                        q.reject(error);
                    });
                }
                else if(self.btMode == IPA_Constants.BT_BLE){
                    $log.debug("Listing Available Bluetooth BLE Devices");

                    $cordovaBLE.scan([], IPA_Constants.IPA_BT_TIMEOUT).then(null, // will never resolved
                        function() {                            
                            q.reject('BLE scan timeout');                             
                        },
                        function(result) {
                            var value = {id:result.id,name:result.name,address:result.rssi};                                                                                             
                                self.availableDevices.push(value);
                            q.resolve(self.availableDevices.removeDuplicatesByKey('id'));            
                    });
                }
                else{                   
                    q.reject("Bluetooth Type not set or Invalid Bluetooth type.");
                }
                return q.promise;
            }

            return btHelper;
        }
})();