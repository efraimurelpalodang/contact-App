// mengambil argumen dari command line menggunakan medule yargs
import { simpanKontak, listContact, detailContact, deleteContact } from "./contacts.mjs";
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


// menampilkan daftar semua nama & nomor hp contact
yargs(process.argv.slice(2)).command({
  command: 'list',
  describe: 'Menampilkan semua nama & nomor hp',
  handler() {
    listContact();
  }
})


// menampilkan detail sebuah contact
yargs(process.argv.slice(2)).command({
  command: 'detail',
  describe: 'Menampilkan detail sebuah contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv) {
    detailContact(argv.nama);
  }
})


// menghapus contact berdasarkan nama
yargs(process.argv.slice(2)).command({
  command: 'delete',
  describe: 'menghapus contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv) {
    deleteContact(argv.nama);
  }
})

.demandCommand()
.argv
