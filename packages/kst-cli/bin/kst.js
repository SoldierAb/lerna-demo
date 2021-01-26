#!/usr/bin/env node
const program = require('commander')

//定义指令
program.version(require('../package').version)
.usage('<command> [options]') 
.command('create [options] <app-name>','generate a new project from a remote template')

//解析命令行参数
program.parse(process.argv)


