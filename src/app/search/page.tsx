import { Suspense } from "react";
import SearchPage from "./searchpage";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center pt-20">🔍 검색 중...</p>}>
      <SearchPage />
    </Suspense>
  );
}
