import { AppType } from "./main.ts";
import { hc } from "hono/client";

const client = hc<AppType>("http://localhost:8787");

const res = await client.posts.$post({
  json: {
    title: "Hello"
  },
  header: {
    apiKey: "supersecret",
  },
});

const data = await res.json();
console.log(data);
