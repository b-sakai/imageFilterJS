# imageFilterJS

JavaScriptでフラグメントシェーダやバーテックスシェーダをどう使えば良いか考えて実装してみたもの
コードのリファクタリングなどは未実施

## Github Pages

https://b-sakai.github.io/imageFilterJS/

## 実行方法

* vscodeにliveserverの拡張機能を入れる
* index.htmlを開いて、右下にあるGo liveをクリックする

## デモ

https://github.com/b-sakai/imageFilterJS/assets/25577220/ec18d2a1-4583-4817-a59e-ffb365b4305f

* 現状、閾値（Threshold）以下の明度が構造色のように光る、レアフィルターが適用可能
* Thresholdスライダーで閾値が調節可能
* Time Coefficientスライダーで速さの調節が可能
