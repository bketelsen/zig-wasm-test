const importObject = {env: {
    trace: function trace(byteOffset, len) {
    console.log(byteOffset);
      var s = '';
      var a = new Uint8Array(memory.buffer);
    for (var i = byteOffset; i<byteOffset+len; i++) {
        s += String.fromCharCode(a[i]);
    }

        s += String.fromCharCode(13);
      document.write(s);
    }
},
}

var instance;
var exports;
var memory;
fetch("wasmtest.wasm")
    .then(function (response) { return response.arrayBuffer(); })
    .then(function (bytes) { return WebAssembly.instantiate(bytes, importObject); })
    .then(function (results) {
        instance = results.instance;
        exports = instance.exports;
        memory = exports.memory;
        results.instance.exports.hello();
        results.instance.exports.goodbye();
        console.log(results.instance.exports.add(2,3));
        console.log(results.instance.exports.add(3, 4));
    });
