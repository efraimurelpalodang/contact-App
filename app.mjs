// mengambil argumen dari command line menggunakan medule yargs
import simpanKontak from "./contacts.mjs";
import yargs from "yargs";

yargs(process.argv.slice(2)).command({
  command: 'add',
  describe: 'Menambahkan kontak baru',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'Email',
      demandOption: false,
      type: 'string',
    },
    noHp: {
      describe: 'Nomor Handphone',
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv) {
    simpanKontak(argv.nama,argv.email,argv.noHp);
  }
})
.argv
