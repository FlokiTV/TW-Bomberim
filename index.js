const { fork }  = require('child_process');
const express   = require('express')
const app       = require('express')();
const http      = require('http').Server(app);
const io        = require('socket.io')(http);
const port      = 80

app.use(express.static('screen'))

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html');
    res.send(`
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script>
            var socket = io();
            socket.on("print", print =>{
                if(print.id == location.hash.substring(1))
                    $("img").attr("src", "data:image/png;base64, "+print.data)
            })
        </script>
        <img src=''>
    `)
});

const PORTS = [
    9050, 
    9052, 
    9053,
    // 9054, 9055,
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
         TW_ACC: "tiosam1993"
     }
 })
 browser.page.on('message', print =>{
    io.emit('print', { id:browser.id, data:print });
 })
 BROWSER.push(browser)
})

io.on('connection', (socket) => {
    console.log('a user connected');
});
  
http.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
