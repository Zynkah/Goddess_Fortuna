import { FC } from "react";
import { TwitterLogo } from "../../assets/logos/TwitterLogo";
import { DiscordLogo } from "../../assets/logos/DiscordLogo";

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="hidden sm:inline text-secondary content-center">
          © 2026 Goddess Fortuna
        </div>{" "}
        <div className="flex m-auto sm:m-0">
          <TwitterLogo />
          <DiscordLogo />
        </div>
      </div>
    </footer>
  );
};
