/**
 * Created by theowinter on 05/12/14.
 */
var path;
var data; //debugging / test
var socket = io();

function onMouseDown(event) {
    socket.emit("mouseDown");
    mouseDown();
}
function mouseDown() {
    path = new Path();
    path.strokeColor = 'black';
}

function onMouseDrag(event) {
    mouseDrag(event.point);
    socket.emit("mouseDrag", event.point);
}

function mouseDrag(eventPoint) {
    // Every drag event, add a point to the path at the current
    // position of the mouse:
    path.add(eventPoint);
}

function onMouseUp(event) {
    socket.emit("mouseUp");
    mouseUp();
}

function mouseUp(event){
    // When the mouse is released, simplify it:
    path.smooth();
    path.simplify();
}

document.getElementById("clearButton").onclick = function () {
    socket.emit("clearCanvas");
    project.clear();
};

document.getElementById("saveButton").onclick = function () {
    download("img.png", canvas.toDataURL("image/png"));
};

function download(filename, file) {
    var pom = document.createElement('a');
    pom.href = file;
    pom.download = filename;
    pom.click();
}

socket.on('mouseDown', function (msg) {
    mouseDown();
    view.draw();
});

socket.on('mouseDrag', function (msg) {
    mouseDrag(new Point( msg[1], msg[2] ));
    view.draw();
});

socket.on('mouseUp', function (msg) {
    mouseUp();
    view.draw();
});

socket.on('clearCanvas', function (msg) {
    console.log("dddd");
    project.clear();
    view.draw();
});