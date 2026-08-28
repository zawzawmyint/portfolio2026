const ContactMap = ({ title }: { title: string }) => {
  return (
    <div className="h-[34rem] overflow-hidden rounded-[1.75rem] border border-border/70 bg-muted p-2 lg:h-[42rem]">
      <iframe
        src="https://www.google.com/maps?q=Dubai%2C%20United%20Arab%20Emirates&output=embed"
        className="h-full w-full rounded-[1.25rem] grayscale-[0.55] transition duration-700 hover:grayscale-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        allowFullScreen
      />
    </div>
  );
};

export default ContactMap;
