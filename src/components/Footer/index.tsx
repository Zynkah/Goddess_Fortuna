import { FC } from "react";
import { DiscordLogo } from "../../assets/logos/DiscordLogo";

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="hidden sm:inline text-secondary content-center">
          © 2026 Zynk LLC
        </div>{" "}
        <div className="flex m-auto sm:m-0">
          <DiscordLogo />
        </div>
      </div>
    </footer>
  );
};
