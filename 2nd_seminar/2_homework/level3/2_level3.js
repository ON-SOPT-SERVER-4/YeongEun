//fs 모듈을 이용하여 비동기적으로 비밀번호 암호화하기 
//(암호화된 문자열을 파일에 write 하면 됩니다!)

const crypto = require('crypto');
const fs = require('fs');

const password = 'dudgnsqkqh';
const fileName = 'password.txt';

const encryption = (password) => {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, 'salt', 100000, 64, 'sha512', (err, Key) => {
            if (err) reject(err);
            resolve (Key.toString('base64'));
        });
    });
};

encryption(password).then((data) => {
    fs.writeFile(fileName, data, () => {
        console.log(`${fileName} Write done!`)
    });
})
