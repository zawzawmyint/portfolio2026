import Introduction from "./introduction/Introduction";
import type { Dictionary } from "@/lib/dictionaries/types";
import type { Locale } from "@/lib/dictionaries/dictionaries";

const Home = ({
  dictionary,
  lang,
}: {
  dictionary: Dictionary["home"]["introduction"];
  lang: Locale;
}) => {
  return (
    <div>
      <Introduction dictionary={dictionary} lang={lang} />
    </div>
  );
};

export default Home;
