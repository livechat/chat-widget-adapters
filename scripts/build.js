const cmd = require('./cmd')

cmd('lerna run build --scope @livechat/widget-core')
cmd('lerna run build --no-private --parallel --ignore @livechat/widget-core')
