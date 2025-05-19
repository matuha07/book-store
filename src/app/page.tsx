import Image from "next/image";
import { Header } from "@/components/shared/Header";
import  Welcome  from "@/components/Welcome";

export default function Home() {
  return (
    <>
      <Header />
      <Welcome />
    </>

  );
}
