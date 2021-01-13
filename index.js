var os = require('os');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const homeDir = os.homedir() + process.env.DIRECTORY_PATH;

const pathWithName = homeDir + 'operating-system-info.txt';

const operatingSystemInfo = () => {
  let str = `Platform : ${os.platform()}\nArchitecture: ${os.arch()}\nNo of CPU's: ${
    os.cpus().length
  }\nUptime of operating systems in Seconds: ${os.uptime()}\nUser Information: ${
    os.userInfo().username
  }`;

  return str;
};

let dirPromise = new Promise((resolve, reject) => {
  fs.mkdir(homeDir, { recursive: true }, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve('Directory is created.');
    }
  });
});

let fileWritePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    fs.writeFile(pathWithName, operatingSystemInfo(), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('File is created.');
      }
    });
  }, 500);
});

try {
  if (fs.existsSync(pathWithName)) {
    fileWritePromise
      .then((res) => {
        console.log('updated successfully');
      })
      .catch((err) => {
        console.log('not updated!');
      });
  } else {
    dirPromise
      .then((res) => {
        console.log(res);
        fileWritePromise
          .then((fileRes) => {
            console.log(fileRes);
          })
          .catch((comErr) => {
            console.log('File not created!');
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
} catch (err) {
  console.error(err);
}
