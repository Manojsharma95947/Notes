const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Note = require("./models/notes.js");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

app.get("/", (req, res) => {
  res.redirect("/notes");
});

app.get("/notes", async (req, res) => {
  let notes = await Note.find();
  res.render("home.ejs", { notes });
});

app.get("/notes/new", (req, res) => {
  res.render("newNotes.ejs");
});

app.post("/notes", (req, res) => {
  console.log(req.body);
  let { title,msg } = req.body;
  let newNote = new Note({
    title: title,
    msg: msg,
    created_at: new Date(),
  });
  console.log(newNote);
  newNote
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/notes");
}
);


app.get("/notes/:id/edit", async (req, res) => {
  let { id } = req.params;
  let note = await Note.findById(id);
  res.render("editNotes.ejs", { note });
});

app.get("/notes/:id", async (req, res) => {
  let { id } = req.params;
  let note = await Note.findById(id);
  res.render("show.ejs", { note });
});

app.put("/notes/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newmsg } = req.body;
  let updateNote = await Note.findByIdAndUpdate(
    id,
    { msg: newmsg },
    { runValidators: true, new: true }
  );
  res.redirect("/notes");
});


app.delete("/notes/:id", async (req, res) => {
  let { id } = req.params;
  let deletedNote = await Note.findByIdAndDelete(id);
  console.log(deletedNote);
  res.redirect("/notes");
});

app.listen(8080, () => {
  console.log("collection build");
});
