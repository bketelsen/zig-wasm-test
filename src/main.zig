const std = @import("std");
const mem = @import("std").mem;
const js = @import("./js/js.zig");
extern fn trace(usize,i32) void;
extern fn debug(u32) void;
extern fn debugI64(u32) void;
extern fn runtime_wasmExit(i32) void;


export fn stringLengthIsFive(p: usize, l: u32) bool {
    const ptr = @intToPtr(*[100]u8,p);
    const sl = ptr[0..l];
    return sl.len == 5;

}
const nanHead: u32 = js.nanHead;

// argc: integer
// argv: pointer to arg values
export fn run(argc: u32, argv: usize) void {
  var list = std.ArrayList(u32).init(std.heap.wasm_allocator);
  defer list.deinit();
  debug(argc);
  debug(argv);

  // argv is a pointer to the first pointer of the 
  // argv array
  const p = @intToPtr(*usize, argv);
  const pv = @intToPtr([*]const u8, p.*);
  //const smallpv = @truncate(u32,pv.*);
  //debug(smallpv);
  var i: usize = 0;
  while (pv[i] != 0 ) {
    debug(pv[i]);
    i+=1;
  }
  debug(i);
}



// This should be generated
// It's the shim for the JS Side to call
export fn etruth(b: u32) bool {
  const v = js.JSValue.new(b);
  const result = js.truth(v);
  return result;
}
