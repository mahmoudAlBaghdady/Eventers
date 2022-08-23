import toast from "react-hot-toast";

export const succesToast = (text: string) => {
  toast.success(text, {
    style: {
      border: "1px solid #378DFC",
      padding: "16px",
      color: "#378DFC",
      backgroundColor: "#D9E3F1",
    },
    iconTheme: {
      primary: "#378DFC",
      secondary: "#D9E3F1",
    },
  });
};
export const alertToast = (text: string) => {
  toast.error(text, {
    style: {
      border: "1px solid #E52527",
      padding: "16px",
      color: "#E52527",
      backgroundColor: "#D9E3F1",
    },
    iconTheme: {
      primary: "#E52527",
      secondary: "#D9E3F1",
    },
  });
};
