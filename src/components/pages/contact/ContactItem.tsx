import type { Contact } from "@/lib/types/definitions";
import {
  ArrowUpRight,
  Cake,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

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
      className="skeuo-inset group flex min-h-14 items-center gap-4 rounded-2xl px-4 py-3 transition duration-300 hover:translate-x-1 hover:border-indigo-400/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rtl:hover:-translate-x-1"
    >
      <span className="skeuo-control grid size-10 shrink-0 place-items-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-300">
        {getContactIcon(contact)}
      </span>
      <span
        className="min-w-0 flex-1 break-words text-sm font-medium sm:text-base"
        dir={leftToRight ? "ltr" : undefined}
      >
        {contact.text}
      </span>
      {external && (
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
      )}
    </Link>
  );
};

export default ContactItem;
