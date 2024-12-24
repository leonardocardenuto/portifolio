// services/visitorService.tsx
const API_URL = "http://localhost:4000/check-visitor";

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
