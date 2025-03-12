import React from "react";
import { BackgroundGradientAnimation } from "./background-gradient-animation";

export function BrandGradientAnimation({ children }: { children?: React.ReactNode }) {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(3, 3, 5)" // space-dark
      gradientBackgroundEnd="rgb(8, 8, 15)" // space-light
      firstColor="0, 255, 225" // cosmic-teal
      secondColor="112, 0, 255" // cosmic-purple
      thirdColor="157, 78, 221" // cosmic-lavender
      fourthColor="255, 46, 147" // cosmic-pink
      fifthColor="255, 214, 10" // cosmic-yellow
      pointerColor="0, 255, 225" // cosmic-teal
      size="100%"
      blendingValue="hard-light"
      containerClassName="fixed inset-0 -z-10 opacity-50"
    >
      {children}
    </BackgroundGradientAnimation>
  );
} 