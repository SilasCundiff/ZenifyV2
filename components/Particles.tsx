import { useCallback, useMemo } from "react";

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { ISourceOptions } from "tsparticles-engine";

function ParticlesComponent() {
  const options: ISourceOptions = useMemo(() => {
    return {
      particles: {
        move: {
          enable: true,
          speed: { min: 0.5, max: 3 },
          direction: "bottom",
        },
        size: {
          value: { min: 0.5, max: 5 },
        },
        shape: {
          type: "circle",
        },
        color: {
          value: "#18D860",
          animation: {
            h: {
              enable: true,
              speed: 30,
              sync: true,
            },
          },
        },
      },
    };
  }, []);

  const particlesInit = useCallback((engine) => {
    return loadSlim(engine);
    // loadFull(engine);
  }, []);

  return <Particles init={particlesInit} options={options} />;
}

export default ParticlesComponent;
