import {
  Slot,
  useRouter,
  useSegments,
  useRootNavigationState,
} from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

function InitialLayout() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    // Se estiver carregando ou o roteador não estiver pronto ele para
    if (isLoading || !rootNavigationState?.key) return;

    const inAppGroup = segments[0] === "(app)";

    setTimeout(() => {
      if (user && !inAppGroup) {
        router.replace("/(app)/dashboard");
      } else if (!user && inAppGroup) {
        router.replace("/");
      }
    }, 10);
  }, [user, segments, isLoading, rootNavigationState?.key]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
