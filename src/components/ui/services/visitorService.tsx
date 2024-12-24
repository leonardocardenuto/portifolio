const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/check-visitor";

export const getVisitorPosition = async (): Promise<string> => {
  try {
    const visitorId = document.cookie
      .split('; ')
      .find(row => row.startsWith('visitorId='))
      ?.split('=')[1];

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Visitor-Id": visitorId || "",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch visitor position");
    }

    const data = await response.json();
    return data.position;
  } catch (error) {
    console.error("Error fetching visitor position:", error);
    return "";
  }
};