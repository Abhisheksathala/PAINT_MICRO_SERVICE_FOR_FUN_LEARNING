"use client";

import { Label } from "@/components/ui/label";
import { fetchWithAuth } from "@/services/baseService";
import { useEditorStore } from "@/store/store";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

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
      console.log(data, "featch user uploads");
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
    console.log(e.target.files);
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
      </div>
    </div>
  );
};

export default Uploadpannel;
