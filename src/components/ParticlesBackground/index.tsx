import {
  default as ParticlesElement,
  initParticlesEngine,
} from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { memo, useEffect, useMemo, useState } from "react";

export const ParticlesBackground = memo(() => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(() => {
    return {
      fpsLimit: 120,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      particles: {
        color: {
          value: [
            "#c9a227",
            "#e6c34d",
            "#e8d5a0",
            "#cbb884",
            "#8a7a52",
            "#8f7c48",
            " #6f6034",
          ],
        },
        collisions: {
          enable: true,
        },
        move: {
          enable: true,
          random: false,
          speed: 0.5,
          direction: "top",
        },
        number: {
          value: 200,
        },
        opacity: {
          value: 1,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 0.5, max: 0.75 },
        },
      },
    } as any;
  }, []);

  return (
    <div className="particles-wrapper ">
      {init && <ParticlesElement id="tsparticles" options={options} />}
    </div>
  );
});
