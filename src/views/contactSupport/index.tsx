import { PageWrapper } from "../../components/shared/PageWrapper";
import { ContactHeaderSection } from "./ContactHeaderSection";
import { ContactFormSection } from "./ContactFormSection";

export const ContactSupportView = () => {
  return (
    <PageWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <ContactHeaderSection />
        <ContactFormSection />
      </div>
    </PageWrapper>
  );
};
