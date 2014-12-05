/**
 * Created by theowinter on 05/12/14.
 */
var path;
var data; //debugging / test
var socket = io();

var textItem = new PointText(new Point(20, 30));
textItem.fillColor = 'black';
textItem.content = 'Click and drag to draw a line.';

function onMouseDown(event) {
    socket.emit("mouseDown");
    mouseDown();
}
function mouseDown() {
    // If we produced a path before, deselect it:
    if (path) {
        path.selected = false;
    }

    path = new Path();
    path.strokeColor = 'black';

    // Select the path, so we can see its segment points:
    path.fullySelected = true;
}

function onMouseDrag(event) {
    mouseDrag(event.point);
    socket.emit("mouseDrag", event.point);
}

function mouseDrag(eventPoint) {
    // Every drag event, add a point to the path at the current
    // position of the mouse:
    path.add(eventPoint);
    textItem.content = 'Segment count: ' + path.segments.length;
}

function onMouseUp(event) {
    socket.emit("mouseUp");
    mouseUp();
}

function mouseUp(event){
    var segmentCount = path.segments.length;

    // When the mouse is released, simplify it:
    path.simplify();

    // Select the path, so we can see its segments:
    path.selected = true;

    var newSegmentCount = path.segments.length;
    var difference = segmentCount - newSegmentCount;
    var percentage = 100 - Math.round(newSegmentCount / segmentCount * 100);
    textItem.content = difference + ' of the ' + segmentCount + ' segments were removed. Saving ' + percentage + '%';
}

document.getElementById("saveButton").onclick = function () {
    /*alert("save in progress");
    var data = path.exportJSON();
    download("test.txt", data);
    return false;*/
    data = path.exportJSON();
    project.activeLayer.remove();
    //var layer = new Layer();
};

document.getElementById("loadButton").onclick = function () {
    /*alert("save in progress");
     var data = path.exportJSON();
     download("test.txt", data);
     return false;*/
    path.importJSON(data);
    var group = new Group();
    group.addChild(path);
    //var layer = new Layer();
};

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    pom.click();
}

socket.on('mouseDown', function (msg) {
    console.log("mouseDown");
    mouseDown();
});

socket.on('mouseDrag', function (msg) {
    console.log("mouseDrag");
    mouseDrag(msg);
});

socket.on('mouseUp', function (msg) {
    console.log("mouseUp");
    mouseUp();
});