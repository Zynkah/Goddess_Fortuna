export const ContactHeaderSection = () => {
  return (
    <div className="sub-container-teal lg:max-w-5xl m-auto">
      <h2 className="ev-header-teal">Contact Support</h2>
      <div className="p-4">
        <p>If you need assistance, please reach out to our support team.</p>
        <p>
          You can join the official{" "}
          <a
            href="https://discord.com/invite/eUEwY3vS8R"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="teal-text">Discord</span>
          </a>{" "}
          and talk to the community.{" "}
        </p>
        <p>Or fill out this form to send the team a direct message.</p>
      </div>
    </div>
  );
};
