const { workerData, parentPort } = require('worker_threads')

// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
console.log("3rd service")
parentPort.postMessage({ hello: "world" })


