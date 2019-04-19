const js = @This();

extern fn valueGet(u64,usize,usize) u64;

pub const nanHead: u64 = 0x7FF80000;

const JSIDX_OFFSET: u32 = 0; // keep in sync with js/mod.rs
const JSIDX_UNDEFINED: u32 = JSIDX_OFFSET + 0;
const JSIDX_NULL: u32 = JSIDX_OFFSET + 1;
const JSIDX_TRUE: u32 = JSIDX_OFFSET + 2;
const JSIDX_FALSE: u32 = JSIDX_OFFSET + 3;
const JSIDX_RESERVED: u32 = JSIDX_OFFSET + 4;

pub const JSValue = struct {
  ref: u64,
  pub fn new(index: u64) JSValue {
    return JSValue{
      .ref = index,
    };
  }
  pub fn jsvalue(self: JSValue) u64 {
    return self.idx;
  }
  pub fn get(self: JSValue, property: []const u8) JSValue {
      return JSValue.new(valueGet(self.ref, @ptrToInt(&property), property.len ));
  }
  pub fn truthy(self: JSValue) bool {
    const r = 0;
    // yes this is not efficient  
    // did it the long way for debugging
    if (r == 0) { return false; }
    if (r == 1) { return true; }
    return false; // TODO
  }
};

pub fn global() JSValue {
    return JSValue.predefined(5);
}

pub fn makeValue(ref: u64) JSValue {

  return JSValue{
    .ref = ref,
  };
}

pub fn floatValue(f: f64) JSValue {
  if (f == 0) {
    return valueZero;
  }
  if (f!=f ) {
    return valueNaN;
  }
  // return Value{ref: *(*ref)(unsafe.Pointer(&f))}
}

pub fn predefValue(index: u64) JSValue {
  const id = nanHead << 32 | index;
  return JSValue.new(id);
}


pub const valueUndefined = JSValue.new(0);
pub const valueNaN = predefValue(0);
pub const valueZero = predefValue(1);
pub const valueNull = predefValue(2);
pub const valueTrue = predefValue(3);
pub const valueFalse = predefValue(4);
pub const valueGlobal = predefValue(5);
pub const memory = predefValue(6); // WebAssembly linear memory
pub const jsZig = predefValue(7); // instance of the Go class in JavaScript

// Undefined returns the JavaScript value "undefined".
pub fn Undefined() JSValue {
  return valueUndefined;
}

// Null returns the JavaScript value "null".
pub fn Null() JSValue {
  return valueNull;
}

// Global returns the JavaScript global object, usually "window" or "global".
pub fn Global() Value {
  return valueGlobal;
}

pub fn truth(b: JSValue) bool {
    return b.truthy();
      
}
