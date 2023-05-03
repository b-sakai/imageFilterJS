// fragmentShader, grayShader, rareShaderをimportする
import { fragmentShader, grayShader, rareShader } from './fragmentShader.js';
// vertexShaderをimportする
import vertexShader from './vertexShader.js';

// WebGLRendererオブジェクトを生成して、画面サイズを指定する
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// 生成したrendererオブジェクトをbodyに追加する
document.body.appendChild(renderer.domElement);

// Sceneオブジェクトを生成する
const scene = new THREE.Scene();

// OrthographicCameraオブジェクトを生成する
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
camera.position.z = 1;

// PlaneBufferGeometryオブジェクトを生成する
const geometry = new THREE.PlaneBufferGeometry(2, 2);

// Textureオブジェクトを生成する
const texture = new THREE.Texture();
// minFilterとmagFilterにTHREE.NearestFilterを設定する
texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;

// HTMLの要素からid=time-rangeの要素を取得する
const timeRange = document.getElementById('time-range');
// HTMLの要素からid=thresholdの要素を取得する
const threShold = document.getElementById('threshold');

// ShaderMaterialオブジェクトを生成する
const material = new THREE.ShaderMaterial({
  uniforms: {
    // uniform変数textureSrcにテクスチャオブジェクトtextureを渡す
    textureSrc: { value: texture },
    // uniform変数resolutionにVector2オブジェクトを渡す
    resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    // uniform変数timeに0.0を渡す
    time: { value: 0.0 },
    // uniform変数timeCoefficientにtimeRangeの値を渡す
    timeCoefficient: { value: timeRange.value },
    // uniform変数thresholdにthreSholdの値を渡す    
    threshold: { value: threShold.value },    
  },
  // vertexShaderにvertexShaderを渡す
  vertexShader,
  // fragmentShaderにrareShaderを渡す
  fragmentShader: rareShader,
});

// ブラウザのウィンドウサイズが変更された時の処理を追加する
window.addEventListener('resize', () => {
  // uniform変数resolutionに新しいサイズを設定する
  material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
  // rendererのサイズを変更する
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Time Coefficientスライダーのイベント関数
timeRange.addEventListener('input', () => {
  // uniform変数timeCoefficientにtimeRangeの値を設定する
  material.uniforms.timeCoefficient.value = timeRange.value;
});
// Threholdスライダーのイベント関数
threShold.addEventListener('input', () => {
  // uniform変数thresholdにthreSholdの値を設定する
  console.log("threshold", threShold.value);
  material.uniforms.threshold.value = threShold.value;
});


// Meshオブジェクトを生成して、Sceneに追加する
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 画像を読み込み
const img = new Image();

// ファイル選択ボタンの要素を取得する
const imageInput = document.getElementById('image-input');

// ファイルが選択された時の処理
imageInput.addEventListener('change', (event) => {
  // 選択されたファイルを取得する
  const file = event.target.files[0];
  // 画像ファイルでない場合は処理を終了する
  if (!file || !file.type.startsWith('image/')) return;

  // FileReaderオブジェクトを生成する
  const reader = new FileReader();
  // 画像の読み込みが完了した時の処理を追加する
  reader.onload = (event) => {
    // 画像の読み込みが完了したら、img要素に読み込んだ画像を設定する
    img.src = event.target.result;
  };
  // 画像ファイルを読み込む
  reader.readAsDataURL(file);
});

// 画像の読み込み完了時の処理
img.onload = () => {
  // テクスチャーに画像を設定して更新
  texture.image = img;
  texture.needsUpdate = true;

  // アニメーションの開始時刻の取得
  const startTime = Date.now();
  // アニメーション関数
  function animate() {
    // アニメーションをリクエスト
    requestAnimationFrame(animate);

    // 経過時間を計算して、シェーダーに渡す時間を更新
    const elapsedTime = Date.now() - startTime;
    material.uniforms.time.value = elapsedTime / 1000;

    // レンダリング
    renderer.render(scene, camera);
  }
  // アニメーション開始
  animate();
};

