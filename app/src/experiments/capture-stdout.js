const fs = require('fs');
const spawn = require('child_process').spawn

const out = fs.openSync('./out.log', 'a')
const err = fs.openSync('./out.log', 'a')

var proc = spawn('node', ['.\\app\\src\\index.js'], {
  detached: true,
  shell: true,
  stdio: ['ignore', out, err]
})

// proc.stdout.on('data', function (data) {
//   process.stdout.write(data)
// })
// proc.stderr.on('data', function (data) {
//   process.stderr.write(data)
// })
// proc.on('close', function (code, signal) {
//   console.log('test.exe closed')
// })
