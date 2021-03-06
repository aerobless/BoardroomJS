/**
 * Created by theowinter on 05/12/14.
 */

window.onload = function () {
    "use strict";
    $(".pick-a-color").pickAColor({
        showSpectrum            : false,
        showSavedColors         : true,
        saveColorsPerElement    : false,
        fadeMenuToggle          : true,
        showHexInput            : false,
        showBasicColors         : true,
        allowBlank              : false,
        inlineDropdown          : true
    });

    //Bootstrap spinner
    $(document).on('click', '.number-spinner button', function () {
        var btn = $(this),
            oldValue = btn.closest('.number-spinner').find('input').val().trim(),
            newVal = 0;

        if (btn.attr('data-dir') == 'up') {
            newVal = parseInt(oldValue) + 1;
        } else {
            if (oldValue > 1) {
                newVal = parseInt(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        btn.closest('.number-spinner').find('input').val(newVal);
    });

    $(".dropdown-menu li a").click(function(){
        $(this).parents(".input-group-btn").find('.btn').text($(this).text());
        $(this).parents(".input-group-btn").find('.btn').val($(this).text());
    });
};