cmake_minimum_required(VERSION 3.30.0)
project("libocct-wasm")

set(CMAKE_CXX_STANDARD 17)

cmake_policy(SET CMP0177 NEW)
set(INSTALL_PREFIX "${CMAKE_SOURCE_DIR}/libocct-wasm")
set(OCCT_TARGET_NAME occt-wasm)

set(OCCT_TOOLKITS
  TKBool
  TKBO
  TKBRep
  TKFeat
  TKFillet
  TKGeomAlgo
  TKGeomBase
  TKG2d
  TKG3d
  TKHLR
  TKMath
  TKMesh
  TKOffset
  TKPrim
  TKShHealing
  TKTopAlgo
  TKernel
)

set(OCCT_PACKAGES)
foreach(TOOLKIT ${OCCT_TOOLKITS})
  file(STRINGS build/occt/src/${TOOLKIT}/PACKAGES PACKAGES)
  list(APPEND OCCT_PACKAGES ${PACKAGES})
endforeach()
list(REMOVE_DUPLICATES OCCT_PACKAGES)

set(OCCT_SRC_GLOB)
set(OCCT_INCLUDE)
set(OCCT_INCLUDE_GLOB)
foreach(PACKAGE ${OCCT_PACKAGES})
  if(NOT PACKAGE STREQUAL "")
    list(APPEND OCCT_SRC_GLOB build/occt/src/${PACKAGE}/*.cxx)
    list(APPEND OCCT_INCLUDE_GLOB build/occt/src/${PACKAGE}/*.hxx)
    list(APPEND OCCT_INCLUDE_GLOB build/occt/src/${PACKAGE}/*.lxx)
    list(APPEND OCCT_INCLUDE build/occt/src/${PACKAGE})
  endif()
endforeach()

set(OCCT_FOLDERS
  Standard
)

foreach(FOLDER ${OCCT_FOLDERS})
  list(APPEND OCCT_SRC_GLOB build/occt/src/${FOLDER}/*.cxx)
  list(APPEND OCCT_INCLUDE_GLOB build/occt/src/${FOLDER}/*.hxx)
  list(APPEND OCCT_INCLUDE_GLOB build/occt/src/${FOLDER}/*.lxx)
  list(APPEND OCCT_INCLUDE build/occt/src/${FOLDER})
endforeach()

file(GLOB OCCT_SRC ${OCCT_SRC_GLOB})
file(GLOB OCCT_INCLUDE_FILES ${OCCT_INCLUDE_GLOB})

if(${CMAKE_SYSTEM_NAME} STREQUAL "Emscripten")
  add_library(${OCCT_TARGET_NAME} STATIC ${OCCT_SRC})
  target_include_directories(${OCCT_TARGET_NAME} PUBLIC ${OCCT_INCLUDE})
  target_compile_options(${OCCT_TARGET_NAME} PUBLIC
    -DOCCT_NO_PLUGINS
    -fexceptions
    -flto
    -O3
  )

  install(TARGETS ${OCCT_TARGET_NAME} DESTINATION ${INSTALL_PREFIX})
  install(FILES ${OCCT_INCLUDE_FILES} DESTINATION ${INSTALL_PREFIX}/include)
endif()