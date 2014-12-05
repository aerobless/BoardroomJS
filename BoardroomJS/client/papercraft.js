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
    // If we produced a path before, deselect it:
    /*if (path) {
        path.selected = false;
    }*/

    path = new Path();
    path.strokeColor = 'black';

    // Select the path, so we can see its segment points:
   // path.fullySelected = true;
}

function onMouseDrag(event) {
    console.log(event);
    mouseDrag(event.point);
    socket.emit("mouseDrag", event.point);
}

function mouseDrag(eventPoint) {
    // Every drag event, add a point to the path at the current
    // position of the mouse:
    path.add(eventPoint);
    console.log(path.index);
}

function onMouseUp(event) {
    //socket.emit("mouseUp");
   // mouseUp();
}

function mouseUp(event){
    // When the mouse is released, simplify it:
   // path.simplify();

    // Select the path, so we can see its segments:
    //path.selected = true;

    //console.log(project.activeLayer);
}

document.getElementById("saveButton").onclick = function () {
   // alert("save in progress");
    //var data = path.exportJSON();
    //download("test.txt", data);
   // return false;
   // data = path.exportJSON();
   // project.activeLayer.remove();
    //var layer = new Layer();

    var circlePath = new Path.Circle(new Point(50, 50), 25);
    circlePath.strokeColor = 'black';

};
/*
document.getElementById("loadButton").onclick = function () {
    alert("save in progress");
     var data = path.exportJSON();
     download("test.txt", data);
     return false;
    path.importJSON(data);
    var group = new Group();
    group.addChild(path);
    //var layer = new Layer();
};
*/

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
    mouseDrag(new Point( msg[1], msg[2] ));
    view.draw();
});

socket.on('mouseUp', function (msg) {
    console.log("mouseUp");
    mouseUp();
});