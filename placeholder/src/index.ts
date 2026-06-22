import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("todayspicks", (c) => {
  const exampleObject = {
    1: {
      websiteName: "PrivacyGuides",
    },
  };

  return c.json(exampleObject);
});

export default app;
