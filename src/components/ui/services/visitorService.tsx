// services/visitorService.tsx
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/check-visitor";

export const getVisitorPosition = async (): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch visitor position");
    }

    const visitorId = response.headers.get('set-cookie');

    if (visitorId) {
      document.cookie = `visitorId=${visitorId}; path=/; max-age=3600; secure; samesite=None`;
    }

    const data = await response.json();
    return data.position;
  } catch (error) {
    console.error("Error fetching visitor position:", error);
    return "";
  }
};