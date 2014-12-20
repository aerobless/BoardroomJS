/**
 * Created by theowinter on 05/12/14.
 */
var socket = io();

//Drawing data:
var path;
var pen = new Pen("black", 1, 100, true, true, false, "Round");

//Restricting the resolution, ideal for iPad & Beamer-Combo
$("#canvas").attr("width", "1024px");
$("#canvas").attr("height", "768px");

function onMouseDown(event) {
    var message = {event: event.point, pen: pen};
    socket.emit("mouseDown", message);
    mouseDown(event.point);
}

function mouseDown(eventPoint) {
    path = new Path();
    path.strokeColor = pen.color;
    path.strokeWidth = pen.thickness;
    path.strokeCap = pen.strokeCap;
    path.reduce();

    if (pen.dashed) {
        path.dashArray = [10, 12];
    } else {
        path.dashArray = null;
    }
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

    //Rendering the canvas down to a pixelated image.
    renderUpdate();
}

function save() {
    var save = project.activeLayer.exportJSON(),
        message = {save: save, pen: pen};
    socket.emit("saveStatus", message);
}

function renderUpdate() {
    var image = canvas.toDataURL();

    project.clear();
    view.draw();

    var raster = new Raster({
        source: image,
        position: view.center
    });
    view.draw();
}

function download(filename, file) {
    var pom = document.createElement('a');
    pom.href = file;
    pom.download = filename;
    pom.click();
}

//Listeners:
document.getElementById("undoButton").onclick = function () {
   socket.emit("undo");
};

document.getElementById("clearButton").onclick = function () {
    socket.emit("clearCanvas");
    project.clear();
    renderUpdate();
};

document.getElementById("saveButton").onclick = function () {
    download("img.png", canvas.toDataURL("image/png"));
};

document.getElementById("savePenButton").onclick = function () {
    var color = document.getElementById("penColorPicker").value,
        stroke = document.getElementById("thicknessSettingSpinner").value,
        transparency = document.getElementById("transparencySettingSpinner").value,
        smooth = document.getElementById("optionSettings-0").checked,
        simplify = document.getElementById("optionSettings-1").checked,
        dashed = document.getElementById("dashed-option").checked,
        strokeCap;

    if (document.getElementById("capSetting-0").checked) {
        strokeCap = "round";
    } else if (document.getElementById("capSetting-1").checked) {
        strokeCap = "square";
    } else if (document.getElementById("capSetting-2").checked) {
        strokeCap = "butt";
    }
    pen = new Pen("#" + color, stroke, transparency, smooth, simplify, dashed, strokeCap);
    console.log(pen.toString);
};

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
    if (typeof msg.save !== "undefined" && typeof msg.pen !== "undefined") {
        project.activeLayer.importJSON(msg.save);
        pen = msg.pen;
        view.draw();
        renderUpdate();
    }
});

socket.on('undo', function (msg) {
    project.clear();
    if (msg !== null) {
        project.activeLayer.importJSON(msg);
        view.draw();
        renderUpdate();
    }
    view.draw();
});