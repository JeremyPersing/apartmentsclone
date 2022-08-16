import { useAuth } from "../hooks/useAuth";
import { SignUpOrSignInScreen } from "./SignUpOrSignInScreen";
import { AddPropertySection } from "../components/AddPropertySection";

export const AddPropertyScreen = () => {
  const { user } = useAuth();

  if (!user) return <SignUpOrSignInScreen />;

  return <AddPropertySection />;
};
