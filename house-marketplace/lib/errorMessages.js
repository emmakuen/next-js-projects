import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const errors = Object.freeze({
  "(auth/email-already-exists).": "Email already exists",
  "(auth/invalid-credential).": "Invalid credential",
  "(auth/invalid-email).": "Invalid email",
  "(auth/wrong-password).": "Invalid credential",
  "(auth/user-not-found).": "Invalid credential",
  "(auth/email-already-in-use).": "Email already exists",
});

export const showError = (errorStatus) => {
  if (errorStatus in errors) {
    toast.error(errors[errorStatus]);
  } else {
    toast.error("Something went wrong.");
  }
};
