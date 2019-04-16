const std = @import("std");

extern fn trace(usize,i32) void;
extern fn debug(i32) void;

export fn hello() [*]const u8  {
  const h = c"<div>Hello Brian</div>";
  return h;
}

export fn add(a: i32, b: i32) i32 {
    return a + b;
}
