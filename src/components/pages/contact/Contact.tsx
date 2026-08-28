import ContactData from "./ContactData";
import ContactMap from "./ContactMap";
import type { Dictionary } from "@/lib/dictionaries/types";

const Contact = ({ dictionary }: { dictionary: Dictionary["contact"] }) => {
  return (
    <div
      id="contact-content"
      data-robot-guide="contactDetails"
      className="grid items-start gap-6 lg:grid-cols-2"
    >
      <ContactData dictionary={dictionary} />
      <ContactMap title={dictionary.mapLabel} />
    </div>
  );
};

export default Contact;
