import axios from "axios";
import { getSession } from "next-auth/react";
import { fetchWithAuth } from "./baseService";
import { method } from "lodash";

const API_URL = process.env.API_URL || "http://localhost:5000";

export async function uploadFileWithAuth(file, metaData = {}) {
  try {
    const session = await getSession();
    if (!session) {
      console.log("Not Authenticated");
    }

    const formData = new FormData();

    formData.append("file", file);
    Object.entries(metaData).forEach(([keyBy, value]) => {
      formData.append(keyBy, value);
    });

    try {
      const response = await axios.post(
        `${API_URL}/v1/media/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session.idToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error("upload Failed");
    }
  } catch (error) {
    console.log("REAL ERROR:", error.response || error.message);
    throw new Error("API REQUEST FAILED");
  }
}

export async function GenrateimageWithAi(prompt) {
  try {
    const response = await fetchWithAuth("/v1/media/upload/ai-image-genrate", {
      method: "POST",
      body: {
        prompt,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
