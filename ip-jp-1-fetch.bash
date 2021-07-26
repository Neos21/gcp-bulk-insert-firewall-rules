#!/bin/bash

# 日本の IP リスト準備 1 : 日本の IP リストを取得する
# - 参考 : https://www.apps-gcp.com/gce-firewall-ip/
# ================================================================================

# 取得したファイルパス
file_1_raw='./src-jp-1-raw.txt'
# 変換したファイルパス
file_2_ip='./src-jp-2-ip.txt'

# gunzip (gzip -d) での解凍が必要
wget http://nami.jp/ipv4bycc/cidr.txt.gz -O - | gunzip > "${file_1_raw}"

# Mac の場合は gsed を使う
sed_command='sed'
if type gsed > /dev/null 2>&1; then
  sed_command='gsed'
fi

# JP の行だけ抽出する
"${sed_command}" -n 's/^JP\t//p' "${file_1_raw}" > "${file_2_ip}"
