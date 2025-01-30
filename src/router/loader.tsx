import { useLoaderData } from "react-router-dom";
import usePublic from "../methods/public";

export async function loader() {
  const response = await fetch('/categories'); // Replace with your API
  const data = await response.json();
  return data;
}

export default function Page() {
  const data = useLoaderData();

  return (
    <div>
      <h1>Page Content</h1>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  );
}
