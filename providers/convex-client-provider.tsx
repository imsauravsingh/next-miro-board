"use client";

import { ClerkProvider, useAuth, SignInButton, SignIn } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  AuthLoading,
  Authenticated,
  Unauthenticated,
  ConvexReactClient,
} from "convex/react";
import { Loading } from "@/components/auth/loading";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="flex items-center justify-center h-full">
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
