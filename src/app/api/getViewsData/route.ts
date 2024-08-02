import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { NextResponse } from "next/server";

export async function GET() {
  const client = new BetaAnalyticsDataClient({
    keyFilename:
      "/Users/gegham/Downloads/studied-glow-431220-e3-c701d1978391.json",
  });

  const propertyId = "452343619";

  try {
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: "7daysAgo",
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "country",
        },
      ],
      metrics: [
        {
          name: "activeUsers",
        },
      ],
    });


    const rows = response.rows || [];

    
    const viewsData = rows.map((row: any) => ({
      country: row.dimensionValues[0].value,
      views: row.metricValues[0].value,
    }));
    return NextResponse.json(viewsData);
  } catch (error) {
    console.error("Error fetching Google Analytics data:", error);
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 }
    );
  }
}
