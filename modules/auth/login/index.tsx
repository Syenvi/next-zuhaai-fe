"use client";
import React from "react";
import { AuroraBackground } from "./components/aurora-background";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "antd";
import GoogleLoginButton from "@/assets/icons/google/index";
import { handleLogin } from "./services";

const LoginView = () => {
  return (
    <AuroraBackground>
      <Card className="text-sm p-6 py-10 px-10 sm:py-19 sm:px-21 w-[550px] flex items-center justify-center backdrop-blur-lg bg-white/40">
        <CardContent className="flex-1 w-full flex items-center justify-center flex-col gap-4">
          <h3 className="font-bold text-2xl text-primary">Zuha ai</h3>
          <p className="font-semibold text-neutral-500 text-center text-sm">
            To use Zuha you must log into an existing account or create one
            using one of the options below
          </p>
          <Button className="!w-full" type="primary" onClick={handleLogin}>
            <GoogleLoginButton />
            Sign in with Google
          </Button>

          <small className="text-center text-neutral-500">
            By signing in, you accept the Terms of Service and acknowledge our
            Privacy Policy.
          </small>
        </CardContent>
      </Card>
    </AuroraBackground>
  );
};

export default LoginView;
