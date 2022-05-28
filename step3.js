const fs = require('fs');
const process = require('process');
const axios = require('axios');

function output(filename, text) {
    if (filename) {
        fs.writeFile(filename, text, 'utf8', function (err) {
            if (err) {
                console.log(`Can't write: ${filename}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

function cat(path, filename) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`ERROR reading ${path}: ${err}`);
            process.kill(1);
        }
        output(filename, data);
    })
}

async function webCat(url, filename) {
    try {
        let res = await axios.get(url);
        output(filename, res.data);
    }
    catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }

}

let path, filename;

if (process.argv[2] === '--out') {
    filename = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
    webCat(path, filename);
} else {
    cat(path, filename);
}

const argv = process.argv;
for (let i = 0; i < argv.length; i += 1) {
    console.log(i, argv[i]);
}