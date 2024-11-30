//* file system
import fs from "node:fs";
import chalk from "chalk";
import validator from "validator";

// membuat folder data jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const file = `${dirPath}/contacts.json`;
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, "[]", "utf-8");
}

// membca semua isi yang ada didalam file contacts.json
const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

// simpan kontak
export function simpanKontak(nama, email, noHp) {
  const contact = { nama, email, noHp };
  const contacts = loadContact();

  // cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold(
        "Kontak sudah terdaftar silahkan gunakan nama lain"
      )
    );
    return false;
  }

  // cek email (validasi)
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(
        chalk.red.inverse.bold("Gagal menambahkan data, Email tidak valid")
      );
    }
  }

  // cek nomor handphone
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(
      chalk.red.inverse.bold(
        "Gagal menambahkan data, Nomor handphone tidak valid"
      )
    );
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(
    chalk.yellow.bgGreen("Terima Kasih sudah memasukkan data anda!!")
  );
}

//? list contact
export function listContact() {
  const contacts = loadContact();

  console.log(chalk.bgYellow.bold("\nDaftar Kontak :"));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
  });
}

//? Detail contact
export function detailContact(nama) {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama}, Tidak ditemukan`));
    return false;
  }

  console.log(chalk.blue.bold(`${contact.nama}`));
  console.log(`${contact.noHp}`);
  if (contact.email) {
    console.log(`${contact.email}`);
  }
}

// menghapus kontak
export function deleteContact(nama) {
  const contacts = loadContact();

  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if(contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama}, Tidak ditemukan`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(
    chalk.black.bgBlue(`data contact ${nama} Berhasil dihapus!!`)
  );
}
