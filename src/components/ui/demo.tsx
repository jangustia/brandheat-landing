import React from "react";
import Component from "@/components/ui/gradient-bars-background";

const settings = {
  numBars: 15,
  gradientColor: "rgb(255, 60, 0)",
};

export default function Demo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  return (
    <div className="h-screen w-screen">
      <Component numBars={s.numBars} gradientFrom={s.gradientColor} />
    </div>
  );
}

