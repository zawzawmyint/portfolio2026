"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const Logo = () => {
  const params = useParams();
  const lang = params.lang as string;
  return (
    <Link href={`/${lang}`}>
      <Image
        src={"/images/intro/Zack.dev.png"}
        alt="logo"
        width={100}
        height={100}
        className="h-5 w-auto duration-200 hover:scale-95"
      />
    </Link>
  );
};

export default Logo;
