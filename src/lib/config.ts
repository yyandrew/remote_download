const Configstore = require("configstore");
const config = new Configstore('rdownload');

const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'host',
    message: 'Enter the remote host(IP):',
    validate: (value: string) => {
      if (value.length) {
        return true
      } else {
        return 'Please enter a host(IP)'
      }
    }
  },
  {
    type: 'input',
    name: 'username',
    message: 'Enter the username of remote server:',
    default: 'root',
    validate: (value: string) => {
      if (value.length) {
        return true
      } else {
        return 'Please enter the username.'
      }
    }
  }
];

module.exports = {
  get: (key: string) => config.get(key),
  set: (key: string, value: string) => config.set(key, value),
  askQuestions: () => inquirer.prompt(questions)
}
