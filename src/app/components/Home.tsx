"use client";
import Image from "next/image";
import { useState } from "react";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-6xl font-bold text-center text-blue-800 dark:text-white ">
          Welcome to the website
        </h1>
        <p className=" text-center text-blue-300 dark:text-gray-500">
          Enter your email to receive information about the views of the Test
          website.
          <br />
          Information about page views is processed using the <br />
          <span className="text-blue-800 dark:text-white ">
            {" "}
            Google Analytic API
          </span>
        </p>
        <p></p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
      </div>
      <input
        className="p-2 m-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white max-w-lg"
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
    </main>
  );
}
