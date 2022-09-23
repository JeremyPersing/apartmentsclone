import { useUser } from "../hooks/useUser";
import { SignUpOrSignInScreen } from "./SignUpOrSignInScreen";
import { AddPropertySection } from "../components/AddPropertySection";

export const AddPropertyScreen = () => {
  const { user } = useUser();

  if (!user) return <SignUpOrSignInScreen />;

  return <AddPropertySection />;
};
