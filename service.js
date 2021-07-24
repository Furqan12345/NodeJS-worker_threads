const { Worker, workerData, parentPort } = require('worker_threads')

// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
    console.log("from service");
    console.log("2nd service")
parentPort.postMessage({ hello: workerData })

const worker = new Worker('./service2.js', {});
    worker.on('online', ()=>{
        console.log("started");
    });
    worker.on('message', function(msg){
        console.log(msg+"workerid="+worker.threadId);
    });
    worker.on('error', function(err){
        console.log(err);
    });
    

setTimeout(()=>{
    console.log("hi");
    parentPort.postMessage({ bello: workerData })
},5000)