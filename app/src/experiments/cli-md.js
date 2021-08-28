// Comes with a performance penalty on startup
import cliMd from 'cli-markdown'
const md = '# Hello World\n\
## Hello, hello\n\
Some more text\n\
- [ ] todo?'
console.log(cliMd(md))