"use client";
import { useTina } from "tinacms/dist/react";
import { Blocks } from "../../components/blocks";

export default function ClientPage(props: any) {
  const { data } = useTina(props);
  // @ts-ignore
  return <Blocks {...data?.page} />;
}
