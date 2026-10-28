import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export type SceneState = {
  progress: number;
  mouseX: number;
  mouseY: number;
  reduced: boolean;
};

const ease = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

function SecurityCamera({ state }: { state: SceneState }) {
  const size = useThree((scene) => scene.size);
  const mobile = size.width < 640;
  const compact = mobile && size.width / size.height < 1.1;
  const rig = useRef<THREE.Group>(null);
  const modelMount = useRef<THREE.Group>(null);
  const start = useRef<number | null>(null);
  const { scene } = useGLTF("/models/CAMERA-2.glb");
  const model = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const mount = modelMount.current;
    if (!mount) return;

    mount.add(model);
    return () => {
      mount.remove(model);
    };
  }, [model]);

  useFrame((s, raw) => {
    const dt = Math.min(raw, 0.05);
    if (start.current === null) start.current = s.clock.elapsedTime;
    const t = state.reduced
      ? 1
      : ease((s.clock.elapsedTime - start.current - 0.2) / 2.4);
    const p = state.progress;
    if (!rig.current) return;

    // Entrance: fly in from the right, rotating, then settle.
    const enterX = THREE.MathUtils.lerp(
      mobile ? 2.5 : 5.5,
      compact ? 0.3 : mobile ? 0.15 : 1.55,
      t,
    );
    const enterRot = THREE.MathUtils.lerp(-2.8, -0.9, t);
    const enterScale = THREE.MathUtils.lerp(
      compact ? 0.24 : mobile ? 0.32 : 0.52,
      compact ? 0.42 : mobile ? 0.55 : 0.68,
      t,
    );

    // Scroll: swing to face the viewer, rise and recede.
    const targetX = enterX + p * (compact ? 0.1 : mobile ? 0.05 : 0.3);
    const targetY =
      0.15 +
      p * (mobile ? 0.2 : 0.5) +
      Math.sin(s.clock.elapsedTime * 0.8) * 0.035;
    const targetRotY = enterRot + p * 0.35 + state.mouseX * 0.1;
    const targetRotX = -0.06 + state.mouseY * 0.1;
    const targetScale = enterScale * 0.85 * (1 - p * 0.3);

    const k = 1 - Math.exp(-6 * dt);
    rig.current.position.x += (targetX - rig.current.position.x) * k;
    rig.current.position.y += (targetY - rig.current.position.y) * k;
    const sc = rig.current.scale.x + (targetScale - rig.current.scale.x) * k;
    rig.current.scale.setScalar(sc);
    rig.current.rotation.y += (targetRotY - rig.current.rotation.y) * k;
    rig.current.rotation.x += (targetRotX - rig.current.rotation.x) * k;
  });

  return (
    <group
      ref={rig}
      position={[mobile ? 2.5 : 5.5, 0.1, 0]}
      scale={compact ? 0.24 : mobile ? 0.32 : 0.52}
    >
      <group ref={modelMount} />
    </group>
  );
}

function CameraLoading() {
  const spinner = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (spinner.current) spinner.current.rotation.z += delta * 1.5;
  });

  return (
    <mesh ref={spinner}>
      <torusGeometry args={[0.14, 0.012, 8, 48]} />
      <meshBasicMaterial color="#5fe0ff" transparent opacity={0.75} />
    </mesh>
  );
}

function CameraDrift({ state }: { state: SceneState }) {
  const width = useThree((scene) => scene.size.width);
  const mobile = width < 640;
  useFrame(({ camera }, raw) => {
    const k = 1 - Math.exp(-3 * Math.min(raw, 0.05));
    const targetX = state.mouseX * (mobile ? 0.14 : 0.4);
    camera.position.x += (targetX - camera.position.x) * k;
    camera.position.y +=
      ((mobile ? 0.2 : 0.4) + state.mouseY * 0.25 - camera.position.y) * k;
    camera.lookAt(mobile ? 0.15 : 0.6, mobile ? 0.12 : 0.3, 0);
  });
  return null;
}

export default function CameraScene({ state }: { state: SceneState }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 7], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 5, 6]} intensity={1.5} />
      <pointLight position={[-4, 1, 3]} intensity={2.2} color="#2f7bff" />
      <pointLight position={[3, -2, -3]} intensity={1.5} color="#5fe0ff" />
      <Environment resolution={256}>
        <Lightformer
          intensity={1.7}
          position={[0, 5, 0]}
          scale={[10, 10, 1]}
          rotation-x={Math.PI / 2}
        />
        <Lightformer
          intensity={0.45}
          color="#3a8bff"
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[20, 1, 1]}
        />
        <Lightformer
          intensity={0.4}
          color="#9fe8ff"
          position={[5, 0, 2]}
          rotation-y={-Math.PI / 2}
          scale={[10, 2, 1]}
        />
      </Environment>
      <Suspense fallback={<CameraLoading />}>
        <SecurityCamera state={state} />
      </Suspense>
      <ContactShadows
        position={[0.6, -1.9, 0]}
        opacity={0.24}
        scale={10}
        blur={2.6}
        far={4}
        color="#141820"
      />
      {!state.reduced && <CameraDrift state={state} />}
    </Canvas>
  );
}

useGLTF.preload("/models/CAMERA-2.glb");
