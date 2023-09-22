# プルリク時、ブランチ名のディレクトリに OpenAPI 定義書をアップロードして簡単にレビューできるようにする

## 注意点

- 利用する際は `.github/workflows-bk` を `.github/workflows` に変更する。
  - ※ パブリックリポジトリで誰でもプルリクを作れば GitHub Actions を動かせてしまうため、このようにしている

## 概要

### これは何？

- プルリク作成時に S3 に `<ブランチ名のディレクトリ>/index.html` に OpenAPI 定義書の HTML を配置し、CloudFront 経由で簡単に確認できる

### 構成

- CloudFront, S3 の構成
  - S3 のみで静的ウェブサイトホスティングでも良いが、Basic 認証をかけることが出来なそうなので、CloudFront & S3 の構成にした
  - 今回は Basic 認証まで実装していないが、実運用では掛けることになりそう
- GitHub Actions
  - プルリク作成時、`designディレクトリ` に変更があった場合、S3 の`<ブランチ名のディレクトリ>/index.html` パスに定義書をアップロード
  - ブランチ削除時、S3 の`<ブランチ名のディレクトリ>/index.html` のオブジェクトを削除する
- 利用ライブラリ

  - cdk: インフラ作成に利用
  - redoc-cli: OpenAPI 定義 -> html の変換に利用

  ## 今後の展望

- CloudFront への Basic 認証は作っておいて良さそう
- dependabot で cdk のバージョンアップとスナップショットテスト自動化を試してみたい
- 今回 S3 にアップロードしているが、GitHub Actions の Artifact にアップロードしてプルリクコメントに自動で載せるようにした方が運用しやすいかもしれない
