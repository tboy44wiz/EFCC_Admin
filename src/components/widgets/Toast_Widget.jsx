import { toast } from "react-toastify";

class ToastWidget {
  static successToast = (message) => {
    return toast.success(message, { hideProgressBar: true });
  };

  static warningToast = (message) => {
    return toast.warning(message, { hideProgressBar: true });
  };

  static errorToast = (message) => {
    return toast.error(message, { hideProgressBar: true });
  };
}

export default ToastWidget;