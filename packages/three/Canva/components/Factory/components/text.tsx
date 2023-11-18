import * as THREE from 'three';
import { useEffect, useState } from 'react';

interface IText {
  text: string;
  position: THREE.Vector3;
  scale?: THREE.Vector3;
  color?: any;
  fontSize?: number;
}

function generateSprite(text: string, color: any, fontSize = 50) {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
  context.beginPath();
  context.font = `${fontSize}px Microsoft YaHei`;
  context.fillStyle = color;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  context.fill();
  context.stroke();
  return canvas;
}

function Text2({
  text,
  position,
  scale = new THREE.Vector3(100, 100, 100),
  color = '#00D1D1',
  fontSize = 50,
}: IText) {
  const [material, setMaterial] = useState<THREE.SpriteMaterial | undefined>(undefined);
  useEffect(() => {
    const material = new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(generateSprite(text, color, fontSize)),
      blending: THREE.AdditiveBlending,
    });
    setMaterial(material);
  }, [text, color, fontSize]);

  return <sprite material={material} position={position} scale={scale} />;
}

export default Text2;
