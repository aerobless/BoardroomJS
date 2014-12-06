/**
 * Created by theowinter on 05/12/14.
 */

window.onload = function () {
    "use strict";
    $(".pick-a-color").pickAColor({
        showSpectrum            : true,
        showSavedColors         : true,
        saveColorsPerElement    : false,
        fadeMenuToggle          : true,
        showHexInput            : false,
        showBasicColors         : true,
        allowBlank              : false,
        inlineDropdown          : true
    });
};