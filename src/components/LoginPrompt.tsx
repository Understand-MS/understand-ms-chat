import { GoogleLoginButton, FacebookLoginButton } from "react-social-login-buttons";
import { useAuth } from "@/context/AuthContext";

const LoginPrompt = () => {
  const { login } = useAuth();

  return (
    <div className="px-4 py-6 flex flex-col gap-3">
      <p className="text-sm text-muted-foreground mb-1">
        Sign in to view your previous conversations.
      </p>
      <GoogleLoginButton onClick={() => login("google")} />
      <FacebookLoginButton onClick={() => login("facebook")} />
    </div>
  );
};

export default LoginPrompt;
