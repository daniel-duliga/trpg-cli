import stripAnsi from 'strip-ansi'
import fs from 'fs'

// call this at startup and you're set
export default function capture_stdout() {
  const filePath = './log.txt'
  var log_file = fs.createWriteStream(filePath, { flags: 'w' })
  hook_stream(process.stdout, log_file, write_data)
}

function hook_stream(stream, log_file, callback) {
  var old_write = stream.write

  stream.write = (function (write) {
    return function (string, encoding, fd) {
      write.apply(stream, arguments) // comments this line if you don't want output in the console
      callback(string, log_file)
    }
  })(stream.write)

  return function () {
    stream.write = old_write
  }
}

function write_data(data, log_file) {
  data = stripAnsi(data)
  if(data.trim() === '') {
    return
  }
  data += '\n'
  log_file.write(data)

  // let existingData = fs.readFileSync(filePath).toString()
}