wasm:
	cd src && zig build-exe main.zig --release-fast -target wasm32-freestanding-none
	rm www/wasmtest.wasm
	cp src/main.wasm www/wasmtest.wasm

run: wasm
	cd www && python -m SimpleHTTPServer 8000