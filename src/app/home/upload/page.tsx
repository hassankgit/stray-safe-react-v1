"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import { api } from "@/app/api";
import { UploadResponseDto } from "@/swagger/swagger";
import UploadSightingForm from "@/components/upload/UploadSightingForm";
import { FaDog } from "react-icons/fa6";
import imageCompression from "browser-image-compression";

export default function Upload() {
  const [uploadResponse, setUploadResponse] = useState<UploadResponseDto>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const response = await api.sighting.upload(compressedFile);
      if (response.ok && response.data) {
        setUploadResponse(response.data);
        setIsLoading(false);
        setIsFileUploaded(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Upload failed", error);
    }
  };

  return (
    <div className={styles.body}>
      {isLoading ? (
        <div className={styles.loader_wrapper}>
          <FaDog className={styles.loader} />
        </div>
      ) : !isFileUploaded ? (
        <>
          <img
            className={styles.image}
            src="/images/fileupload_coral_labelled.png"
            alt="file upload image"
          />
          <label className={styles.primary}>
            Upload a photo
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isLoading}
              className={styles.hidden_input}
            />
          </label>
        </>
      ) : (
        <>
          <UploadSightingForm
            url={uploadResponse?.url ?? null}
            coordinates={uploadResponse?.coordinates}
          />
        </>
      )}
      {}
    </div>
  );
}
