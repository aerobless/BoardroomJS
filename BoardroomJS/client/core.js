/**
 * Created by theowinter on 05/12/14.
 */

window.onload = function () {
    "use strict";
    //Setup socket.io
    var socket = io();
    socket.on('message', function (msg) {
        if (msg.action === "AddLink") {
            showAlert("A new link has been published.");
        } else if (msg.action === "Rated") {
            showAlert("A link has been rated.");
        } else if (msg.action === "AddComment"){
            showAlert("A comment has been added.");
        }
    });

};