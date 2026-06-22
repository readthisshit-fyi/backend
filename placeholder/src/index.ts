import { Hono } from "hono";
import type * as types from "./type-templates.ts";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/todayspicks", (c) => {
  const titles = ["HackerNews", "CSS Tricks", "DevDocs", "Lobsters", "Smashing Mag", "The Odin Project", "Roadmap.sh", "MDN Web Docs"];
  const descs = [
    "You know that feeling when you open a tab and three hours disappear? Yeah. That's this site. Godspeed.",
    "Actually useful enough that you'll feel guilty for not finding it sooner. Bookmarked, referenced, respected.",
    "The kind of site that makes you question why you ever used anything else. A little annoying honestly.",
    "Stumbled across this at 2am and now it lives rent free in my browser bar. No regrets whatsoever.",
    "Genuinely can't tell if this is peak internet or just exactly what I needed. Maybe both. Probably both.",
    "The tutorial that finally made it click. You know the one. Every developer has one. This is that one.",
    "Looks rough on the surface but dig in for five minutes and you'll understand why everyone links it.",
    "Zero ads, zero fluff, just the thing you were looking for. Rare. Precious. Treat it with respect.",
    "The kind of resource that gets shared in Discord servers at 3am with no context and zero explanation.",
    "Opens fast, explains well, doesn't talk down to you. Revolutionary concept apparently. Genuinely love it.",
  ];
  const categories = ["Dev", "Design", "Tools", "News", "Learning", "Fun"];
  const domains = ["example.com", "placeholder.dev", "fake-site.io", "notreal.tech", "mock.fyi"];

  const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  const randNum = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const websites: types.Website[] = Array.from({ length: 6 }, (_, i) => ({
    WID: randNum(1000, 9999),
    websiteTitle: rand(titles),
    websiteDesc: rand(descs),
    websiteURL: `https://${rand(domains)}`,
    websiteCategory: rand(categories),
    rating: parseFloat((Math.random() * 4 + 1).toFixed(1)),
    fishCount: randNum(0, 500),
    images: Array.from({ length: randNum(1, 3) }, (_, j) => `https://picsum.photos/seed/${i}${j}/400/300`),
  }));

  console.log("returning a list of websites...");

  return c.json(websites);
});

export default app;
