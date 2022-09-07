//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//Mailgun dependencies
const mailgun = require("mailgun-js");
const res = require('express/lib/response');
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({
  apiKey: process.env.APIKEY,
  domain: DOMAIN
});

app.get("/", function (req, res) {
  res.render("index", {
    reviewURL: "https://www.google.com/search?q=guitar%20lessons%20rossendale&rlz=1C1AVNE_enGB704GB729&oq=guitar+lessons+rosse&aqs=chrome.1.69i57j0i512j0i22i30l2j0i15i22i30l2j0i390l3.9143j0j7&sourceid=chrome&ie=UTF-8&tbs=lf:1,lf_ui:14&tbm=lcl&sxsrf=ALiCzsYtnkHUix8GmOM4V9YxLSDyGwdxKA:1655764174289&rflfq=1&num=10&rldimm=3391476306823393321&lqi=ChlndWl0YXIgbGVzc29ucyByb3NzZW5kYWxlSJCE0dzytICACFotEAAQARgAGAEYAiIZZ3VpdGFyIGxlc3NvbnMgcm9zc2VuZGFsZSoGCAMQABABkgERZ3VpdGFyX2luc3RydWN0b3KaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTTJjWEpoTTJObkVBRaoBFhABKhIiDmd1aXRhciBsZXNzb25zKAA&ved=2ahUKEwjNwsKbir34AhXDSfEDHRKiAhAQvS56BAgOEAE&sa=X&rlst=f#rlfi=hd:;si:3391476306823393321,l,ChlndWl0YXIgbGVzc29ucyByb3NzZW5kYWxlSJCE0dzytICACFotEAAQARgAGAEYAiIZZ3VpdGFyIGxlc3NvbnMgcm9zc2VuZGFsZSoGCAMQABABkgERZ3VpdGFyX2luc3RydWN0b3KaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTTJjWEpoTTJObkVBRaoBFhABKhIiDmd1aXRhciBsZXNzb25zKAA;mv:[[53.7073282,-2.2446995],[53.6909541,-2.3362122999999997]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3,lf:1"
  });
});

app.post("/submit", function (req, res) {

  const subject = "You have received a " + req.body.querytype + " query from " + req.body.name;

  const data = {
    from: process.env.FROM,
    to: "sdjknights@hotmail.com",
    subject: subject,
    text: subject + "\n" + "\n" +
      req.body.message + "\n" + "\n" +
      "Please reply to: " +
      req.body.email + "\n" +
      "Tel: " +
      req.body.phone
  };
  mg.messages().send(data, function (error, body) {
      if (error) {
        res.send("Error")
      } else {
        res.render("submit");
      }
  });
})

app.get("/submit", function (req, res) {
  res.render("submit");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});