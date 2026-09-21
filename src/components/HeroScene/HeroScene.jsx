import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sparkles } from '@react-three/drei';
import { MathUtils } from 'three';

const GRAPH_NODES = [
  { id: 'core', position: [0, 0, 0], scale: 0.62, core: true },
  { id: 'api', position: [1.85, 0.55, 0.35], scale: 0.24 },
  { id: 'data', position: [-1.7, 0.45, -0.25], scale: 0.22 },
  { id: 'ui', position: [0.35, -1.45, 0.55], scale: 0.2 },
  { id: 'service', position: [-0.55, 1.55, -0.5], scale: 0.21 },
  { id: 'cache', position: [1.15, -0.85, -1.05], scale: 0.18 },
];

const STACK_LAYERS = [
  { y: 0.72, colorKey: 'bright' },
  { y: 0, colorKey: 'main' },
  { y: -0.72, colorKey: 'deep' },
];

const LAYER_SIZE = [2.6, 0.22, 1.6];

/** @param {{ accent: string, accentSecondary: string }} colors */
function getSceneColors(accent, accentSecondary) {
  return {
    main: accent,
    bright: accentSecondary,
    deep: accent,
    wire: accentSecondary,
  };
}

function SceneMotion({ pointerRef, active, children }) {
  const groupRef = useRef(null);
  const spin = useRef(0);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group || !active) return;

    const dt = Math.min(delta, 0.033);
    spin.current += dt * 0.22;
    const pointer = pointerRef?.current ?? { x: 0, y: 0 };

    const targetRotX = spin.current * 0.18 + pointer.y * 0.32;
    const targetRotY = spin.current * 0.28 + pointer.x * 0.42;
    const targetX = pointer.x * 0.35;
    const targetY = pointer.y * 0.2;

    group.rotation.x = MathUtils.lerp(group.rotation.x, targetRotX, 0.05);
    group.rotation.y = MathUtils.lerp(group.rotation.y, targetRotY, 0.05);
    group.position.x = MathUtils.lerp(group.position.x, targetX, 0.06);
    group.position.y = MathUtils.lerp(group.position.y, 0.1 + targetY, 0.06);
  });

  return (
    <group ref={groupRef} scale={1.05}>
      <Float speed={1.05} rotationIntensity={0.1} floatIntensity={0.25}>
        {children}
      </Float>
    </group>
  );
}

