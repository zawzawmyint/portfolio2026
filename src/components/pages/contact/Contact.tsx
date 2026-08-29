import ContactData from "./ContactData";
import ContactMap from "./ContactMap";
import type { Dictionary } from "@/lib/dictionaries/types";

const Contact = ({ dictionary }: { dictionary: Dictionary["contact"] }) => {
  return (
    <div
      id="contact-content"
      data-robot-guide="contactDetails"
      className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]"
    >
      <ContactData dictionary={dictionary} />
      <ContactMap title={dictionary.mapLabel} />
    </div>
  );
};

export default Contact;
