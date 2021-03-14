const { fork } = require('child_process');
const PORTS = [
    9050, 9052, 9053, 9054, 9055,
    // 9056, 9057, 9058, 9059, 9060
]
const BROWSER = []

PORTS.forEach(port =>{
    let browser     = {
        id: port
    }
    browser.page    = fork('TWBomberim.js', {
        env:{
            TW_PROXY: port,
            TW_ACC: "titomartins123"
        }
    })
    BROWSER.push(browser)
})
