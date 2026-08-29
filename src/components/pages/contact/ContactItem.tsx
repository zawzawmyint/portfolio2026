import type { Contact } from "@/lib/types/definitions";
import {
  Cake,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { EditorialArrow } from "@/components/ui/EditorialArrow";

function getContactIcon(contact: Contact) {
  const className = "size-4";
  if (contact.linkto.startsWith("tel:")) return <Phone className={className} />;
  if (contact.linkto.startsWith("mailto:")) return <Mail className={className} />;
  if (contact.linkto.includes("linkedin")) return <Linkedin className={className} />;
  if (contact.linkto.includes("github")) return <Github className={className} />;
  if (contact.linkto.includes("resume") || contact.linkto.includes("Resume")) return <FileText className={className} />;
  if (contact.linkto.includes("maps")) return <MapPin className={className} />;
  return <Cake className={className} />;
}

const ContactItem = ({ contact }: { contact: Contact }) => {
  const external = contact.linkto.startsWith("http");
  const leftToRight =
    external || contact.linkto.startsWith("tel:") || contact.linkto.startsWith("mailto:");

  return (
    <Link
      href={contact.linkto}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="skeuo-inset group/link flex min-h-14 min-w-0 items-center gap-3 overflow-hidden rounded-2xl px-3 py-3 transition duration-300 hover:translate-x-1 hover:border-brand/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:gap-4 sm:px-4 rtl:hover:-translate-x-1"
    >
      <span className="skeuo-control grid size-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
        {getContactIcon(contact)}
      </span>
      <span
        className="min-w-0 flex-1 break-all text-sm font-medium sm:break-words sm:text-base"
        dir={leftToRight ? "ltr" : undefined}
      >
        {contact.text}
      </span>
      {external && (
        <EditorialArrow className="size-4 text-muted-foreground" />
      )}
    </Link>
  );
};

export default ContactItem;
