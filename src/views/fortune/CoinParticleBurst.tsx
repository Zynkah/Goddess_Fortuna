import { useMemo } from "react";

interface CoinParticleBurstProps {
  golden?: boolean;
}

export const CoinParticleBurst = ({ golden = false }: CoinParticleBurstProps) => {
  const particleCount = golden ? 24 : 12;

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => {
        const angle = (360 / particleCount) * i + (Math.random() * 10 - 5);
        const distance = golden ? 70 + Math.random() * 30 : 50 + Math.random() * 20;
        const delay = Math.random() * 0.15;
        return { angle, distance, delay };
      }),
    [particleCount, golden]
  );

  return (
    <>
      {particles.map((particle, i) => (
        <span
          key={i}
          className="fortuna-burst-particle"
          style={
            {
              "--angle": `${particle.angle}deg`,
              "--distance": `${particle.distance}px`,
              animationDelay: `${particle.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
};
