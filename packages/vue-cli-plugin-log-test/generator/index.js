module.exports = (api, options = {}, rootOptions = {}) => {
    api.injectImports(api.entryFile, `import router from './router'`)

    api.afterInvoke(() => {
      const { EOL } = require('os')
      const fs = require('fs')
      const contentMain = fs.readFileSync(api.resolve(api.entryFile), { encoding: 'utf-8' })
      const lines = contentMain.split(/\r?\n/g)
  
      const renderIndex = lines.findIndex(line => line.match(/render/))
      lines[renderIndex] += `${EOL}  router,`
  
      fs.writeFileSync(api.entryFile, lines.join(EOL), { encoding: 'utf-8' })
    })
  }