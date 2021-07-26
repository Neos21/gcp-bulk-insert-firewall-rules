#!/bin/bash

# 3 : Access Token を発行する
# ================================================================================


# ユーザ指定
# --------------------------------------------------------------------------------

# 予め作成しておいた OAuth クライアント ID とクライアント・シークレットを指定する
CLIENT_ID='【OAuth クライアント ID】'
CLIENT_SECRET='【OAuth クライアントシークレット】'
# 2-authorization-code-url.bash で生成した URL にアクセスして取得した Authorization Code を指定する
AUTHORIZATION_CODE='【Authorization Code】'

# 以下はそのままで良い
REDIRECT_URI='urn:ietf:wg:oauth:2.0:oob'


# 処理
# --------------------------------------------------------------------------------

curl \
  'https://www.googleapis.com/oauth2/v4/token' \
  --data "code=${AUTHORIZATION_CODE}" \
  --data "client_id=${CLIENT_ID}" \
  --data "client_secret=${CLIENT_SECRET}" \
  --data "redirect_uri=${REDIRECT_URI}" \
  --data "grant_type=authorization_code" \
  --data "access_type=offline"
