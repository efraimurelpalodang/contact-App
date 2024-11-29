//* file system
const fs = require('node:fs');

//! Readline
const readline = require('node:readline');
const { stdin: input, stdout: output} = require('node:process');
const { resolve } = require('node:path');
const rl = readline.createInterface({input, output});

// membuat folder data jika belum ada
const dirPath = './data';
if( !fs.existsSync(dirPath) ) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const file = `${dirPath}/contacts.json`;
if( !fs.existsSync(file) ) {
  fs.writeFileSync(file, '[]', 'utf-8');
}

// pertanyaan
const askQuestion = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(`${question} : `, (nama) => {
      resolve(nama);
    })
  })
}

// simpan kontak
const simpanKontak = (nama, email, noHp) => {
  const contact = {nama, email, noHp};

  const file = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(file);

  contacts.push(contact);

  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

  console.log('TERIMA KASIH SUDAH MEMASUKKAN DATA!!');

  rl.close();
};

module.exports = { askQuestion, simpanKontak};