#!/usr/bin/env node
const { download, upload, ls, verify } = require("./dist/util");
const { set, get, askQuestions } = require("./dist/config");

let argv = require("minimist")(process.argv.slice(2));

let [action, ...options] = argv._;

switch (action) {
  case "download":
    var [fileName] = options;
    if (typeof fileName !== "undefined") {
      download(fileName);
    }
    break;
  case "upload":
    var [fileName, fileURL] = options;
    if (typeof fileURL !== "undefined") {
      upload(fileName, fileURL);
    }
    break;
  case "config":
    const prompts = async () => {
      const answers = await askQuestions();
      set("host", answers.host);
      set("username", answers.username);
    };
    prompts();

    break;
  case "info":
    console.log("host:", get("host"));
    console.log("username:", get("username"));

    break;
  case 'verify':
    verify();

    break;
  default:
    ls();
}
