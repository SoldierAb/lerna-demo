const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const tplObj = require(`${__dirname}/../template`)
const { log } = require('../lib/logger')
const inquirer = require('inquirer')

program.usage('<project-name>')

program.parse(process.argv)

if (program.args.length < 1) {
    program.help()
} else {
    inquirer.prompt({
        type: 'list',
        name: 'template',
        message: '\n\n What template do you need ? ',
        choices: [
            {
                value: 'vue',
                name: 'vue',
            },
            {
                value: 'react',
                name: 'react',
            },
        ]
    }).then(async ({ template: tplName }) => {
        const proName = program.args[0];

        if(tplName ==='vue'){
            const {prefer} =  await inquirer.prompt({
                type: 'list',
                name: 'prefer',
                message: '\n\n whitch one do you prefer to customize the theme ? \n\n',
                choices: [
                    {
                        value: 'vue',
                        name: ' Static compilation with sass-resource-loader',
                    },
                    {
                        value: 'vue-gulp',
                        name: ' Dynamic compilation with gulp ',
                    }
                ]
            });
            tplName = prefer;
        }
        
        
        if (!tplObj[tplName]) {
            log(chalk.red('\n Template does not exist \n'))
        } else if (!proName) {
            log(chalk.red('\n Project Name is required !  \n'));
        } else {
            let url = tplObj[tplName]

            log(chalk.white('\n Start generating ... \n'));
            log(`⚙  Installing CLI plugins. This might take a while...`)
            const spinner = ora('\n Downloading ...')
            spinner.start();

            download(
                url,
                proName,
                { git: 'git' },
                err => {
                    log(err)
                    if (err) {
                        spinner.fail();
                        log(chalk.red('\n ❌ Generation failed ! \n'))
                        process.exit(1)
                    }

                    spinner.succeed();

                    log(`🎉  Successfully created project ${chalk.yellow(proName)}.`)
                    log(
                        `👉  Get started with the following commands:\n\n` +
                        chalk.cyan(`        ${chalk.gray('$')} cd ${proName}\n\n`) +
                        chalk.cyan(`        ${chalk.gray('$')} npm install && npm run ${tplName.includes('vue')?'dev':'start'}  \n\n`)
                    )
                    process.exit(1)
                }
            )
        }

    })


}
