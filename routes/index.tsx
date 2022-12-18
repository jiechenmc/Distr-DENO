import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import Input from "../islands/Input.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Distr</title>
      </Head>
      <Header active="/" />
      <img src="/chart" class="w-[70%] h-[70%]" />
      <Input />
    </>
  );
}
