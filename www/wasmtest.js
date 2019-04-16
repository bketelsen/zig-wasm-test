const importObject = {
  env: {
    debug: function debug(value) {
      console.log(value);
    },
    trace: function trace(byteOffset, len) {
      console.log(byteOffset);
      var s = '';
      var a = new Uint8Array(memory.buffer);
      for (var i = byteOffset; i < len; i++) {
        s += String.fromCharCode(a[i]);
      }
      document.write(s);
    }
  },
}

function output(byteOffset) {
  console.log(byteOffset);
  var s = '';
  var a = new Uint8Array(memory.buffer);
  for (var i = byteOffset; a[i]; i++) {
    s += String.fromCharCode(a[i]);
  }
  return s;
}

function addElement(parentId, elementTag, elementId, html) {
// Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = output(html);
    p.appendChild(newElement);
}


var instance;
var exports;
var memory;
fetch("wasmtest.wasm")
  .then(function (response) {
    return response.arrayBuffer();
  })
  .then(function (bytes) {
    return WebAssembly.instantiate(bytes, importObject);
  })
  .then(function (results) {
    instance = results.instance;
    exports = instance.exports;
    memory = exports.memory;
    addElement("zig", "div","hello",results.instance.exports.hello());
    //output(results.instance.exports.goodbye());
    console.log(results.instance.exports.add(2, 3));
    console.log(results.instance.exports.add(3, 4));
  });