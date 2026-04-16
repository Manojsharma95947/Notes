const mongoose = require("mongoose");
const Note = require("./models/notes.js");

main()
  .then((res) => {
    console.log("connnected with mongoose");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/notes");
}

let allNote = [
  {
    title: "manoj",
    msg: "Hii buddy, how are you",
    created_at: new Date(),
  },
  {
    title: "akash",
    msg: "kesa h ",
    created_at: new Date(),
  },
  
];

Note.insertMany(allNote)
.then((res) => {
  console.log(res);
});