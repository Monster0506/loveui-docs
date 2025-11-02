/// <reference types="three" />

import type { ThreeElements as BaseThreeElements } from '@react-three/fiber';

declare module '@react-three/fiber' {
  interface ThreeElements extends BaseThreeElements {
    mesh: any;
    planeGeometry: any;
    shaderMaterial: any;
  }
}

export {};
