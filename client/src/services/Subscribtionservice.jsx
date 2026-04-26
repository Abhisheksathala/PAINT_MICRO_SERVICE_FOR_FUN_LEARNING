import { fetchWithAuth } from "./baseService";

export async function getSubscription() {
  try {
    const response = await fetchWithAuth(`/v1/subscriptions`, {
      method: "GET",
    });
    alert(JSON.stringify(response))  
    
    return response
  } catch (error) {
    console.log(error);
  }
}
