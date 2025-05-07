import { Suspense } from "react";

export default function ({ children }) {
  return (
    <div>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
