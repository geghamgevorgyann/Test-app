import Image from "next/image";
import HomeForm from "./components/HomeForm";
import { googleAnaliticsLogo } from "../../public/SVG";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-6xl font-bold text-center text-blue-800 dark:text-whiteimportant ">
          Welcome to the website
        </h1>
        <p className="import text-center text-blue-300 dark:text-gray-500important">
          Enter your email to receive information about the views of the Test
          website.
          <br />
          Information about page views is processed using the <br />
          <span className="text-blue-800 dark:text-whiteimportant ">
            {" "}
            Google Analytic API
          </span>
        </p>
      </div>
      {googleAnaliticsLogo}
      <HomeForm />
    </main>
  );
}
