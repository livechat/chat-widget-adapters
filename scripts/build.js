const cmd = require('./cmd')
const corePkg = require('../packages/widget-core/package.json')

cmd(`lerna run build --scope ${corePkg.name}`)
cmd(`lerna run build --no-private --parallel --ignore ${corePkg.name}`)