function NetworkGraph({ colors }) {
  const core = GRAPH_NODES[0];
  return (
    <group>
      {GRAPH_NODES.slice(1).map((node) => (
        <Line
          key={`edge-${node.id}`}
          points={[core.position, node.position]}
          color={colors.wire}
          lineWidth={1.2}
          transparent
          opacity={0.55}
        />
      ))}
      {GRAPH_NODES.map((node) => (
        <mesh key={node.id} position={node.position} scale={node.scale}>
          {node.core ? (
            <icosahedronGeometry args={[1, 0]} />
          ) : (
            <octahedronGeometry args={[1, 0]} />
          )}
          <meshStandardMaterial
            color={node.core ? colors.bright : colors.main}
            emissive={colors.deep}
            emissiveIntensity={node.core ? 0.75 : 0.5}
            metalness={0.35}
            roughness={0.25}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      <Sparkles count={22} scale={[4.5, 3.5, 3]} size={2} speed={0.32} opacity={0.4} color={colors.wire} />
    </group>
  );
}

function LayeredStack({ colors }) {
  const layerColors = {
    bright: colors.bright,
    main: colors.main,
    deep: colors.deep,
  };
  return (
    <group>
      {STACK_LAYERS.map((layer) => (
        <mesh key={layer.y} position={[0, layer.y, 0]}>
          <boxGeometry args={LAYER_SIZE} />
          <meshStandardMaterial
            color={layerColors[layer.colorKey]}
            emissive={colors.deep}
            emissiveIntensity={0.55}
            metalness={0.4}
            roughness={0.22}
            transparent
            opacity={0.88}
          />
        </mesh>
      ))}
      <Sparkles count={16} scale={[3.2, 2.6, 2.4]} size={1.8} speed={0.28} opacity={0.35} color={colors.wire} />
    </group>
  );
}

function TorusRing({ colors }) {
  return (
    <group>
      <mesh rotation={[Math.PI / 2.4, 0.15, 0]}>
        <torusGeometry args={[1.25, 0.38, 24, 64]} />
        <meshStandardMaterial
          color={colors.main}
          emissive={colors.deep}
          emissiveIntensity={0.65}
          metalness={0.4}
          roughness={0.22}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.15, 0]} scale={1.01}>
        <torusGeometry args={[1.25, 0.38, 16, 48]} />
        <meshBasicMaterial color={colors.wire} wireframe transparent opacity={0.3} />
      </mesh>
      <Sparkles count={18} scale={[3.6, 2.8, 2.6]} size={2} speed={0.28} opacity={0.36} color={colors.wire} />
    </group>
  );
}

function TorusKnotShape({ colors }) {
  return (
    <group>
      <mesh>
        <torusKnotGeometry args={[1.05, 0.34, 96, 14, 2, 3]} />
        <meshStandardMaterial
          color={colors.main}
          emissive={colors.deep}
          emissiveIntensity={0.7}
          metalness={0.45}
          roughness={0.2}
          transparent
          opacity={0.92}
        />
      </mesh>
      <mesh scale={1.008}>
        <torusKnotGeometry args={[1.05, 0.34, 48, 10, 2, 3]} />
        <meshBasicMaterial color={colors.wire} wireframe transparent opacity={0.32} />
      </mesh>
      <Sparkles count={20} scale={[3.8, 3.2, 2.8]} size={2} speed={0.3} opacity={0.38} color={colors.wire} />
    </group>
  );
}

/**
 * Brain shape — cranium sphere + two offset hemispheres + surface gyri bumps.
 * All built from standard Three.js geometries to approximate a brain silhouette.
 */
function BrainShape({ colors }) {
  // Pre-computed gyri bump positions distributed over the upper hemisphere
  const gyriBumps = [
    // top crown
    { pos: [0, 1.32, 0],        r: 0.22 },
    { pos: [0.55, 1.18, 0.3],   r: 0.19 },
    { pos: [-0.55, 1.18, 0.3],  r: 0.19 },
    { pos: [0.85, 0.78, 0.55],  r: 0.17 },
    { pos: [-0.85, 0.78, 0.55], r: 0.17 },
    { pos: [0.3, 1.05, -0.75],  r: 0.18 },
    { pos: [-0.3, 1.05, -0.75], r: 0.18 },
    // mid band front
    { pos: [1.08, 0.22, 0.52],  r: 0.16 },
    { pos: [-1.08, 0.22, 0.52], r: 0.16 },
    { pos: [0.65, 0.25, 0.98],  r: 0.15 },
    { pos: [-0.65, 0.25, 0.98], r: 0.15 },
    // mid band back
    { pos: [1.0, 0.18, -0.58],  r: 0.15 },
    { pos: [-1.0, 0.18, -0.58], r: 0.15 },
    { pos: [0.5, 0.12, -1.02],  r: 0.14 },
    { pos: [-0.5, 0.12, -1.02], r: 0.14 },
    // lower lobes
    { pos: [0.72, -0.58, 0.62], r: 0.16 },
    { pos: [-0.72, -0.58, 0.62],r: 0.16 },
    { pos: [0.88, -0.42, -0.45],r: 0.15 },
    { pos: [-0.88, -0.42, -0.45],r:0.15 },
    // cerebellum back-bottom bumps
    { pos: [0.38, -0.95, -0.62],r: 0.2  },
    { pos: [-0.38,-0.95, -0.62],r: 0.2  },
    { pos: [0, -1.02, -0.38],   r: 0.18 },
  ];

  const mat = (opacity = 0.92) => (
    <meshStandardMaterial
      color={colors.main}
      emissive={colors.deep}
      emissiveIntensity={0.55}
      metalness={0.35}
      roughness={0.38}
      transparent
      opacity={opacity}
    />
  );

  const wireMat = (
    <meshBasicMaterial
      color={colors.wire}
      wireframe
      transparent
      opacity={0.14}
    />
  );

  return (
    <group position={[0, 0.1, 0]}>
      {/* ── Core cranium ── */}
      <mesh scale={[1.12, 1.0, 1.0]}>
        <sphereGeometry args={[1.0, 48, 32]} />
        {mat(0.88)}
      </mesh>

      {/* ── Left hemisphere overlay — slightly offset ── */}
      <mesh position={[-0.18, 0.06, 0]} scale={[0.92, 0.86, 0.95]}>
        <sphereGeometry args={[1.0, 36, 24]} />
        {mat(0.72)}
      </mesh>

      {/* ── Right hemisphere overlay ── */}
      <mesh position={[0.18, 0.06, 0]} scale={[0.92, 0.86, 0.95]}>
        <sphereGeometry args={[1.0, 36, 24]} />
        {mat(0.72)}
      </mesh>

      {/* ── Interhemispheric fissure — thin dark slab down the middle ── */}
      <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.045, 1.1, 1.15]} />
        <meshStandardMaterial
          color={colors.deep}
          emissive={colors.deep}
          emissiveIntensity={1.0}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* ── Cerebellum (back-bottom lobe) ── */}
      <mesh position={[0, -0.72, -0.72]} scale={[0.68, 0.52, 0.58]}>
        <sphereGeometry args={[1.0, 32, 20]} />
        {mat(0.86)}
      </mesh>

      {/* ── Brainstem ── */}
      <mesh position={[0, -1.22, -0.32]} rotation={[0.45, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.1, 0.52, 16]} />
        <meshStandardMaterial
          color={colors.bright}
          emissive={colors.deep}
          emissiveIntensity={0.7}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* ── Gyri surface bumps ── */}
      {gyriBumps.map((b, i) => (
        <mesh key={i} position={b.pos}>
          <sphereGeometry args={[b.r, 14, 10]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? colors.bright : colors.main}
            emissive={colors.deep}
            emissiveIntensity={i % 3 === 0 ? 0.7 : 0.45}
            metalness={0.3}
            roughness={0.42}
            transparent
            opacity={0.82}
          />
        </mesh>
      ))}

      {/* ── Wireframe overlay on core for depth ── */}
      <mesh scale={[1.13, 1.01, 1.01]}>
        <sphereGeometry args={[1.0, 20, 14]} />
        {wireMat}
      </mesh>

      <Sparkles
        count={28}
        scale={[3.8, 3.4, 3.0]}
        size={2.0}
        speed={0.3}
        opacity={0.38}
        color={colors.wire}
      />
    </group>
  );
}

