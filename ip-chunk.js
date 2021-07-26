#!/usr/bin/env node

// IP リスト準備 : CIDR が記されたテキストファイルを読み込み256件ずつに分割する
// ================================================================================


// ユーザ指定
// --------------------------------------------------------------------------------

// 読み込むテキストファイルパス
const inputTextFilePath = './src-jp-2-ip.txt';
// 書き出す JSON ファイルパス
const outputJsonFilePath = './src-jp-3-chunk.json';


// 処理
// --------------------------------------------------------------------------------

const fs = require('fs');

// テキストファイルを読み込み配列にする
const ipsText = fs.readFileSync(inputTextFilePath, 'utf-8');
const ips = ipsText.split('\n').filter(line => line);  // 空行は除去する

// 256件ずつに分割する
const arrayChunk = ([...array], size) => array.reduce((acc, _value, index) => index % size ? acc : [...acc, array.slice(index, index + size)], []);
const chunks = arrayChunk(ips, 256);

// ファイルに書き出す
fs.writeFileSync(outputJsonFilePath, JSON.stringify(chunks, null, '  '), 'utf-8');
