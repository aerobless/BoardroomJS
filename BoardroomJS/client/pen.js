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
        transparency = 100,
        smooth = true,
        simplify = true,
        dashed = false,
        strokeCap = "round";

    //Constructor:
    Constructor = function (color, thickness, transparency, smooth, simplify, dashed, strokeCap) {
        this.color = color;
        this.thickness = thickness;
        this.transparency = transparency;
        this.smooth = smooth;
        this.simplify = simplify;
        this.dashed = dashed;
        this.strokeCap = strokeCap;
        this.toString = this.toString();
    };

    Constructor.prototype =  {
        constructor: Pen,
        color: color,
        thickness: thickness,
        transparency: transparency,
        smooth: smooth,
        simplify: simplify,
        dashed: dashed,
        strokeCap: strokeCap,
        toString: function () {
            return "Color: " + this.color + "  Thickness: " + this.thickness + "  Transparency: " + this.transparency +
                "  Smooth: " + this.smooth + "  Simplify: " + this.simplify + "  Dashed: " + this.dashed + "  strokeCap: " + this.strokeCap;
        }
    };
    return Constructor;
}());