import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastMessage = (type, messages, position = "bottom-right") => {
  toast[type](messages, {
    position: position,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const toastPromise = (promise, defaultMessages, options = {}) => {
  const { pending, success, error } = defaultMessages;

  return toast.promise(
    promise,
    {
      pending: pending || "Processing...",
      success: {
        render({ data }) {
          return data?.data?.message || success || "Action successful!";
        },
      },
      error: {
        render({ data }) {
          return data?.response?.data?.message || error || "An error occurred!";
        },
      },
    },
    {
      position: options.position || "bottom-right",
      autoClose: options.autoClose || 2500,
      hideProgressBar: options.hideProgressBar ?? false,
      closeOnClick: options.closeOnClick ?? true,
      pauseOnHover: options.pauseOnHover ?? true,
      draggable: options.draggable ?? true,
      theme: options.theme || "light",
    }
  );
};

// import { toast } from "react-hot-toast";

// export const toastMessage = (type, messages, position = "top-center") => {
//   if (type === "success") {
//     toast.success(messages, {
//       position,
//       duration: 2500,
//     });
//   } else if (type === "error") {
//     toast.error(messages, {
//       position,
//       duration: 2500,
//     });
//   } else {
//     toast(messages, {
//       position,
//       duration: 2500,
//     });
//   }
// };
