import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastMessage = (type, messages, position = "bottom-right") => {
  toast[type](messages, {
    position: position,
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    className: "toast",
  });
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
