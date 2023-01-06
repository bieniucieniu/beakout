import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { SpotLight, SpotLightHelper } from "three";
type LightsProps = {
  boardSize: [number, number];
  lightOffset?: number;
  lightIntensity?: number;
  ambientIntensity?: number;
  lightLookAt?: [number, number, number];
};

export const Lights = ({
  boardSize,
  lightOffset,
  lightIntensity,
  ambientIntensity,
}: LightsProps) => {
  const ref1 = useRef<SpotLight>(null);
  const ref2 = useRef<SpotLight>(null);

  // @ts-expect-error
  useHelper(ref1, SpotLightHelper, 0.5);
  // @ts-expect-error

  useHelper(ref2, SpotLightHelper, 0.5);

  return (
    <>
      <ambientLight castShadow intensity={ambientIntensity ?? 0.1} />
      <spotLight
        ref={ref1}
        castShadow
        intensity={lightIntensity ?? 0.5}
        position={[
          (boardSize[0] - 1) / 2,
          (boardSize[1] - 1) / 2,
          lightOffset ?? 12,
        ]}
      />
      <spotLight
        ref={ref2}
        castShadow
        intensity={lightIntensity ?? 0.5}
        position={[
          -(boardSize[0] - 1) / 2,
          (boardSize[1] - 1) / 2,
          lightOffset ?? 12,
        ]}
      />
    </>
  );
};
