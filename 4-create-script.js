#!/usr/bin/env node

// 4 : GCP REST API でファイアウォールルールを作成する curl コマンドを生成する
// ================================================================================


// ユーザ指定
// --------------------------------------------------------------------------------

// 以下3つを指定する
const projectId   = '【GCP プロジェクト ID】';
const apiKey      = '【API Key】';
const accessToken = '【Access Token】';

// ファイアウォールルール名の接頭辞
const firewallRuleNamePrefix = 'japan';
// 256件ずつに分解した CIDR ブロック一覧の JSON ファイルパス
const ipChunkJsonFilePath = './src-jp-3-chunk.json';
// 許可ルールを作る (true) か 拒否ルールを作る (false) か
const isAllowed = true;

// 出力する Bash ファイルパス
const outputBashFilePath = './exec.bash';


// 処理
// --------------------------------------------------------------------------------

// 許可ルールか拒否ルールかを決める
const allowedOrDenied = isAllowed ? 'allowed' : 'denied';

// curl コマンド1つ分のテンプレート
const template = (projectId, apiKey, accessToken, firewallRuleName, ips) => `curl --request POST \
  "https://compute.googleapis.com/compute/v1/projects/${projectId}/global/firewalls?key=${apiKey}" \
  --header 'Authorization: Bearer ${accessToken}' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{"name":"${firewallRuleName}","${allowedOrDenied}":[{"IPProtocol":"all"}],"network":"projects/${projectId}/global/networks/default","selfLink":"projects/${projectId}/global/firewalls/${firewallRuleName}","sourceRanges":${ips},"priority":100,"direction":"INGRESS","description":"","disabled":false,"enableLogging":false,"kind":"compute#firewall","logConfig":{"enable":false}}' \
  --compressed
`;

// 256件ずつに分解した CIDR ブロック一覧の JSON ファイルを require で読み込み curl コマンドを複数個組み立てていく
const ipChunk = require(ipChunkJsonFilePath);
const script = ipChunk.reduce((acc, ips, index) => {
  const num = `0${index + 1}`.slice(-2);
  const firewallRuleName = `${firewallRuleNamePrefix}-${num}`;  // ファイアウォールのルール名は「【接頭辞】-00」(連番) とする
  const curl = template(projectId, apiKey, accessToken, firewallRuleName, JSON.stringify(ips));
  return acc + curl + '\n';
}, '');

// 組み立てた curl コマンドをファイルに書き出す・コレを実行する
require('fs').writeFileSync(outputBashFilePath, `#!/bin/bash\n\necho 'Start'\n\n${script}echo 'Finished'\n`, 'utf-8');
