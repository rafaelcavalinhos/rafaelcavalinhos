import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center bg-white h-full w-full">
        <Image src="/cat.gif" alt="cat" width={1000} height={1000} unoptimized/>
    </div>
  );
}
