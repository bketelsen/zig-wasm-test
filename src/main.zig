const std = @import("std");

const nanHead = 0x7FF80000;
const valueUndefined = Value.init(0);
const valueNaN       = predefValue(0);
const valueZero      = predefValue(1);
const valueNull      = predefValue(2);
const valueTrue      = predefValue(3);
const valueFalse     = predefValue(4);
const valueGlobal    = predefValue(5);
const memory         = predefValue(6); // WebAssembly linear memory

const Value = struct {
  ref: u64,
  pub fn init(i: u64) Value {
    return Value {
      .ref= i,
    };
  }
};

fn predefinedValue(id: uint32) Value {
  return Value {
    .ref=nanHead<<32 | id
  };
}


extern fn trace(usize,i32) void;

export fn hello() void {
  const h = "hello from zig!";
  trace(@ptrToInt(&h), h.len);
}

export fn goodbye() void {
  const h = "goodbye wasm world...";
  trace(@ptrToInt(&h), h.len);
}
export fn add(a: i32, b: i32) i32 {
    return a + b;
}

