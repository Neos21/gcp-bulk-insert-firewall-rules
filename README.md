# GCP Bulk Insert Firewall Rules

GCP ファイアウォールルールを一括作成するための支援スクリプト集。

「中国からのリクエストを拒否したい」「日本からのリクエストを許可したい」といった際に、国別 IP リストを取得・加工して、GCP の REST API を `curl` でコールする Bash スクリプト `exec.bash` を生成します。この Bash スクリプトを実行することで、ファイアウォールルールを一括作成できます。


## 必要なモノ

本スクリプト集は Node.js と Bash で実装しています。実行するには以下が必要です。

- Node.js : 組み込みモジュール `fs` が使えれば OK。`package.json` はありません、`npm install` も不要
- Bash : `curl`・`wget`・`gunzip`・`sed` コマンド (Mac の場合は `gsed` コマンド)


## 使い方

各スクリプトの冒頭に「ユーザ指定」というセクションがあるので、そこに各種設定値を代入してからスクリプトを実行すること。

### 共通：GCP の Access Token を作成する

- 予め GCP プロジェクト ID を控えておく
- 予め API Key、OAuth クライアント ID、OAuth クライアンとシークレットを発行しておく
    - 参考：[GCP に中国からのアクセスがあり課金されたのでブロックする - Neo's World](https://neos21.net/blog/2020/09/09-01.html)

```bash
# ファイアウォールルールを生成するためのスコープ URL 文字列を確認する
$ node ./1-scope.js
# Authorization Code を取得するための URL を組み立てる
$ node ./2-authorization-code-url.bash
# Access Token を取得する
$ node ./3-access-token.bash
# プロジェクト ID (`projectId`)、API Key (`apiKey`)、Access Token (`accessToken`) を設定しておく
$ vi ./4-create-script.js
```

### 中国からのリクエストを拒否する例

```bash
# src-cn-1-raw.txt を取得する
$ bash ./ip-cn-1-fetch.bash
# src-cn-2-ip.txt を作成する
$ node ./ip-cn-2-mod.js

# 入力ファイルパス (`inputTextFilePath`) を `./src-cn-2-ip.txt` に
# 出力ファイルパス (`outputJsonFilePath`) を `./src-cn-3-chunk.json` に設定し
# src-cn-3-chunk.json を作成する
$ node ./ip-chunk.js

# ファイアウォールルール名の接頭辞 (`firewallRuleNamePrefix`) を任意に
# 入力ファイルパス (`ipChunkJsonFilePath`) を `./src-cn-3-chunk.json` に
# 作成するルール (`isAllowed`) を拒否ルール = `false` に設定し
# exec.bash を作成する
$ node ./4-create-script.js

# 生成したスクリプトを実行しファイアウォールルールを一括登録する
$ bash ./exec.bash
```

### 日本からのリクエストを許可する例

```bash
# src-jp-1-raw.txt を取得・src-jp-2-ip.txt を作成する
$ bash ./ip-jp-1-fetch.bash

# 入力ファイルパス (`inputTextFilePath`) を `./src-jp-2-ip.txt` に
# 出力ファイルパス (`outputJsonFilePath`) を `./src-jp-3-chunk.json` に設定し
# src-jp-3-chunk.json を作成する
$ node ./ip-chunk.js

# ファイアウォールルール名の接頭辞 (`firewallRuleNamePrefix`) を任意に
# 入力ファイルパス (`ipChunkJsonFilePath`) を `./src-jp-3-chunk.json` に
# 作成するルール (`isAllowed`) を許可ルール = `true` に設定し
# exec.bash を作成する
$ node ./4-create-script.js

# 生成したスクリプトを実行しファイアウォールルールを一括登録する
$ bash ./exec.bash
```

### 共通：後処理

```bash
# 上述のスクリプト群で取得・作成したファイルを一括削除する
$ bash ./remove-assets.bash
```


## Links

- [Neo's World](https://neos21.net/)
