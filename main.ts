import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

const route = app
  .post(
    "/posts",
    zValidator(
      "json",
      z.object({
        title: z.string(),
      }),
    ),
    zValidator(
      "header",
      z.object({
        apiKey: z.string(),
      }),
    ),
    (c) => {
      console.log(c.req.header('apiKey'))
      const data = c.req.valid("json");
      const header = c.req.valid("header");
      return c.json({
        data,
        header,
      });
    },
  );

export type AppType = typeof route;

Deno.serve({ port: 8787 }, app.fetch);
