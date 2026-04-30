const { exec } = require('child_process');

function runCode(file) {
    return new Promise((resolve, reject) => {
        exec(`node ${file}`, (error, stdout, stderr) => {
            if (error) return reject(stderr);
            resolve(stdout);
        });
    });
}

module.exports = runCode;