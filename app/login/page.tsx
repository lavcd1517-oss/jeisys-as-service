import AuthForm from "../_components/auth-form";
import { signIn } from "../auth-actions";

export default function LoginPage() {
  return <AuthForm mode="login" action={signIn} />;
}
