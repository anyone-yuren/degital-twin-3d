// // 天空盒
// import { Environment } from '@react-three/drei';

// const Sky = () => {
//   return (
//     <Environment
//       files={'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr'}
//       background
//     />
//   );
// };

// export default Sky;

import { Sky } from '@react-three/drei';
import React from 'react';
const SkyBox = (props) => {
  return (
    <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} {...props} />
  );
};
export default SkyBox;
