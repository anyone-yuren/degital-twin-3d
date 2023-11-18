import { GizmoHelper, GizmoViewport, Stats } from '@react-three/drei';
import { Suspense } from 'react';

const Gizmo = () => {
  return (
    <Suspense>
      <GizmoHelper alignment="bottom-right" margin={[80, 80]} onUpdate={() => null}>
        {/* <mesh>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh> */}
        <GizmoViewport labelColor="white" axisHeadScale={1} />
        <Stats className="!right-0 top-0 !left-[inherit]" />
      </GizmoHelper>
    </Suspense>
  );
};
export default Gizmo;
