import { MovingBorder } from "@/components/ui/aceternity/moving-border";
import db from "../../../../_data/db.json";
import ContactItem from "./ContactItem";
import type { Dictionary } from "@/lib/dictionaries/types";

const ContactData = ({ dictionary }: { dictionary: Dictionary["contact"] }) => {
  const contacts = db.contacts.map((contact) => {
    if (contact.linkto === "#") return { ...contact, text: dictionary.birthday };
    if (contact.linkto.toLowerCase().includes("resume")) return { ...contact, text: dictionary.resume };
    if (contact.linkto.includes("maps")) return { ...contact, text: dictionary.location };
    return contact;
  });

  return (
    <MovingBorder className="p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-indigo-500 dark:text-indigo-300">
        {dictionary.eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight">{dictionary.title}</h2>
      <div className="mt-8 space-y-3">
        {contacts.map((contact) => (
          <ContactItem key={contact.text} contact={contact} />
        ))}
      </div>
    </MovingBorder>
  );
};

export default ContactData;
