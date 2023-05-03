export const fragmentShader = `
uniform sampler2D textureSrc;
uniform vec2 resolution;

void main() {
  vec4 color = texture2D(textureSrc, gl_FragCoord.xy / resolution.xy);
  float gray = 0.2989 * color.r + 0.5870 * color.g + 0.1140 * color.b;
  gl_FragColor = color;
  //gl_FragColor = vec4(0.0, gl_FragCoord.y, 1.0, 1.0);
}
`

export const grayShader = `
uniform sampler2D textureSrc;
uniform vec2 resolution;
uniform float time;

void main() {
  vec4 color = texture2D(textureSrc, gl_FragCoord.xy / resolution.xy);
  float gray = 0.2989 * color.r + 0.5870 * color.g + 0.1140 * color.b;
  gl_FragColor = vec4(vec2(gray), 0.5 * sin(time) + 0.5, 1.0);
}
`

export const rareShader = `
uniform sampler2D textureSrc;  // 元画像のテクスチャ
uniform vec2 resolution;       // レンダリングの解像度
uniform float time;
uniform float timeCoefficient;
uniform float threshold;

void main() {
  float t = time * timeCoefficient;
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  // 構造色の計算
  vec3 structColor = vec3(
    sin(uv.x * 10.0 + 0.2 * t),  // 赤
    sin(uv.y * 10.0 + 0.3 * t),  // 緑
    sin((uv.x + uv.y + 0.8 * t) * 10.0)  // 青
  );

  // 元画像の色を読み込み
  vec4 texel = texture2D(textureSrc, uv);

  // 構造色を加算
  vec3 result = texel.rgb + 0.3 * structColor;
  vec4 ret = vec4(result, texel.a);

  float brightness = dot(texel.rgb, vec3(1.0)) / 3.0;

  // 色の出力
  gl_FragColor = mix(texel, ret, step(brightness, threshold));
}
`

//export default fragmentShader;
