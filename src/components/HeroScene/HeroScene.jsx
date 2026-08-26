import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sparkles } from '@react-three/drei';
import { MathUtils } from 'three';

/** Satellite nodes around a core — software architecture / API graph metaphor */
const GRAPH_NODES = [
  { id: 'core', position: [0, 0, 0], scale: 0.62, core: true },
  { id: 'api', position: [1.85, 0.55, 0.35], scale: 0.24 },
  { id: 'data', position: [-1.7, 0.45, -0.25], scale: 0.22 },
  { id: 'ui', position: [0.35, -1.45, 0.55], scale: 0.2 },
  { id: 'service', position: [-0.55, 1.55, -0.5], scale: 0.21 },
  { id: 'cache', position: [1.15, -0.85, -1.05], scale: 0.18 },
];

const VIOLET = '#a78bfa';
const VIOLET_BRIGHT = '#c4b5fd';
const VIOLET_DEEP = '#7c3aed';

function GraphNode({ scale, core = false }) {
  return (
    <mesh scale={scale}>
      {core ? (
        <icosahedronGeometry args={[1, 0]} />
      ) : (
        <octahedronGeometry args={[1, 0]} />
      )}
      <meshStandardMaterial
        color={core ? VIOLET_BRIGHT : VIOLET}
        emissive={core ? VIOLET_DEEP : '#5b21b6'}
        emissiveIntensity={core ? 0.85 : 0.55}
        metalness={0.35}
        roughness={0.25}
        transparent
        opacity={core ? 0.95 : 0.82}
      />
    </mesh>
  );
}

function GraphEdge({ from, to }) {
  return (
    <Line
      points={[from, to]}
      color={VIOLET_BRIGHT}
      lineWidth={1.2}
      transparent
      opacity={0.55}
    />
  );
}

/**
 * Visible 3D network graph — core system + connected modules (software engineering).
 */
function SoftwareGraph({ pointerRef, active }) {
  const groupRef = useRef(null);
  const spin = useRef(0);
  const wasActiveRef = useRef(active);
  const core = GRAPH_NODES[0];

  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7839/ingest/3657478a-a2a8-4aa6-9876-254e7f496f2d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '734eaa' },
      body: JSON.stringify({
        sessionId: '734eaa',
        runId: 'post-fix',
        hypothesisId: 'A-E',
        location: 'HeroScene.jsx:active-effect',
        message: 'Canvas active changed',
        data: { active, spin: spin.current, pointer: pointerRef?.current },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
  }, [active, pointerRef]);
  // #endregion

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group || !active) return;

    const dt = Math.min(delta, 0.033);

    // #region agent log
    const resumed = active && !wasActiveRef.current;
    if (resumed || dt > 0.05) {
      fetch('http://127.0.0.1:7839/ingest/3657478a-a2a8-4aa6-9876-254e7f496f2d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '734eaa' },
        body: JSON.stringify({
          sessionId: '734eaa',
          runId: 'post-fix',
          hypothesisId: 'A-E',
          location: 'HeroScene.jsx:useFrame',
          message: resumed ? 'frameloop resumed' : 'large delta',
          data: {
            active,
            resumed,
            delta,
            dt,
            spin: spin.current,
            pointer: pointerRef?.current,
            rotX: group.rotation.x,
            rotY: group.rotation.y,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
    }
    wasActiveRef.current = active;
    // #endregion

    spin.current += dt * 0.22;
    const pointer = pointerRef?.current ?? { x: 0, y: 0 };

    const targetRotX = spin.current * 0.18 + pointer.y * 0.35;
    const targetRotY = spin.current * 0.28 + pointer.x * 0.45;
    const targetX = pointer.x * 0.4;
    const targetY = pointer.y * 0.25;

    group.rotation.x = MathUtils.lerp(group.rotation.x, targetRotX, 0.05);
    group.rotation.y = MathUtils.lerp(group.rotation.y, targetRotY, 0.05);
    group.position.x = MathUtils.lerp(group.position.x, targetX, 0.06);
    group.position.y = MathUtils.lerp(group.position.y, 0.15 + targetY, 0.06);
  });

  return (
    <group ref={groupRef} position={[0, 0.15, 0]} scale={1.05}>
      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.3}>
        <group>
          {GRAPH_NODES.slice(1).map((node) => (
            <GraphEdge
              key={`edge-${node.id}`}
              from={core.position}
              to={node.position}
            />
          ))}

          {GRAPH_NODES.map((node) => (
            <group key={node.id} position={node.position}>
              <GraphNode scale={node.scale} core={node.core} />
            </group>
          ))}

          <Sparkles
            count={28}
            scale={[4.5, 3.5, 3]}
            size={2.2}
            speed={0.35}
            opacity={0.45}
            color={VIOLET_BRIGHT}
          />
        </group>
      </Float>
    </group>
  );
}

/**
 * Lightweight R3F hero accent. Parent should gate reduced-motion and lazy-load.
 * @param {{ pointerRef: React.MutableRefObject<{ x: number, y: number }>, active?: boolean }} props
 */
export default function HeroScene({ pointerRef, active = true }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} color="#ddd6fe" />
        <pointLight position={[-2, 1, 3]} intensity={0.6} color={VIOLET} />
        <SoftwareGraph pointerRef={pointerRef} active={active} />
      </Canvas>
    </div>
  );
}
