"use strict";

var b = document.querySelector('button.button-no');
b.addEventListener("mouseover", moveHover);

function moveHover() {
  var i = Math.floor(Math.random() * 500) + 1;
  var j = Math.floor(Math.random() * 500) + 1;
  b.style.left = i + "px";
  b.style.top = j + "px";
}
//# sourceMappingURL=app.dev.js.map
