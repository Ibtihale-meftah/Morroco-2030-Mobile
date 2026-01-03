import { LanguageProvider } from "@/context";
import React, { JSX } from "react";
import LanguageModal from "../modal";

export default function MapScreen(): JSX.Element {
  return (
<LanguageProvider>
<LanguageModal />
</LanguageProvider>
);
}