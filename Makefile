all: wasm run

wasm:
	cd src && zig build-exe main.zig --release-fast -target wasm32-freestanding-none
	rm www/wasmtest.wasm
	cp src/main.wasm www/wasmtest.wasm

run:
	cd www && ./runserver