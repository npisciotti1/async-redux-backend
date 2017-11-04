{
  "targets": [{
    "target_name": "tesseract_native",
    "sources": [ "addon.cc", "ocreio.cc" ],
    "include_dirs": [
      "/lib/ocr-packages/include",
    ],
    "libraries": [
      "-L/lib/ocr-packages/lib"
    ],
    "link_settings": {
      "libraries": [ "-llept", "-ltesseract" ]
    },
    "configurations": {
      "Release": {
        "cflags": [ "-Wno-ignored-qualifiers" ],
        "xcode_settings": { "OTHER_CFLAGS": [ "-Wno-ignored-qualifiers" ] }
      }
    }
  }]
}
