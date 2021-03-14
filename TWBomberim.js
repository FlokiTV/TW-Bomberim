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
      executablePath: '/bin/google-chrome-stable',
      // userDataDir: USER_DIR,
      args: [
        // '--proxy-server=socks5://127.0.0.1:' + PROXY,
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
      /*! js-cookie v3.0.0-rc.1 | MIT */
      !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,r=e.Cookies=t();r.noConflict=function(){return e.Cookies=n,r}}())}(this,function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}var t={read:function(e){return e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};return function n(r,o){function i(t,n,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),n=r.write(n,t);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n+c}}return Object.create({set:i,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var n=document.cookie?document.cookie.split("; "):[],o={},i=0;i<n.length;i++){var c=n[i].split("="),u=c.slice(1).join("=");'"'===u[0]&&(u=u.slice(1,-1));try{var f=t.read(c[0]);if(o[f]=r.read(u,f),e===f)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){i(t,"",e({},n,{expires:-1}))},withAttributes:function(t){return n(this.converter,e({},this.attributes,t))},withConverter:function(t){return n(e({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(r)}})}(t,{path:"/"})});

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
                Cookies.set("mature", true)
                Cookies.set("mature_samesite_compat", true)
                Cookies.set("prefers_color_scheme", "dark")
                Cookies.set("prefers_color_scheme_samesite_compat", "dark")

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
    // await page.setRequestInterception(true)
    // page.on('request', request => {
    //   if(
    //     // request.url().endsWith(".ts") ||
    //     request.url().endsWith(".png") ||
    //     request.url().endsWith(".jpg") ||
    //     request.url().endsWith(".gif")
    //     ){
    //     request.abort()
    //   }else
    //     request.continue()
    // })
    /*
      Get IP
    */
    await page.goto('https://api.ipify.org')
    let IP  = await page.content()
    const $ = cheerio.load(IP)
    console.log("[IP] "+PROXY+" " + $("pre").text())
    
    /*
      Load Home
    */
    await page.goto('https://twitch.tv/' + ACC, { waitUntil: 'domcontentloaded' });
    console.log("[Load done] "+PROXY)
    let st = await page.evaluate(date => {
      window.TWBomberim.start = date
      return window.TWBomberim.start
    }, Date.now())
    console.log("[start] "+st)
    // getPrint(page, Date.now())
    /*
      Reload Sistem
    */
    const _data = {
      reload: Date.now(),
      tick: Date.now(),
      ms: 0,
      print:0,
      _print:false,
      _prints: 0,
    }
    setInterval(()=>{
      _data.ms    = Date.now() - _data.tick
      _data.tick  = Date.now()
      // console.log(_data.ms)
      // (_data.tick - _data.print) > 500
      if( !_data._print ){
        page.mouse.click(500,630)
        page.mouse.click(880,280)
        _data._print = true
        page.screenshot({
          encoding: 'base64',
          // type: 'jpeg',
          // quality: 30,
          // path: './screen/'+USER + '.png',
        }).then(print => {
          console.log("[printed] "+PROXY)
          _data.print   = _data.tick
          _data._print  = false
          _data._prints++
          process.send(print)
        }).catch( e =>{
          console.log("[print] [error]"+PROXY)
        })
      }
      // if( (_data.tick - _data.reload) > (1000 * 20) ){
      //   console.log("[reload] "+PROXY+ " "+(_data.tick - _data.reload)+" "+_data._prints)
      //   _data.reload = _data.tick
      //   // page.evaluate(() => {
      //   //   // location.reload()
      //   // })
      // }
    }, 50)
    // setInterval(() => {
    //   // page.click(selectores.player.mute)
    //   // page.click("video")
    //   // console.log("[click][player.mute]")
    //   page.evaluate(() => {
    //     return Cookies.get()
    //   }).then( ck =>{
    //     console.log(ck)
    //   })

    // }, 1000 * 60 * 0.4)
    // setInterval(() => {
    //   page.evaluate(() => {
    //     location.reload()
    //   })
    // }, 1000 * 60 * 10)
  })();

const getPrint = (page, time = 0) => {
  let ts = Date.now()
  let check = (ts - time)
  let delay = 3000
  //console.log(check)

  if (time == 0 || check > delay) {
    console.log("[print] "+ts+" | "+ check)
    page.screenshot({
      //encoding: 'base64',
      path: USER + '.png',
    }).then(print => {
      console.log("[printed] "+ (Date.now()-ts) )
      getPrint(page, ts)
    }).catch( e =>{
      console.log("[print] [error]")
    })
  } else {
    setTimeout(() => {
      getPrint(page, ts)
    }, delay)
  }

}
