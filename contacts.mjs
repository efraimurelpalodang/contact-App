//* file system
import fs from 'node:fs';
import chalk from 'chalk';
import validator from 'validator';

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

// simpan kontak
export default function simpanKontak(nama, email, noHp) {
  const contact = {nama, email, noHp};
  const file = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(file);

  // cek duplikat
  const duplikat = contacts.find( (contact) => contact.nama === nama );
  if(duplikat) {
    console.log(chalk.red.inverse.bold('Kontak sudah terdaftar silahkan gunakan nama lain'));
    return false;
  }

  // cek email (validasi)
  if(email) {
    if( !validator.isEmail(email) ) {
      console.log(chalk.red.inverse.bold('Gagal menambahkan data, Email tidak valid'));
    }
  }

  // cek nomor handphone
  if( !validator.isMobilePhone(noHp, 'id-ID') ) {
    console.log(chalk.red.inverse.bold('Gagal menambahkan data, Nomor handphone tidak valid'));
  }



  contacts.push(contact);

  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

  console.log(chalk.yellow.bgGreen('Terima Kasih sudah memasukkan data anda!!'));
};
