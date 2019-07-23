const fs = require('fs');
const path = require('path');
const Generator = require('yeoman-generator');

class WVWGenerator extends Generator {
    constructor(params, opts) {
        super(params, opts);

        this.data = {};
    }

    initializing() {
        const version = require('../package.json').version;
        this.log(version);
    }

    prompting() {
        const questions = [
            {
                type: 'input',
                name: 'projectName',
                message: '项目名称',
                default: this.appname
            },
            {
                type: 'input',
                name: 'projectVersion',
                message: '项目版本号',
                default: '0.0.1'
            }
        ];

        return this.prompt(questions).then(answers => {
            Object.entries(answers).forEach(([key, val]) => this.data[key] = val);
        });
    }

    writing() {
        this._walk(this.templatePath('module'));
    }

    _walk(filePath) {
        if (fs.statSync(filePath).isDirectory()) {
            fs.readdirSync(filePath).forEach(name => {
                this._walk(path.resolve(filePath, name));
            });
            return;
        }

        const relativePath = path.relative(this.templatePath('module'), filePath);
        this.fs.copyTpl(
            filePath,
            relativePath,
            {
                ...this.data
            }
        );
    }
}

module.exports = WVWGenerator;