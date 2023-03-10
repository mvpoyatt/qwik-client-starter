import { component$, Slot, useClientEffect$ } from "@builder.io/qwik";

import HeaderLite from "~/components/widgets/HeaderLite";

export default component$(() => {
  useClientEffect$(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <>
      <HeaderLite />
      <main>
        <Slot />
      </main>
    </>
  );
});
