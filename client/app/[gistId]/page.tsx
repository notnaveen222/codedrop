"use client";
import axios from "axios";
import { useParams } from "next/navigation";

export default function getGist() {
  const { gistId } = useParams<{ gistId: string }>();
  const getGist = async () => {
    const response = await axios.get("/");
  };
  return (
    <>
      <div>{gistId}</div>
    </>
  );
}
