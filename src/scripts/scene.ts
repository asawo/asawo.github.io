import * as THREE from "three";
import { DARK } from "./constants";

export function initScene(canvas: HTMLCanvasElement): () => void {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 5;

  function isDark() {
    const explicit = document.documentElement.style.colorScheme;
    if (explicit) return explicit === DARK;
    return matchMedia(`(prefers-color-scheme: ${DARK})`).matches;
  }

  const material = new THREE.MeshBasicMaterial({
    color: isDark() ? "#d4d0c8" : "#1a1a2e",
    wireframe: true,
    transparent: true,
    opacity: 1,
  });

  const observer = new MutationObserver(() => {
    material.color.set(isDark() ? "#d4d0c8" : "#1a1a2e");
  });
  observer.observe(document.documentElement, { attributeFilter: ["style"] });

  // Geometry group
  const group = new THREE.Group();

  const cube = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), material);
  cube.position.x = -1.8;
  group.add(cube);

  const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 1), material);
  group.add(sphere);

  const torus = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.25, 8, 24), material);
  torus.position.x = 1.8;
  group.add(torus);

  scene.add(group);

  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener("resize", resize);

  let raf: number;

  function tick() {
    raf = requestAnimationFrame(tick);
    const t = performance.now() * 0.0005;
    cube.rotation.x = t * 0.7;
    cube.rotation.y = t * 0.5;
    sphere.rotation.x = t * 0.3;
    sphere.rotation.y = t * 0.6;
    torus.rotation.x = t * 0.5;
    torus.rotation.y = t * 0.8;
    group.rotation.y = Math.sin(t * 0.4) * 0.3;
    renderer.render(scene, camera);
  }

  tick();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    observer.disconnect();
    renderer.dispose();
  };
}
