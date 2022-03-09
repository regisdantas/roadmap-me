import { useEffect } from "react";
import useDrivePicker from "react-google-drive-picker";

function GoogleDrive() {
  const [openPicker, data, authResponse] = useDrivePicker();
  const handleOpenPicker = () => {
    openPicker({
      clientId: "940532588381-6nv1140qkdkrb3vabajct66fbs2b33tm.apps.googleusercontent.com",
      developerKey: "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",
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
    });
  };

  useEffect(() => {
    if (data) {
      data.docs.map((i) => console.log(i));
    }
  }, [data]);

  return (
    <div>
      <button onClick={() => handleOpenPicker()}>Open Picker</button>
    </div>
  );
}

export default GoogleDrive;
