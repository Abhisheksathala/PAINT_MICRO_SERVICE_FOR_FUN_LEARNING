import { fetchWithAuth } from "./baseService";

export async function getuserDesigns() {
  try {
    return fetchWithAuth("/v1/designs", {
      method: "GET",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getuserDesignByID(designID) {
  try {
    return fetchWithAuth(`/v1/designs/${designID}`, {
      method: "GET",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function SaveDesign(designData, designId = null) {
  try {
    return fetchWithAuth(`/v1/designs`, {
      method: "POST",
      body: {
        ...designData,
        designId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}


export async function DeleteDesign(designID) {
  try {
    return fetchWithAuth(`/v1/designs/${designID}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
}
