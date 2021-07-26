#!/bin/bash

# 中国の IP リスト準備 1 : 中国の IP リストを取得する
# - 参考 : https://ipv4.fetus.jp/cn
# ================================================================================

# 取得したファイルパス
file_1_raw='./src-cn-1-raw.txt'

wget https://ipv4.fetus.jp/cn.nginx.txt -O "${file_1_raw}"
