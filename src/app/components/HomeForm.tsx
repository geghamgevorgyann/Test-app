"use client";
import Image from "next/image";
import { useState } from "react";
import { googleAnaliticsLogo } from "../../../public/SVG";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState("");
  const handleButtonClick = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/getViewsData");

      if (!response.ok) {
        throw new Error("Failed to fetch views data");
      }

      const viewsData = await response.json();

      if (viewsData.length > 0) {
        const emailContent = viewsData
          .map(
            (data: any) =>
              `- Country: ${data.country}\n - Number of Views: ${data.views}\n`
          )
          .join("\n");

        const emailResponse = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: sendingEmail,
            subject: "Website Views Data",
            text: `
Hello, I hope this message finds you well. Here is the latest report on the website views, broken down by country:
${emailContent}
This data reflects the website activity for the specified period. Please let me know if you need any further insights or analysis.
Thank you for your attention.
Best regards,
Admin
            `,
          }),
        });

        if (emailResponse.ok) {
          alert("Email sent successfully!");
        } else {
          alert("Failed to send email.");
        }
      } else {
        alert("No views data available.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="flex flex-col items-center justify-center gap-14 w-1/2 ">
      <input
        className="p-2 m-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500important dark:bg-gray-800important dark:text-whiteimportant max-w-lg"
        type="email"
        placeholder="Enter your email"
        value={sendingEmail}
        onChange={(e) => setSendingEmail(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleButtonClick}
        disabled={loading || sendingEmail === ""}
      >
        {sendingEmail === ""
          ? "Enter your email"
          : loading
          ? "Sending..."
          : "Send Email"}
      </button>
    </form>
  );
}
