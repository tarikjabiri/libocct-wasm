# libocct-wasm

The `libocct-wasm` is a WebAssembly (WASM) version of the OpenCASCADE Technology (OCCT) library.

> [!NOTE]
> Used to make building OCCT wasm modules faster.

# Building OpenCASCADE wasm library

## Prerequisites

Before building the OpenCASCADE wasm library, ensure you have the following installed:
- [cmake](https://cmake.org/download/) (version 3.30 or higher)
- [npm](https://docs.npmjs.com/cli/v11/commands/npm)
- [node](https://nodejs.org/)
- [ninja](https://ninja-build.org/)
- [git](https://git-scm.com/)

## Build Instructions

1. Run the setup script
```sh
chmod +x ./scripts/setup.sh
./scripts/setup.sh
```

2. Build the wasm library
```sh
cmake --preset Release && cmake --build --preset Release
```
