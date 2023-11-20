import React, { useEffect } from "react";

const DownloadJson = ({ setIsDownloading, weatherdata }) => {
  useEffect(() => {
    if (!weatherdata) {
      setIsDownloading(false);
      return;
    }

    setIsDownloading(true);

    const jsonData = JSON.stringify(weatherdata, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      jsonData
    )}`;

    const a = document.createElement("a");
    a.href = dataUri;
    a.download = "data.json";
    a.click();

    a.addEventListener("click", () => {
      setIsDownloading(false);
      URL.revokeObjectURL(a.href);
    });
  }, [setIsDownloading, weatherdata]);

  return null;
};

export default DownloadJson;
