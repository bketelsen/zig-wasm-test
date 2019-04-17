



/*
begin copied from wasm-bindgen
*/

/* tslint:disable */

const __wbg_f_log_log_n_target = console.log;

let cachedDecoder = new TextDecoder('utf-8');

let cachedUint8Memory = null;

function getUint8Memory() {
    if (cachedUint8Memory === null ||
        cachedUint8Memory.buffer !== memory.buffer)
        cachedUint8Memory = new Uint8Array(memory.buffer);
    return cachedUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().slice(ptr, ptr + len));
}

let cachedUint32Memory = null;

function getUint32Memory() {
    if (cachedUint32Memory === null ||
        cachedUint32Memory.buffer !== wasm.memory.buffer)
        cachedUint32Memory = new Uint32Array(wasm.memory.buffer);
    return cachedUint32Memory;
}

let cachedGlobalArgumentPtr = null;

function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null)
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    return cachedGlobalArgumentPtr;
}

function getGlobalArgument(arg) {
    const idx = globalArgumentPtr() / 4 + arg;
    return getUint32Memory()[idx];
}

function __wbg_f_log_log_n(arg0) {
    let len0 = getGlobalArgument(0);
    let v0 = getStringFromWasm(arg0, len0);
    __wbg_f_log_log_n_target(v0);
}

function passArray8ToWasm(arg) {
    const ptr = wasm.__wbindgen_malloc(arg.length);
    getUint8Memory().set(arg, ptr);
    return [ptr, arg.length];
}

function setGlobalArgument(arg, i) {
    const idx = globalArgumentPtr() / 4 + i;
    getUint32Memory()[idx] = arg;
}

function bincode_to_json(arg0) {
    const [ptr0, len0] = passArray8ToWasm(arg0);
    setGlobalArgument(len0, 0);
    const ret = wasm.bincode_to_json(ptr0);
    const len = getGlobalArgument(0);
    const realRet = getStringFromWasm(ret, len);
    wasm.__wbindgen_free(ret, len * 1);
    return realRet;
}

let cachedEncoder = new TextEncoder('utf-8');

function passStringToWasm(arg) {
    const buf = cachedEncoder.encode(arg);
    const ptr = exports.getStringPointer(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}

function getArrayU8FromWasm(ptr, len) {
    const mem = getUint8Memory();
    const slice = mem.slice(ptr, ptr + len);
    return new Uint8Array(slice);
}

function get_add_message(arg0) {
    const [ptr0, len0] = passStringToWasm(arg0);
    setGlobalArgument(len0, 0);
    const ret = wasm.get_add_message(ptr0);
    const len = getGlobalArgument(0);
    const realRet = getArrayU8FromWasm(ret, len);
    wasm.__wbindgen_free(ret, len * 1);
    return realRet;
}

function get_update_message(arg0, arg1, arg2) {
    const [ptr2, len2] = passStringToWasm(arg2);
    setGlobalArgument(len2, 0);
    const ret = wasm.get_update_message(arg0, arg1 ? 1 : 0, ptr2);
    const len = getGlobalArgument(0);
    const realRet = getArrayU8FromWasm(ret, len);
    wasm.__wbindgen_free(ret, len * 1);
    return realRet;
}

function get_remove_message(arg0, arg1, arg2) {
    const [ptr2, len2] = passStringToWasm(arg2);
    setGlobalArgument(len2, 0);
    const ret = wasm.get_remove_message(arg0, arg1 ? 1 : 0, ptr2);
    const len = getGlobalArgument(0);
    const realRet = getArrayU8FromWasm(ret, len);
    wasm.__wbindgen_free(ret, len * 1);
    return realRet;
}

let slab = [];

let slab_next = 0;

function addHeapObject(obj) {
    if (slab_next === slab.length)
        slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];

    slab_next = next;

    slab[idx] = {
        obj,
        cnt: 1
    };
    return idx << 1;
}

let stack = [];

function getObject(idx) {
    if ((idx & 1) === 1) {
        return stack[idx >> 1];
    } else {
        const val = slab[idx >> 1];
        return val.obj;
    }
}

function __wbindgen_object_clone_ref(idx) {
    // If this object is on the stack promote it to the heap.
    if ((idx & 1) === 1)
        return addHeapObject(getObject(idx));

    // Otherwise if the object is on the heap just bump the
    // refcount and move on
    const val = slab[idx >> 1];
    val.cnt += 1;
    return idx;
}

function dropRef(idx) {

    let obj = slab[idx >> 1];

    obj.cnt -= 1;
    if (obj.cnt > 0)
        return;

    // If we hit 0 then free up our space in the slab
    slab[idx >> 1] = slab_next;
    slab_next = idx >> 1;
}

function __wbindgen_object_drop_ref(i) {
    dropRef(i);
}

function __wbindgen_string_new(p, l) {
    return addHeapObject(getStringFromWasm(p, l));
}

function __wbindgen_number_new(i) {
    return addHeapObject(i);
}

function __wbindgen_number_get(n, invalid) {
    let obj = getObject(n);
    if (typeof (obj) === 'number')
        return obj;
    getUint8Memory()[invalid] = 1;
    return 0;
}

function __wbindgen_undefined_new() {
    return addHeapObject(undefined);
}

function __wbindgen_null_new() {
    return addHeapObject(null);
}

function __wbindgen_is_null(idx) {
    return getObject(idx) === null ? 1 : 0;
}

function __wbindgen_is_undefined(idx) {
    return getObject(idx) === undefined ? 1 : 0;
}

function __wbindgen_boolean_new(v) {
    return addHeapObject(v === 1);
}

function __wbindgen_boolean_get(i) {
    let v = getObject(i);
    if (typeof (v) === 'boolean') {
        return v ? 1 : 0;
    } else {
        return 2;
    }
}

function __wbindgen_symbol_new(ptr, len) {
    let a;
    if (ptr === 0) {
        a = Symbol();
    } else {
        a = Symbol(getStringFromWasm(ptr, len));
    }
    return addHeapObject(a);
}

function __wbindgen_is_symbol(i) {
    return typeof (getObject(i)) === 'symbol' ? 1 : 0;
}

function __wbindgen_string_get(i, len_ptr) {
    let obj = getObject(i);
    if (typeof (obj) !== 'string')
        return 0;
    const [ptr, len] = passStringToWasm(obj);
    getUint32Memory()[len_ptr / 4] = len;
    return ptr;
}

function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

/*
end copied from wasm-bindgen
*/

function etrue(arg0) {
    const idx0 = addHeapObject(arg0);
    const ret = exports.etruth(idx0);
    return ret;
}

function estringLength(arg0) {
    [p,l] = passStringToWasm(arg0);
    const ret = exports.stringLengthIsFive(p,l);
    return ret;
}

const importObject = {
    env: {
        __wbindgen_boolean_get: __wbindgen_boolean_get,
        getObject: getObject,
        __wbindgen_boolean_new: __wbindgen_boolean_new,
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
        console.log("False: ", !!etrue(false));
        console.log("True:", !!etrue(true));
        console.log("brian is 5 characters:", !!estringLength("brian"));
        console.log("brian ketelsen is 5 characters:", !!estringLength("brian ketelsen"));
    });