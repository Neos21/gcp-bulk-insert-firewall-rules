#!/usr/bin/env node

// 中国の IP リスト準備 2 : 中国の IP リストを作成する
// ================================================================================


// ユーザ指定
// --------------------------------------------------------------------------------

// 読み込むテキストファイルパス
const inputTextFilePath = './src-cn-1-raw.txt'
// 書き出すテキストファイルパス
const outputJsonFilePath = './src-cn-2-ip.txt';


// 処理
// --------------------------------------------------------------------------------

const fs = require('fs');

// テキストファイルを読み込み配列にする
const ipsText = fs.readFileSync(inputTextFilePath, 'utf-8');
const ips = ipsText.split('\n')
  .filter(line => line)  // 空行を除去する
  .filter(line => !line.startsWith('#'))  // コメント行を削除する
  .map(line => line.replace('deny ', '').replace(';', ''));  // `deny 【IP】;` を IP のみにする

fs.writeFileSync(outputJsonFilePath, ips.join('\n'), 'utf-8');
