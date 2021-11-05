const fs = require('fs')

module.exports = {
    storeData : (data, path) => {
        try {
            fs.writeFileSync(path, JSON.stringify(data))
        } catch (err) {
            console.error(err)
        }
    },
    loadData : (path) => {
        try {
          return fs.readFileSync(path, 'utf8')
        } catch (err) {
          console.error(err)
          return false
        }
    }
}