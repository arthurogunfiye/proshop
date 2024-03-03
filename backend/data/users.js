import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("12345qwert", 10),
    isAdmin: true,
  },
  {
    name: "Ayoola Ogunfuye",
    email: "ayoola.ogunfuye@gmail.com",
    password: bcrypt.hashSync("54321qwert", 10),
    isAdmin: false,
  },
  {
    name: "Adenike Ogunfuye",
    email: "adenike.ogunfuye@email.com",
    password: bcrypt.hashSync("15324qwert", 10),
    isAdmin: false,
  },
  {
    name: "Elizabeth Ogunfuye",
    email: "elizabeth.ogunfuye@email.com",
    password: bcrypt.hashSync("1qw23er45t", 10),
    isAdmin: false,
  },
  {
    name: "Joshua Ogunfuye",
    email: "josh.ogunfuye@email.com",
    password: bcrypt.hashSync("5tr43ew21q", 10),
    isAdmin: false,
  },
];

export default users;
