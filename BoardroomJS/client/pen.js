/**
 * Created by theowinter on 06/12/14.
 */

//Revealing module pattern with constructor
var Pen = (function () {
    "use strict";

    //private properties
    var Constructor,
        color = "black",
        thickness = 1,
        smooth = true,
        simplify = true;

    //Constructor:
    Constructor = function (color, thickness, smooth, simplify) {
        this.color = color;
        this.thickness = thickness;
        this.smooth = smooth;
        this.simplify = simplify;
        this.toString = this.toString();
    };

    Constructor.prototype =  {
        constructor: Pen,
        color: color,
        thickness: thickness,
        smooth: smooth,
        simplify: simplify,
        toString: function () {
            return "Color: " + this.color + "  Thickness: " + this.thickness + "  Smooth: " + this.smooth + "  Simplify " + this.simplify;
        }
    };
    return Constructor;
}());