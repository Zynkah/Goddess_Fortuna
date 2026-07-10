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
            "#7d90ed",
            "#a27ded",
            "#90ed7d",
            "#f05d80",
            "#7dedda",
            "#7dc8ed",
            "#2ecdc9",
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
