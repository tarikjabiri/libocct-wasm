#!/bin/sh
rm -rf ./build/emsdk
rm -rf ./build/occt

git -c advice.detachedHead=false clone --depth=1 -b 3.1.71 https://github.com/emscripten-core/emsdk.git ./build/emsdk
git -c advice.detachedHead=false clone --depth=1 -b V7_8_1 https://github.com/Open-Cascade-SAS/OCCT.git ./build/occt

./build/emsdk/emsdk install latest
./build/emsdk/emsdk activate --embedded latest
cd ./build/emsdk/upstream/emscripten && npm install
