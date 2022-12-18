import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useRef } from "preact/hooks";
import SearchIcon from "https://deno.land/x/tabler_icons_tsx@0.0.1/tsx/report-search.tsx";

export default function Input(props: JSX.HTMLAttributes<HTMLInputElement>) {
  const inputEl = useRef<HTMLInputElement>(null);

  const handleEnterKeyPress = (e: KeyboardEvent) => {
    if (e.key == "Enter" && inputEl.current) {
      window.location.href = `/${inputEl.current.value}`;
    }
  };

  return (
    <div class="flex">
      <SearchIcon class="" />
      <input
        {...props}
        ref={inputEl}
        disabled={!IS_BROWSER || props.disabled}
        class={`p-2 bg-white rounded border(gray-500 2) disabled:(opacity-50 cursor-not-allowed) ${
          props.class ?? ""
        }`}
        onKeyPress={handleEnterKeyPress}
      />
    </div>
  );
}
