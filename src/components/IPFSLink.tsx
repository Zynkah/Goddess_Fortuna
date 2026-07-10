import { FC, ReactNode, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { isIPFS, navigateIPFS } from "../utils/ipfsRouter";

interface IPFSLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export const IPFSLink: FC<IPFSLinkProps> = ({
  href,
  children,
  className,
  onClick,
}) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (isIPFS) {
      e.preventDefault();
      navigateIPFS(href);
    }
  };

  if (isIPFS) {
    return (
      <a href={href} className={className} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};
