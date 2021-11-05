const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

const controller = require('./controllers/ctrl');
app.get("/api/fortune",controller.getFortune);
app.get("/api/images",controller.requestImages);
app.post("/api/cypher/",controller.encodeText);
app.post("/api/decypher/",controller.decypher);
app.post("/api/images/",controller.saveImage);




app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.listen(4000, () => console.log("Server running on 4000"));
