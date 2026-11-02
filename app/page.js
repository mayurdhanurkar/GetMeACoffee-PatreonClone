import Extra from "@/components/extra"
import About from "@/components/about"
import Link from "next/link";

export default function Home() {
  return (
   <div className="">
    <div className="flex min-h-[50svh] flex-col items-center justify-center py-2 text-white">
      <p className="md:text-4xl text-2xl font-bold flex items-center justify-center">Buy Me A Coffee
        <span><img src="/coffee.gif" className="w-20 md:w-[100px]" alt="Coffee gif" /></span>
      </p>
      <p className="text-lg mt-4 text-center px-2">
        Support your favorite developer or creator by buying them a coffee!
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3 px-2">
        <Link href="/login" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">
          Buy Me A Coffee
        </Link>
        <Link href="/about" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">
          Read More
        </Link>
      </div>
    </div>
    <div className="bg-white opacity-10 h-1"></div>
    <Extra />
    <div className="bg-white opacity-10 h-1"></div>
    <About />
    </div>
  );
}

export const metadata = {
  title: 'Home | Get Me A Coffee',
  description: 'Support your favorite developer or creator by buying them a coffee!',
}