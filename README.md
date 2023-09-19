branch ごとに S3 の別ディレクトリに対して html の OpenAPI 定義をデプロイする

## 進捗

- CloudFront の CSP で弾かれている

  - https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP (まだ見てない)
  - js の import は redoc から撮ってきた JS を配置すれば防げる
  - Google font は変えられないっけ？
  - CSS のスタイルはめんどくさそうなので、CloudFront の設定を変えたい

- GitHub Actions からのデプロイ
- ブランチ名をディレクトリ名にする

- Branch 名を GitHub Actions で撮ってくる
- Branch 名のエスケープを行う # マストではない

- design 配下に差分がある時のみワークフローを実行する

- プルリクエストにパスをコメントする
- ブランチ削除時に該当ファイルを削除する
