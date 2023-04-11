console.log("Hi");
import { existsSync, mkdirSync } from "fs";
import puppeteer, { devices } from "puppeteer";


const websites = {
  nextra: "https://light-novels-with-nextra.vercel.app/",
  xata: "https://light-novels.vercel.app/",
  planetscale: "https://lightnovelinfo.vercel.app",
};

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1280,
      height: 2000,
    },
  });

  for (const key in websites) {
    if (Object.hasOwnProperty.call(websites, key)) {
      const element = websites[key];
      const page = await browser.newPage();

      await page.goto(element);

      const directoryPath = `screenshots/${key}/`;

      if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath);
        console.log(`Directory ${directoryPath} created successfully.`);
      } else {
        console.log(`Directory ${directoryPath} already exists.`);
      }

      await page.screenshot({ path: `${directoryPath}/desktop.png` });

      await page.emulate(devices["Galaxy S8"]);

      await page.goto(element);


      await page.screenshot({ path: `${directoryPath}/mobile.png` });
    }
  }

  await browser.close();
})();
