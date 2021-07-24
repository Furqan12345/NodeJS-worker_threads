// index.js
// run with node --experimental-worker index.js on Node.js 10.x
const { Worker, workerData } = require('worker_threads')

// function runService(workerData) {
//   return new Promise((resolve, reject) => {
//     const worker = new Worker('./service.js', { workerData });
//     worker.on('online', ()=>{
//         console.log("started");
//     });
//     worker.on('message', resolve);
//     worker.on('error', reject);
//     worker.on('exit', (code) => {
//       if (code !== 0)
//         reject(new Error(`Worker stopped with exit code ${code}`));
//     })
//   })
// }

// async function run() {
//   const result = await runService('world')
//   console.log(result);
// }

// run().catch(err => console.error(err))


const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
var wd={hello:"world"};
var reject=null;
const worker = new Worker('./service.js', {wd});
    worker.on('online', ()=>{
        console.log("started");
    });
    worker.on('message', function(msg){
        console.log(msg+"workerid="+worker.threadId);
    });
    worker.on('error', function(err){
        console.log(err);
    });
    worker.on('exit', (code) => {
      if (code !== 0)
        console.log(`Worker stopped with exit code ${code}`);
    })

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});