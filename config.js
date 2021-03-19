/*
ctx - context browser
id  - position on array
*/
module.exports = async (ctx, id) => {
    const pages = []
    ctx.addInitScript(()=>{
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
        localStorage.setItem("mature", true)
        localStorage.setItem("volume", '0.05')
        localStorage.setItem("lowLatencyModeEnabled", false)
        localStorage.setItem("twilight.theme", 1)
        localStorage.setItem("quality-bitrate", 230000)
        localStorage.setItem("video-muted", '{"default":false}')
        localStorage.setItem("video-quality", '{"default":"160p30"}')
      })
      let ct = await ctx.newPage()
      let pg = await ctx.newPage()
      
      await ct.setViewportSize({
        width: 640,
        height: 480,
      })
      await pg.setViewportSize({
        width: 640,
        height: 480,
      })

      chat(id, ct)
      setup(id,pg)
      setInterval(()=>{
        pg.mouse.move(randomIntFromInterval(18,40),randomIntFromInterval(18,40))
      }, 5000)
      pages.push({
          id:id,
          page:pg,
          chat:ct
      })
}

const chat = (id, page) =>{
    page.goto('https://www.twitch.tv/popout/'+USER+'/chat?popout=', { waitUntil: 'domcontentloaded', timeout: 0 })
    reload(id,page)
}

const setup = async (id, page) =>{
    await page.goto('https://player.twitch.tv/?channel='+USER+'&enableExtensions=false&muted=false&parent=twitch.tv&player=popout&volume=0.3', { waitUntil: 'domcontentloaded', timeout: 0 })
    print(id,page)
    reload(id,page)
}

const reload = async (id,page) =>{
    let sec = 60 * randomIntFromInterval(18,40)
    await page.waitForTimeout(1000 * sec)
    await page.reload()
    console.log("[RELOAD] "+id)
    reload(id,page)
}

const print = async (id, page) => {
    await page.screenshot({ path: `${id}-${USER}.png`, timeout: 0 })
    await page.waitForTimeout(6000*5)
    print(id,page)
}

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
