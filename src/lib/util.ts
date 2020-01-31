const { spawn } = require("child_process");
const { get } = require("./config");

const userName = get("username");
const host = get("host");

module.exports = {
  ls: () => {
    const command = spawn("ssh", [`${userName}@${host}`, "ls -lh ~"]);

    command.stdout.on("data", (data: any) => {
      console.log(`stdout: ${data}`);
    });
  },

  download: (fileName: string) => {
    const command = spawn("rsync", [
      "-avz",
      "--progress",
      "--partial-dir=.rsync-partial",
      `${userName}@${host}:~/${fileName}`,
      "."
    ]);

    command.stdout.on("data", (data: any) => {
      console.log(`stdout: ${data}`);
    });
  },

  upload: (fileName: string, fileURL: string) => {
    let remoteCommand = "wget -bqc ";
    remoteCommand += `-O ${fileName} `;
    remoteCommand += `${fileURL}`;
    const command = spawn("ssh", [`${userName}@${host}`, `${remoteCommand}`]);

    command.stdout.on("data", (data: any) => {
      console.log(`stdout: ${data}`);
    });
  },

  verify: () => {
    const command = spawn("ssh", ["-T", `${userName}@${host}`, 'echo valid']);

    command.stdout.on("data", (data: any) => {
      console.log("" + data);
    });

    command.on("exit", (data: any) => {
      if (data > 0) {
        console.log(`error: ${data}`);
      }
    });
  }
};
