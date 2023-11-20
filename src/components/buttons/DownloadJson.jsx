import { useEffect } from "react";

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
    a.addEventListener('click', () => {
      setIsDownloading(false);
    });

    a.click();
  }, [setIsDownloading, weatherdata]);

  return null;
};

export default DownloadJson;
