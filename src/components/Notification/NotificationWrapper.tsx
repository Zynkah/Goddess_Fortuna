import {
  BadgeCheckIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XIcon,
} from "@heroicons/react/outline";

interface NotificationWrapperProps {
  children: React.ReactNode;
  type: "success" | "error" | "info" | "achievement";
  onHide?: () => void;
}

export const NotificationWrapper = ({
  children,
  type,
  onHide,
}: NotificationWrapperProps) => {
  const iconClassName =
    type === "error"
      ? "text-rose-300"
      : type === "info"
      ? "text-sky-300"
      : type === "achievement"
      ? "text-amber-300"
      : "text-emerald-300";

  return (
    <div
      className="pointer-events-auto mx-4 mb-12 mt-2 w-full max-w-sm overflow-hidden rounded-xl border border-white/15 bg-[#0f1220]/95 p-2 shadow-2xl backdrop-blur-sm"
    >
      <div className="rounded-lg border border-white/10 bg-white/5 p-2">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {type === "success" ? (
              <CheckCircleIcon className={`mr-1 h-8 w-8 ${iconClassName}`} />
            ) : null}
            {type === "info" && (
              <InformationCircleIcon className={`mr-1 h-8 w-8 ${iconClassName}`} />
            )}
            {type === "error" && (
              <XCircleIcon className={`mr-1 h-8 w-8 ${iconClassName}`} />
            )}
            {type === "achievement" && (
              <BadgeCheckIcon className={`mr-1 h-8 w-8 ${iconClassName}`} />
            )}
          </div>
          <div className="ml-2 w-0 flex-1">{children}</div>
          <div className="ml-4 flex flex-shrink-0 self-start">
            <button
              onClick={onHide}
              className="inline-flex rounded-md border border-white/15 bg-white/5 p-1 text-white/70 transition-colors duration-150 hover:bg-white/10 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
