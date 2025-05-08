'use client';

import { Suspense } from "react";
import FullApplicationPage from "./FullApplicationPage";

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading application...</div>}>
      <FullApplicationPage />
    </Suspense>
  );
}
