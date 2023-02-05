const fs = require('fs')

global.creator = 'IkyyOFC' 
global.apikey = ["IkyyOFC", "Alphabot", "Ikyy"]

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update'${__filename}'`)
	delete require.cache[file]
	require(file)
})
