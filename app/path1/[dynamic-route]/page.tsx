"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    return () => {
      // The log shoulnt be printed in dev more than once, and zero times in prod.
      // unless we actually route away.
      console.log("Dynamic route unmounted :(");
    };
  }, []);

  // This is expected to run once as long as we stay at the path1/x page scope (and user did not refresh or something)
  useEffect(() => {
    const t = setTimeout(() => {
      router.push(`/path1/${Math.random()}`);
    }, 3000);

    return () => {
      clearTimeout(t);
    };
  }, []);

  return (
    <div>
      See logs, `Dynamic route unmounted` should be printed once in dev mode,
      and zero times in prod. Also, the url should change once in dev/prod
    </div>
  );
}
