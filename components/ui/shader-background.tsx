'use client';
import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform float time;
uniform vec2 resolution;

vec3 palette(float t) {
  vec3 a = vec3(0.5, 0.2, 0.6);
  vec3 b = vec3(0.4, 0.2, 0.5);
  vec3 c = vec3(0.8, 0.6, 0.9);
  vec3 d = vec3(0.0, 0.15, 0.3);
  return a + b * cos(6.28318 * (c * t + d));
}

float plasma(vec2 uv, float t) {
  float v = 0.0;
  v += sin(uv.x * 3.0 + t * 0.7);
  v += sin(uv.y * 4.0 - t * 0.5);
  v += sin((uv.x + uv.y) * 2.5 + t * 0.9);
  v += sin(sqrt(uv.x * uv.x + uv.y * uv.y) * 5.0 - t * 1.1);
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - resolution * 0.5) / min(resolution.x, resolution.y);
  float t = time * 0.4;
  float p = plasma(uv * 2.0, t);
  vec3 col = palette(p * 0.5 + 0.5) * 0.55;
  col += palette(p * 0.3 + t * 0.1) * 0.2;
  // Dark base so solar system stays visible
  col = mix(vec3(0.05, 0.04, 0.10), col, 0.72);
  gl_FragColor = vec4(col, 1.0);
}`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'time');
    const uRes  = gl.getUniformLocation(prog, 'resolution');

    let raf: number;
    const start = performance.now();

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const frame = () => {
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
    };
    frame();

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
