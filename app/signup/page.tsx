import AuthForm from "../_components/auth-form";
import { signUp } from "../auth-actions";

export default function SignupPage() {
  return <AuthForm mode="signup" action={signUp} />;
}
