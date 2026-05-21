const authErrorMessage = (error) => {
  if (error?.code === "auth/account-exists-with-different-credential") {
    return "An account already exists with this email. Please sign in using the original method for that email first.";
  }

  if (error?.code === "auth/popup-closed-by-user") {
    return "Google sign-in was closed before completion.";
  }

  if (error?.code === "auth/cancelled-popup-request") {
    return "Another Google sign-in popup is already open.";
  }

  if (error?.code === "auth/unauthorized-domain") {
    return "This domain is not authorized in Firebase Authentication settings.";
  }

  if (error?.code === "auth/invalid-credential") {
    return "Invalid email or password.";
  }

  if (error?.code === "auth/email-already-in-use") {
    return "This email is already registered. Please login instead.";
  }

  return error?.message || "Authentication failed";
};

export default authErrorMessage;
