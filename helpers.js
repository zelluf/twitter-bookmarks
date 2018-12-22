const CREDS = require("./creds");
const SELECTORS = require("./selectors");

module.exports = {
  login: async page => {
    await page.goto("https://mobile.twitter.com/login");

    await page.waitForSelector(SELECTORS.username);
    await page.click(SELECTORS.username);
    await page.keyboard.type(CREDS.username);

    await page.waitForSelector(SELECTORS.password);
    await page.click(SELECTORS.password);
    await page.keyboard.type(CREDS.password);

    await page.waitForSelector(SELECTORS.button);
    await page.click(SELECTORS.button);
    await page.waitForNavigation();
  },

  autoScroll: page =>
    page.evaluate(() => {
      const xDistancePerScroll = 0;
      const yDistancePerScroll = 3000;
      const waitPerScroll = 0.5 * 1000;

      let sameHeightCounter = 0
      let previousHeight = 0

      const timer = setInterval(() => {
        const isInPage = node => {
          return node === document.body ? false : document.body.contains(node);
        };
        const tryAgainButton = document.querySelector(
          "div.rn-1oszu61.rn-urgr8i.rn-1c1gj4h.rn-114ovsg.rn-oucylx.rn-855088.rn-1bxrh7q.rn-waaub4.rn-sqtsar.rn-qb5c1y.rn-1efd50x.rn-14skgim.rn-rull8r.rn-mm0ijv.rn-5kkj8d.rn-13l2t4g.rn-qklmqi.rn-1ljd8xs.rn-deolkf.rn-1loqt21.rn-6koalj.rn-1qe8dj5.rn-1mlwlqe.rn-eqz5dr.rn-1w2pmg.rn-1mnahxq.rn-61z16t.rn-p1pxzi.rn-11wrixw.rn-1vuscfd.rn-1dhvaqw.rn-wk8lta.rn-1pl8ijs.rn-1mdbw0j.rn-1wx0zj.rn-bnwqim.rn-o7ynqc.rn-6416eg.rn-lrvibr.rn-1lgpqti"
        );

        while (isInPage(tryAgainButton)) {
          console.log("try again is in page");
          tryAgainButton.click();
        }
        window.scrollBy(xDistancePerScroll, yDistancePerScroll);

        // FIX this ugly hack, sometimes because of not loading fast after a try
        // tryAgainButton, it does not scroll.
        // So to end the function call, it must have 5 times same height, which
        // means it reached bottom, but it sucks
        if (previousHeight === document.body.scrollHeight){
          sameHeightCounter++
        }
        console.log(sameHeightCounter)
        if (sameHeightCounter >= 10) {
          return clearInterval(timer)
        }
        previousHeight = document.body.scrollHeight
        // end of ugly hack

      }, waitPerScroll);
    })
};
