"use client";

import { Label } from "@/components/ui/label";
import { fetchWithAuth } from "@/services/baseService";
import { uploadFileWithAuth } from "@/services/UploadService";
import { useEditorStore } from "@/store/store";
import { method } from "lodash";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { addImageTocanavs } from "@/fabric/Fabricutiles";

const Uploadpannel = () => {
  const { canvas } = useEditorStore();

  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userUploads, setUserUploades] = useState([]);

  const { data: session, status } = useSession();

  const featchUserUploads = useCallback(async () => {
    if (status !== "authenticated" || !session?.idToken) return;
    try {
      setLoading(true);
      const data = await fetchWithAuth("/v1/media/get");
      setUserUploades(data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [status, session?.idToken]);

  useEffect(() => {
    if (status === "authenticated") featchUserUploads();
  }, [status, featchUserUploads]);

  const handlefileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      console.log("No file selected ");
      return;
    }
    const file = files[0];
    setIsUploading(true);
    try {
      const response = await uploadFileWithAuth(file);
      // setUserUploades((prev) => [...response?.data, ...prev]);
      setUserUploades((prev) => [response?.data, ...prev]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleaddimage = (imageurl) => {
    if (!canvas) return;
    addImageTocanavs(canvas, imageurl);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        <Label
          className={
            "w-full flex items-center justify-center gap-4 py-3 px-4 bg-purple-600 rounded-md cursor-pointer h-12 font-medium transition-colors"
          }
        >
          <Upload className="w-5 h-5 " />
          <span>{isUploading ? "uploading..." : "upload Files"}</span>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            disabled={isUploading}
            onChange={handlefileUpload}
          />
        </Label>
        <div className="m-5">
          <h4 className="text-sm text-gray-500">your uploads</h4>
          {loading ? (
            <div className="border p-6 flex rounded-md items-center justify-center">
              <p className="font-bold text-sm ">Loading your uploads....</p>
            </div>
          ) : userUploads.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {userUploads.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleaddimage(item.url)}
                    className="aspect-auto bg-gray-50 rounded-md overflow-hidden hover:opacity-85 transition-opacity "
                  >
                    <img
                      // width={200}
                      // height={200}
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover transition-opacity relative group"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div>No uploads Yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Uploadpannel;
