#!/bin/zsh
cd "${0:A:h}"
open http://127.0.0.1:5500
python3 -m http.server 5500 --bind 127.0.0.1