function SceneContent({ variant, colors }) {
  switch (variant) {
    case 'layers':
      return <LayeredStack colors={colors} />;
    case 'torus':
      return <TorusRing colors={colors} />;
    case 'torusKnot':
      return <TorusKnotShape colors={colors} />;
    case 'brain':
      return <BrainShape colors={colors} />;
    case 'network':
    default:
      return <NetworkGraph colors={colors} />;
  }
}

/**
 * @param {{
 *   pointerRef: React.MutableRefObject<{ x: number, y: number }>,
 *   active?: boolean,
 *   variant?: string,
 *   accent?: string,
 *   accentSecondary?: string,
 * }} props
 */
export default function HeroScene({
  pointerRef,
  active = true,
  variant = 'network',
  accent = '#a78bfa',
  accentSecondary = '#c4b5fd',
}) {
  const colors = getSceneColors(accent, accentSecondary);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none scale-[0.58] origin-center opacity-80 sm:scale-[0.82] sm:opacity-90 md:scale-100 md:opacity-100" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 4, 2]} intensity={1.05} color="#ffffff" />
        <pointLight position={[-2, 1, 3]} intensity={0.55} color={accent} />
        <SceneMotion pointerRef={pointerRef} active={active}>
          <SceneContent variant={variant} colors={colors} />
        </SceneMotion>
      </Canvas>
    </div>
  );
}
