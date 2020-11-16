// Impordime bcrypt'i
const bcrypt = require('bcrypt');
// Järgnev muutuja määrab ära, kui palju peab tööd tegema parooli hashimiseks (mida suurem number, seda rohkem on vaja vaeva näha)
const saltRounds = 10;
// Defineerime teenuse objekti
const hashService = {};

// Funktsioon parooli hashimiseks - funktsioon tagastab hashitud parooli
hashService.hash = (password) => {
  const hash = bcrypt.hash(password, saltRounds);
  return hash;
}

// Funktsioon parooli võrdlemiseks hashiga - funktsioon tagastab true või false vastavalt võrdlemise tulemusele
hashService.compare = (password, hash) => {
  const match = bcrypt.compare(password, hash);
  return match;
}
// Ekspordime selle objekti, et saaksime seda teenust mujal kasutada
module.exports = hashService;