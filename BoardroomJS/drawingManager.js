/**
 * Created by theowinter on 05/12/14.
 */

module.exports = function () {
    "use strict";
    var stack = [];

    function push(drawing) {
        stack.push(drawing);
    }

    function pop() {
        return stack.pop();
    }

    function getLast() {
        return stack[(stack.length - 1)];
    }

    function clear() {
        stack = [];
    }

    //Reveal functions and variables
    return {
        push: push,
        pop: pop,
        getLast: getLast,
        clear: clear
    };
};