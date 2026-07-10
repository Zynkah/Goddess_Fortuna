import { HeaderText } from "components/shared/HeaderText";
import { FAQData } from "../../data/FAQData";
import { PageWrapper } from "../../components/shared/PageWrapper";

const containerClasses = [
  "sub-container-purple",
  "sub-container-red",
  "sub-container-teal",
];

const headerClasses = ["ev-header-purple", "ev-header-red", "ev-header-teal"];

export const FAQPage = () => {
  return (
    <PageWrapper>
      <HeaderText text="F.A.Q." />
      <div className=" flex flex-col gap-6 text-left">
        {FAQData.map((faq, index) => (
          <div
            key={index}
            className={`lg:mb-0 mb-6 shadow-sm ${
              containerClasses[index % containerClasses.length]
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-2 ${
                headerClasses[index % headerClasses.length]
              }`}
            >
              {faq.question}
            </h2>
            <p className="p-4 text-lg">{faq.answer}</p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};
