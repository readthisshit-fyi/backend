import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

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

const firstNames = ["Alex", "Sam", "Jordan", "Taylor", "Casey", "Morgan", "Riley", "Jamie", "Quinn", "Drew"];
const lastNames = ["Rivera", "Chen", "Patel", "Kim", "Müller", "Garcia", "Thompson", "Okafor", "Sato", "Dubois"];

const reviewTexts = [
  "This resource completely changed how I approach this topic. The explanations are clear and the examples actually make sense. I've already recommended it to three teammates.",
  "Incredibly well put together. The depth is perfect — not too shallow, not overwhelmingly academic. Exactly what I needed after struggling with other tutorials.",
  "Been using this daily for the past two weeks. It's become my go-to reference. The UI is clean and it loads instantly. Small details like this make a huge difference.",
  "Found this at 1am and stayed up way too late exploring. Worth every minute. The community around it is also surprisingly helpful.",
  "Solid resource. A few small things could be improved but overall it's one of the better ones out there. Saved me hours of frustration.",
  "This is the kind of site that restores your faith in the internet. No nonsense, just high-quality content delivered beautifully.",
  "The examples are gold. I finally understood the concept after seeing the third one. The author clearly knows how to teach.",
  "Pretty good overall. Some sections are better than others but definitely bookmark-worthy. I'll be coming back to this one.",
  "Mind-blowingly good. I wish more educational content was made with this level of care and attention to detail.",
];

app.use(
  "*",
  cors({
    origin: "http://localhost:4321",
  }),
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/todayspicks", async (c) => {
  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const generateReviews = (count = randNum(4, 10)) => {
    return Array.from({ length: count }, () => {
      const date = new Date();
      date.setDate(date.getDate() - randNum(1, 90));

      return {
        author: `${rand(firstNames)} ${rand(lastNames)}`,
        rating: randNum(3, 5),
        date: date.toISOString(),
        text: rand(reviewTexts),
      };
    });
  };

  const creatorDate = new Date();
  creatorDate.setDate(creatorDate.getDate() - randNum(1, 90));

  const moderatorDate = new Date();
  moderatorDate.setDate(moderatorDate.getDate() - randNum(1, 90));

  const websites = Array.from({ length: 6 }, (_, i) => ({
    WID: randNum(1000, 9999),
    websiteTitle: rand(titles),
    websiteDesc: rand(descs),
    websiteURL: `https://${rand(domains)}`,
    websiteCategory: rand(categories),
    rating: parseFloat((Math.random() * 4 + 1).toFixed(1)),
    fishCount: randNum(0, 500),
    images: Array.from(
      { length: randNum(1, 3) },
      (_, j) => `https://picsum.photos/seed/${i}${j}/${randNum(800, 2400)}/${randNum(800, 2400)}`,
    ),
    creator: {
      name: `${rand(firstNames)} ${rand(lastNames)}`,
      date: creatorDate.toISOString(),
    },
    moderator: {
      name: `${rand(firstNames)} ${rand(lastNames)}`,
      date: moderatorDate.toISOString(),
    },

    reviews: generateReviews(),
  }));

  console.log("returning a list of websites... " + Math.random());

  return c.json(websites);
});

app.get("/featured", async (c) => {
  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const generateReviews = (count = randNum(4, 10)) => {
    return Array.from({ length: count }, () => {
      const date = new Date();
      date.setDate(date.getDate() - randNum(1, 90));

      return {
        author: `${rand(firstNames)} ${rand(lastNames)}`,
        rating: randNum(3, 5),
        date: date.toISOString(),
        text: rand(reviewTexts),
      };
    });
  };

  const creatorDate = new Date();
  creatorDate.setDate(creatorDate.getDate() - randNum(1, 90));

  const moderatorDate = new Date();
  moderatorDate.setDate(moderatorDate.getDate() - randNum(1, 90));

  const generateWebsites = (websiteCategory) =>
    Array.from({ length: 6 }, (_, i) => ({
      WID: randNum(1000, 9999),
      websiteTitle: rand(titles),
      websiteDesc: rand(descs),
      websiteURL: `https://${rand(domains)}`,
      websiteCategory: websiteCategory,
      rating: parseFloat((Math.random() * 4 + 1).toFixed(1)),
      fishCount: randNum(0, 500),
      images: Array.from(
        { length: randNum(1, 3) },
        (_, j) => `https://picsum.photos/seed/${i}${j}/${randNum(800, 2400)}/${randNum(800, 2400)}`,
      ),
      creator: {
        name: `${rand(firstNames)} ${rand(lastNames)}`,
        date: creatorDate.toISOString(),
      },
      moderator: {
        name: `${rand(firstNames)} ${rand(lastNames)}`,
        date: moderatorDate.toISOString(),
      },

      reviews: generateReviews(),
    }));

  let returnObject = {};

  for (let websiteCategory of categories) {
    returnObject[websiteCategory] = generateWebsites(websiteCategory);
  }

  console.log("returning a list of featured websites... " + Math.random());

  return c.json(returnObject);
});

export default app;
