import { Suspense } from "react";
import SuccessClient from "./successclient";

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="min-h-screen flex items-center justify-center">Loading...</p>}>
      <SuccessClient />
    </Suspense>
  );
}