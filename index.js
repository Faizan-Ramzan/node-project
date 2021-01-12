var os = require('os');
var fs = require('fs');
var dotenv = require('dotenv');
var path = require('path');
dotenv.config();

var filePath = process.env.DIRECTORY_PATH;

function operatingSystemInfo(){
    var str = `Platform : ${os.platform()}\nArchitecture: ${os.arch()}\nNo of CPU's: ${os.cpus().length}\nUptime of operating systems in Seconds: ${os.uptime()}\nUser Information: ${os.userInfo().username}`;

    return str;
}
// console.log(process.env.DIRECTORY_PATH);

fs.mkdir(filePath, { recursive: true }, (err) => {
    if (err) {
        throw err;
    }
    console.log("Directory is created.");
    
    fs.writeFile('Users/operating-system-info.txt', operatingSystemInfo() , function (err) {
        if (err) throw err;
        console.log('Saved!');
    }); 
});
