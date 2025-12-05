import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <Image src="/cat.gif" alt="cat" width={1000} height={1000} unoptimized/>
      </main>
    </div>
  );
}
