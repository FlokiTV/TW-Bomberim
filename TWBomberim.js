const puppeteer = require('puppeteer-core');
const cheerio   = require('cheerio');
/*
  Env
*/
const ACC   = process.env.TW_ACC    || '';
const PROXY = process.env.TW_PROXY  || '';
const USER  = process.env.TW_USER   || PROXY;
const PASS  = process.env.TW_PASS   || '';

console.log(`Starting on ${ACC}`)

const selectores = {
  player: {
    mature: `[data-a-target="player-overlay-mature-accept"]`,
    mute: `[data-a-target="player-mute-unmute-button"]`,
    volume: `[data-a-target="player-volume-slider"]`,
    settings: `[data-a-target="player-settings-button"]`,
    ad_settings: `[data-a-target="player-settings-menu-item-advanced"]`,
    quality: `[data-a-target="player-settings-menu-item-quality"]`,
    quality_list: `[data-a-target="player-settings-submenu-quality-option"]`
  },
  user: {
    prime: `[data-target="prime-offers-icon"]`
  },
  chat: {
    container: `[data-test-selector="chat-scrollable-area__message-container"]`,
    welcome: `[data-a-target="chat-welcome-message"]`,
    line: `[data-a-target="chat-line-message"]`,
    msg_mention: `[data-a-target="chat-message-mention"]`,
    msg_user: `[data-a-target="chat-message-username"]`,
    msg_text: `[data-a-target="chat-message-text"]`,
    reward: `[data-test-selector="community-points-summary"]  > :nth-child(2) button`,
    start_reward: `[data-a-target="tw-core-button-label-text"]`,
    input: `[data-a-target="chat-input"]`,
    send: `[data-a-target="chat-send-button"]`,
    // rules: `'//button[normalize-space(.)=\'Certo, entendi!\']'`,
    // points: `'//div[normalize-space(.)=\'Clique para resgatar um bônus!\']/button/span'`
  }
}
  ; (async () => {
    const browser = await puppeteer.launch({
      headless: true,
      //executablePath: '/snap/chromium/current/bin/chromium.launcher',
      executablePath: '/bin/google-chrome-stable',
      // userDataDir: USER_DIR,
      args: [
        '--proxy-server=socks5://127.0.0.1:' + PROXY,
        '--lang=pt-BR',
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    /*
      Config
    */
    const context = await browser.createIncognitoBrowserContext()
    const page = await context.newPage()
    //const page  = await browser.newPage()
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "language", {
        get: function () {
          return "pt-BR";
        }
      });
      Object.defineProperty(navigator, "languages", {
        get: function () {
          return ["pt-BR", "pt"];
        }
      });
      window.TWBomberim = {
        start: 0,
        addScript: src => {
          var s = document.createElement('script')
          s.setAttribute('src', src)
          document.body.appendChild(s)
        },
        init: () => {
          if (location.href.includes("twitch.tv")) {
            console.log("Loading TWBomberim")
            document.onreadystatechange = () => {
              if (document.readyState === 'complete') {
                console.log("[SETUP]")
                /*
                  LocalStorage
                */
                if (localStorage.getItem("mature") == null) {
                  localStorage.setItem("mature", true)
                  localStorage.setItem("twilight.theme", 1)
                  localStorage.setItem("video-quality", '{"default":"160p30"}')
                  location.reload()
                }

              }
            }
          }
        },
      }
      window.TWBomberim.init()
    });
    await page.setViewport({ width: 1000, height: 680 })
    /*
      Get IP
    */
    await page.goto('https://api.ipify.org')
    let IP  = await page.content()
    const $ = cheerio.load(IP)
    console.log("[IP] " + $("pre").text())
    /*
      Load Home
    */
    await page.goto('https://twitch.tv/' + ACC, { waitUntil: 'domcontentloaded' });
    console.log("[Load done]")
    let st = await page.evaluate(date => {
      window.TWBomberim.start = date
      return window.TWBomberim.start
    }, Date.now())
    console.log(st)
    getPrint(page, Date.now())
    /*
      Reload Sistem
    */
    setInterval(() => {
      page.click(selectores.player.mute)
      console.log("[click][player.mute]")
    }, 1000 * 60 * 1)
    setInterval(() => {
      page.evaluate(() => {
        location.reload()
      })
    }, 1000 * 60 * 10)
  })();

const getPrint = (page, time = 0) => {
  let ts = Date.now()
  let check = (ts - time)
  let delay = 1000
  //console.log(check)

  if (time == 0 || check > delay) {
    //console.log("[print] "+ts+" | "+ check)
    page.screenshot({
      //encoding: 'base64',
      path: USER + '.png',
      quality: 35,
      type: 'jpeg'
    }).then(print => {
      //console.log("[printed] "+Date.now()+" | "+ (Date.now()-ts) )
      getPrint(page, ts)
    })
  } else {
    setTimeout(() => {
      getPrint(page, ts)
    }, delay)
  }

}
