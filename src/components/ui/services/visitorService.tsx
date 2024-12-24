const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/check-visitor";

export const getVisitorPosition = async (): Promise<string> => {
  try {
    let visitorId = localStorage.getItem("visitorId");

    if (!visitorId) {
      visitorId = `${Date.now()}-${Math.random()}`;
      localStorage.setItem("visitorId", visitorId); 
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorId: visitorId, 
      }),
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