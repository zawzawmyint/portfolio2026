import Logo from "@/components/generic/Logo";
import { ModeToggle } from "../modetoggle/ModeToggle";
import { MobileDrawer } from "./MobileDrawer";
import { Navs } from "./Navs";
import Socials from "./Socials";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Dictionary } from "@/lib/dictionaries/types";

const Header = ({ dictionary }: { dictionary: Dictionary["common"] }) => {
  return (
    <header className="sticky left-0 top-0 z-50 px-3 py-3 sm:px-5">
      <div className="skeuo-panel skeuo-screws relative mx-auto flex min-h-14 max-w-6xl items-center justify-between rounded-[1.125rem] px-5 py-2 backdrop-blur-2xl sm:px-6">
        <div className="flex items-center justify-center gap-2">
          <Logo />
          <div className="hidden sm:block">
            <Navs dictionary={dictionary.navigation} />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <Socials className="hidden sm:flex" />
          <LanguageSwitcher controls={dictionary.controls} languages={dictionary.languages} />
          <ModeToggle label={dictionary.controls.toggleTheme} />
          <div className="sm:hidden">
            <MobileDrawer dictionary={dictionary} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
