# imageFilterJS

JavaScriptでフラグメントシェーダやバーテックスシェーダをどう使えば良いか考えて実装してみたもの
コードのリファクタリングなどは未実施

## 実行方法

* vscodeにliveserverの拡張機能を入れる
* index.htmlを開いて、右下にあるGo liveをクリックする

## デモ

![demo](https://github.com/b-sakai/imageFilterJS/assets/25577220/b442f0d4-8347-4f3f-8eb9-f497ffa9aa3a)

* 現状、閾値（Threshold）以下の明度が構造色のように光る、レアフィルターが適用可能
* Thresholdスライダーで閾値が調節可能
* Time Coefficientスライダーで速さの調節が可能
