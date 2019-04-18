const std = @import("std");
const mem = @import("std").mem;
extern fn trace(usize,i32) void;
extern fn debug(u32) void;
extern fn runtime_wasmExit(i32) void;


export const JSValue = struct {
  idx: u32,
  fn new(index: u32) JSValue {
    return JSValue{
      .idx = index,
    };
  }
  fn truthy(self: JSValue) bool {
    const r = 0;
    // yes this is not efficient  
    // did it the long way for debugging
    if (r == 0) { return false; }
    if (r == 1) { return true; }
    return false; // TODO
  }
  fn falsevalue() JSValue {
    return JSValue {
    .idx = nanHead << 32 | JSIDX_FALSE,
    };
  }
  fn truevalue() JSValue {
    return JSValue {
    .idx = nanHead << 32 | JSIDX_TRUE, };
  }
};

export fn getStringPointer(l: u32) usize {
  var s: [100]u8 = []u8{0} ** 100;
  const ss = s[0..l];
 return @ptrToInt(&s);
}
const nanHead: u32 = 0x7FF80000;

const JSIDX_OFFSET: u32 = 0; // keep in sync with js/mod.rs
const JSIDX_UNDEFINED: u32 = JSIDX_OFFSET + 0;
const JSIDX_NULL: u32 = JSIDX_OFFSET + 1;
const JSIDX_TRUE: u32 = JSIDX_OFFSET + 2;
const JSIDX_FALSE: u32 = JSIDX_OFFSET + 3;
const JSIDX_RESERVED: u32 = JSIDX_OFFSET + 4;


fn truth(b: JSValue) bool {
    return b.truthy();
      
}

export fn stringLengthIsFive(p: usize, l: u32) bool {
    const ptr = @intToPtr(*[100]u8,p);
    const sl = ptr[0..l];
    return sl.len == 5;

}

export fn run(argc: u32, argv: u32) void {
  var list = std.ArrayList(u32).init(std.heap.wasm_allocator);
  defer list.deinit();

  debug(argc);
  debug(argv);
  runtime_wasmExit(5);
}


// This should be generated
// It's the shim for the JS Side to call
export fn etruth(b: u32) bool {
  const v = JSValue.new(b);
  const result = truth(v);
  return result;
}
