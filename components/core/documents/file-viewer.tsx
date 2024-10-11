import Image from "next/image";
import { useState, useEffect } from "react";

interface FileViewerProps {
  fileBlob: Blob | undefined;
}

const FileViewer: React.FC<FileViewerProps> = ({ fileBlob }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>("");

  useEffect(() => {
    if (fileBlob) {
      const url = URL.createObjectURL(fileBlob);
      setFileUrl(url);
      setFileType(fileBlob.type);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [fileBlob]);

  if (!fileBlob) {
    return <div>No file provided</div>;
  }

  if (fileType.startsWith("image/")) {
    return (
      <Image
        src={fileUrl!}
        alt="Uploaded file"
        className="max-w-full max-h-full"
      />
    );
  } else if (fileType === "application/pdf") {
    return (
      <embed
        src={fileUrl!}
        type="application/pdf"
        width="100%"
        height="500px"
        className="pdf-viewer"
      />
    );
  }

  return <div>Unsupported file type: {fileType}</div>;
};

export default FileViewer;
