#!/bin/bash

# 2 : Authorization Code を発行するための URL を組み立てる
# ================================================================================


# ユーザ指定
# --------------------------------------------------------------------------------

# 予め作成しておいた OAuth クライアント ID とクライアント・シークレットを指定する
CLIENT_ID='【OAuth クライアント ID】'
CLIENT_SECRET='【OAuth クライアントシークレット】'

# 1-scope.js で組み立てた URL 文字列を貼り付ける・とりあえずこのままで良い
SCOPE='https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcompute'
# 以下はそのままで良い
REDIRECT_URI='urn:ietf:wg:oauth:2.0:oob'


# 処理
# --------------------------------------------------------------------------------

echo '以下の URL にアクセスしてください'
echo "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&access_type=offline"
