const { askQuestion, simpanKontak } = require('./contacts.js')

const main = async () => {
  const nama = await askQuestion('Masukkan nama');
  const email = await askQuestion('Masukkan email');
  const noHp = await askQuestion('Masukkan nomor handphone');

  simpanKontak(nama, email, noHp);
}

main();