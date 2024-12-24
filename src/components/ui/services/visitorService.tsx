// services/visitorService.tsx
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/check-visitor";

if (!process.env.NEXT_PUBLIC_API_URL) {
  console.error("Environment variable NEXT_PUBLIC_API_URL is not defined. Using default URL.");
} else {
  console.log("API_URL is set to:", API_URL);
}

export const getVisitorPosition = async (): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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