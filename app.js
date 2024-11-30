// mengambil argumen dari command line menggunakan medule yargs
const { simpanKontak } = require('./contacts');
const yargs = require("yargs");

yargs.command({
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
