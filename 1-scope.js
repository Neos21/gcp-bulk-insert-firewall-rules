#!/usr/bin/env node

// 1 : GCP REST API でファイアウォールルールを作成する際のスコープ URL を組み立てる
// ================================================================================

const scopeUrls = 'https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/compute';
const scope = encodeURIComponent(scopeUrls);
console.log(scope);
