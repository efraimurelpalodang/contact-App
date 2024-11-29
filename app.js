//* file system
const fs = require('node:fs');

//! Readline
const readline = require('node:readline');
const { stdin: input, stdout: output} = require('node:process');
const rl = readline.createInterface({input, output});

rl.question('Masukkan nama anda : ', (nama) => {
  rl.question('Masukkan nomor hp anda : ', (noHp) => {
    const contact = { nama, noHp };
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);

    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log('TERIMA KASIH SUDAH MEMASUKKAN DATA!!');

    rl.close();
  })
})