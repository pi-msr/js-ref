
(function() {
  'use strict';

  angular
    .module('ipa')
    .constant('IPA_Commands', {
        CMD_ID:0x00, // Requests the device to identity itself by sending its serial ID back e.g. "UB500-0-SFM1-C1004". No Parameter is required for this command. 
        CMD_ECHO:0x01, // This command will asl the device to echo back the data that has been sent with this command. Used for debug purposes.      
        CMD_REG_READ_INFO:0x10, // Gets information about a specified register in the device. Parameters: Register Index.
        CMD_REG_WRITE_VALUE:0x11, // Writes the specified value in device's specified register. Parameters: Register Index, Value.
        CMD_REG_READ_VALUE:0x12,// Gets stored data from a specified register in the device. Parameters: Register Index.      
        CMD_REBOOT:0x20,// Reboot's the device. No Param is required.
        CMD_DO_MEASURE:0x30,// Starts a single measurement.
        CMD_DO_SEQUENCE:0x31,//Start a frequency sweep sequence.
        CMD_DO_ADC_HIGH_SPEED_TEST:0x32, //Triggers a built in test on the High Speed ADC. (See the mentioned document)
        CMD_DO_CANCEL_SWEEP:0x33,// Cancels currently executing sweep measurement.
        CMD_DO_SAVE_CALIBRATION:0x35,// Saves the calibration table that is currently in device RAM to the device Flash. This will overwrite the table that is currently stored in FLASH.
        CMD_DO_LOAD_CALIBRATION:0x36,// Loads the calibration table that is currently in device flash into device RAM. This will overwrite any table that is currently in RAM.
        CMD_DO_CALIBRATION:0x40, // Starts a calibration sequence
        CMD_CALIBRATION_REGENERATE_FAKE_TABLE: 0x41, // Regenerates simulation calibration tables. These are used for verification.
        CMD_DO_TEST_SWEEP: 0x50,// Triggers a test sweep measurement.
        CMD_DO_ELECTRODE_CHECK: 0x51,  // Checks electrodes connection.
        CMD_CLEAR_ALL_EXCEPTIONS:0x52, //Clears Global_Exception_Register.
        CMD_DO_SELF_CHECK_TEST:0x55 //Performs self check functions.
    })
    .constant('IPA_Constants',{
        COMMS_PACKET_MAX_LEN:9000,
        BT_BLE:'bluetooth_ble',
        BT_SERIAL:'bluetooth_serial',
        IPA_BT_TIMEOUT:8, // 8 seonds (x1000 for ms)
        IPA_EXECUTION_DELAY:10,//10ms
        IPA_PACKET_DELAY:200 // response delay of 200 ms as per the document 0-SFP1-SPB-2.0
    })
    .constant('REG_Indexes',{
        MAX_POSSIBLE_REG_NUMBER:500,
        MAX_POSSIBLE_REG_INDEX:499 //max possible index = MAX_POSSIBLE_REG_NUMBER - 1
    });

})();
