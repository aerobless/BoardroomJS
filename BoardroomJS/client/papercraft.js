/**
 * Created by theowinter on 05/12/14.
 */
var path;
var data;

var textItem = new PointText(new Point(20, 30));
textItem.fillColor = 'black';
textItem.content = 'Click and drag to draw a line.';

function onMouseDown(event) {
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
    // Every drag event, add a point to the path at the current
    // position of the mouse:
    path.add(event.point);

    textItem.content = 'Segment count: ' + path.segments.length;
}

function onMouseUp(event) {
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