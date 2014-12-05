/**
 * Created by theowinter on 05/12/14.
 */

//Example for the revealing module pattern in node:
module.exports = function () {
    "use strict";
    var logEnabled = true;

    function publicEnableLog(option) {
        logEnabled = option;
    }

    function publicLog(message) {
        if (logEnabled) {
            console.log(message);
        }
    }

    //Reveal functions and variables
    return {
        enableLog: publicEnableLog,
        log: publicLog
    };

};