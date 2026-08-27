import { useEffect, useRef } from 'react';
import * as THREE from 'three/webgpu';
import {
  vec4,
  storage,
  Fn,
  If,
  uniform,
  instanceIndex,
  objectWorldMatrix,
  attribute,
} from 'three/tsl';

/**
 * WebGPU jelly deformation (three.js webgpu_compute_geometry pattern).
 * Calls onFallback if WebGPU is unavailable or init fails.
 *
 * @param {{
 *   active?: boolean,
 *   accent?: string,
 *   accentSecondary?: string,
 *   onFallback?: () => void,
 * }} props
 */
export default function JellyHeroScene({
  active = true,
  accent = '#5191CE',
  accentSecondary = '#4EB67B',
  onFallback,
}) {
  const containerRef = useRef(null);
  const activeRef = useRef(active);
  const onFallbackRef = useRef(onFallback);
  const loopRef = useRef({ start: () => {}, stop: () => {} });

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    onFallbackRef.current = onFallback;
  }, [onFallback]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    if (typeof navigator === 'undefined' || !navigator.gpu) {
      onFallbackRef.current?.();
      return undefined;
    }

    let disposed = false;
    let renderer = null;
    let mesh = null;
    let camera = null;
    let scene = null;
    let raycaster = null;
    let pointer = null;
    let pointerPosition = null;
    let resizeObserver = null;
    let running = false;

    const elasticity = uniform(0.4);
    const damping = uniform(0.94);
    const brushSize = uniform(0.35);
    const brushStrength = uniform(0.22);

    // Matches three.js webgpu_compute_geometry: params injected via geometryNode.
    const jelly = Fn(({ renderer: gpuRenderer, geometry, object }) => {
      const count = geometry.attributes.position.count;

      const positionBaseAttribute = geometry.attributes.position;
      const positionStorageBufferAttribute = new THREE.StorageBufferAttribute(
        count,
        3,
      );
      const speedBufferAttribute = new THREE.StorageBufferAttribute(count, 3);

      geometry.setAttribute('storagePosition', positionStorageBufferAttribute);

      const positionAttribute = storage(positionBaseAttribute, 'vec3', count);
      const positionStorageAttribute = storage(
        positionStorageBufferAttribute,
        'vec3',
        count,
      );
      const speedAttribute = storage(speedBufferAttribute, 'vec3', count);

      const basePosition = positionAttribute.element(instanceIndex);
      const currentPosition = positionStorageAttribute.element(instanceIndex);
      const currentSpeed = speedAttribute.element(instanceIndex);

      const computeInit = Fn(() => {
        currentPosition.assign(basePosition);
      })().compute(count);

      const computeUpdate = Fn(() => {
        If(pointerPosition.w.equal(1), () => {
          const worldPosition = objectWorldMatrix(object).mul(currentPosition);
          const dist = worldPosition.distance(pointerPosition.xyz);
          const direction = pointerPosition.xyz.sub(worldPosition).normalize();
          const power = brushSize.sub(dist).max(0).mul(brushStrength);
          currentPosition.addAssign(direction.mul(power));
        });

        const distance = basePosition.distance(currentPosition);
        const force = elasticity
          .mul(distance)
          .mul(basePosition.sub(currentPosition));

        currentSpeed.addAssign(force);
        currentSpeed.mulAssign(damping);
        currentPosition.addAssign(currentSpeed);
      })()
        .compute(count)
        .setName('Update Jelly');

      computeUpdate.onInit(() => {
        gpuRenderer.compute(computeInit);
      });

      return computeUpdate;
    });

    const setSize = () => {
      if (!renderer || !camera || !container) return;
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const onPointerMove = (event) => {
      if (!camera || !mesh || !raycaster || !pointer || !pointerPosition) return;
      if (!activeRef.current) {
        pointerPosition.value.w = 0;
        return;
      }

      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);

      const hits = raycaster.intersectObject(mesh, false);
      if (hits.length > 0) {
        pointerPosition.value.copy(hits[0].point);
        pointerPosition.value.w = 1;
      } else {
        pointerPosition.value.w = 0;
      }
    };

    const onPointerLeave = () => {
      if (pointerPosition) pointerPosition.value.w = 0;
    };

    const animate = () => {
      if (disposed || !renderer || !scene || !camera) return;
      if (activeRef.current && mesh) {
        mesh.rotation.y += 0.004;
        mesh.rotation.x = Math.sin(performance.now() * 0.0004) * 0.12;
      }
      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (running || !renderer) return;
      running = true;
      renderer.setAnimationLoop(animate);
    };

    const stopLoop = () => {
      if (!renderer) return;
      running = false;
      renderer.setAnimationLoop(null);
      if (pointerPosition) pointerPosition.value.w = 0;
    };

    loopRef.current = { start: startLoop, stop: stopLoop };

    async function init() {
      try {
        renderer = new THREE.WebGPURenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
        });
        await renderer.init();
        if (disposed) {
          renderer.dispose();
          return;
        }

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.display = 'block';
        renderer.domElement.style.pointerEvents = 'auto';

        camera = new THREE.PerspectiveCamera(42, 1, 0.1, 20);
        camera.position.set(0, 0, 4.2);

        scene = new THREE.Scene();
        raycaster = new THREE.Raycaster();
        pointer = new THREE.Vector2();
        pointerPosition = uniform(vec4(0));

        const ambient = new THREE.AmbientLight(0xffffff, 0.55);
        const key = new THREE.DirectionalLight(0xffffff, 1.1);
        key.position.set(3, 4, 2);
        const fill = new THREE.PointLight(new THREE.Color(accent), 0.7);
        fill.position.set(-2, 1, 3);
        scene.add(ambient, key, fill);

        const geometry = new THREE.IcosahedronGeometry(1.25, 4);
        const material = new THREE.MeshStandardNodeMaterial();
        material.color = new THREE.Color(accent);
        material.emissive = new THREE.Color(accent);
        material.emissiveIntensity = 0.35;
        material.metalness = 0.35;
        material.roughness = 0.28;
        material.geometryNode = jelly();
        material.positionNode = attribute('storagePosition');

        mesh = new THREE.Mesh(geometry, material);

        const wire = new THREE.Mesh(
          new THREE.IcosahedronGeometry(1.27, 2),
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(accentSecondary),
            wireframe: true,
            transparent: true,
            opacity: 0.18,
          }),
        );
        mesh.add(wire);
        scene.add(mesh);

        setSize();
        resizeObserver = new ResizeObserver(setSize);
        resizeObserver.observe(container);

        container.addEventListener('pointermove', onPointerMove);
        container.addEventListener('pointerleave', onPointerLeave);

        if (activeRef.current) startLoop();
        else renderer.render(scene, camera);
      } catch (error) {
        console.warn('[JellyHeroScene] WebGPU init failed, falling back', error);
        onFallbackRef.current?.();
      }
    }

    init();

    return () => {
      disposed = true;
      stopLoop();
      loopRef.current = { start: () => {}, stop: () => {} };
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      resizeObserver?.disconnect();
      if (renderer?.domElement?.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      mesh?.geometry?.dispose();
      if (mesh?.material?.dispose) mesh.material.dispose();
      renderer?.dispose();
    };
  }, [accent, accentSecondary]);

  useEffect(() => {
    if (active) loopRef.current.start();
    else loopRef.current.stop();
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-auto"
      aria-hidden
    />
  );
}
