/**
 * Created by theowinter on 05/12/14.
 */
var socket = io();

//Drawing data:
var path;
var pen = new Pen('red', 1, false, false);

function onMouseDown(event) {
    var message = {event: event.point, pen: pen};
    socket.emit("mouseDown", message);
    mouseDown(event.point);
}

function mouseDown(eventPoint) {
    path = new Path();
    path.strokeColor = pen.color;
    path.add(eventPoint);
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

    //The client which drew the last line triggers the server to save.
    save();
}

function mouseUp() {
    // When the mouse is released, simplify it:
    if (pen.smooth) {
        path.smooth();
    }
    if (pen.simplify) {
        path.simplify();
    }
}

function save(){
    var save = project.activeLayer.exportJSON();
    socket.emit("saveStatus", save);
}

//Listeners:
document.getElementById("undoButton").onclick = function () {
   socket.emit("undo");
};

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


//Sockets:
socket.on('mouseDown', function (msg) {
    pen = msg.pen;
    mouseDown(new Point(msg.event[1], msg.event[2]));
    view.draw();
});

socket.on('mouseDrag', function (msg) {
    mouseDrag(new Point(msg[1], msg[2]));
    view.draw();
});

socket.on('mouseUp', function (msg) {
    mouseUp();
    view.draw();
});

socket.on('clearCanvas', function (msg) {
    project.clear();
    view.draw();
});

socket.on('initalData', function (msg) {
    if (msg !== null) {
        project.activeLayer.importJSON(msg);
        view.draw();
    }
});

socket.on('undo', function (msg) {
    project.clear();
    if (msg !== null) {
        project.activeLayer.importJSON(msg);
    }
    view.draw();
});