import { useEffect } from "react";
import useNotificationStore from "../../stores/useNotificationStore";
import { useNetworkConfiguration } from "../../contexts/NetworkConfigurationProvider";
import { NotificationWrapper } from "./NotificationWrapper";

const NotificationList = () => {
  const { notifications, set: setNotificationStore } = useNotificationStore(
    (s) => s
  );

  const reversedNotifications = [...notifications].reverse();

  return (
    <div
      className={`z-20 fixed inset-20 flex items-end px-4 py-6 pointer-events-none sm:p-6`}
    >
      <div className={`flex flex-col w-full`}>
        {reversedNotifications.map((n, idx) => (
          <Notification
            key={`${n.message}${idx}`}
            type={n.type}
            message={n.message}
            description={n.description}
            txid={n.txid}
            onHide={() => {
              setNotificationStore((state: any) => {
                const reversedIndex = reversedNotifications.length - 1 - idx;
                state.notifications = [
                  ...notifications.slice(0, reversedIndex),
                  ...notifications.slice(reversedIndex + 1),
                ];
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

interface NotificationProps {
  type: "success" | "error" | "info" | "achievement";
  message: string;
  description?: string;
  txid?: string;
  onHide: () => void;
}

const Notification = ({
  type,
  message,
  description,
  txid,
  onHide,
}: NotificationProps) => {
  const { networkConfiguration } = useNetworkConfiguration();

  useEffect(() => {
    const id = setTimeout(() => {
      onHide();
    }, 8000);

    return () => {
      clearInterval(id);
    };
  }, [onHide]);

  return (
    <NotificationWrapper type={type} onHide={onHide}>
      <div className="font-bold text-white">{message}</div>
      {description ? (
        <p className="mt-0.5 text-sm text-white/75">{description}</p>
      ) : null}
      {txid ? (
        <div className="flex flex-row">
          <a
            href={
              "https://solscan.io/tx/" +
              txid +
              `?cluster=${networkConfiguration}`
            }
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex items-center rounded-md border border-emerald-300/30 bg-emerald-300/10 px-2 py-1 text-xs font-medium text-emerald-200 transition-colors duration-150 hover:bg-emerald-300/20"
          >
            <svg
              className="mt-0.5 h-4 w-4 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
            <div className="mx-2 flex">
              {txid.slice(0, 8)}...
              {txid.slice(txid.length - 8)}
            </div>
          </a>
        </div>
      ) : null}
    </NotificationWrapper>
  );
};

export default NotificationList;
