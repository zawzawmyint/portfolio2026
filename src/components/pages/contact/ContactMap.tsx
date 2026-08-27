import { MovingBorder } from "@/components/ui/aceternity/moving-border";

const ContactMap = ({ title }: { title: string }) => {
  return (
    <MovingBorder className="h-[32rem] overflow-hidden p-1">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d496109.2143564677!2d100.6244319!3d13.7273339!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6032280d61f3%3A0x10100b25de24820!2sBangkok!5e0!3m2!1sen!2sth!4v1752338594698!5m2!1sen!2sth"
        className="h-full w-full rounded-[calc(1rem-4px)] grayscale-[0.35] transition duration-700 hover:grayscale-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        allowFullScreen
      />
    </MovingBorder>
  );
};

export default ContactMap;
