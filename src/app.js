const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
const pathToStatic = path.join(__dirname, "../public");
const pathToViews = path.join(__dirname, "../templates/views");
const pathToPartials = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", pathToViews);
hbs.registerPartials(pathToPartials);
app.use(express.static(pathToStatic));

app.get("", (req, res) => {
  res.render("index", {
    pageTitle: "Weather App - Weather",
    title: "Weather",
    name: "Vishal Vasishat",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "Weather App - About",
    title: "About",
    name: "Vishal Vasishat",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    pageTitle: "Weather App - Help Page",
    title: "Help",
    name: "Vishal Vasishat",
  });
});


app.get("/weather", (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'Please provide an address to search weather for'
    })
  }

  geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.status(400).send({error});
    }
  
    forecast(longitude, latitude, (err, data) => {
      if (err) {
        return res.send("Error", err);
      }

      res.send({
        forecast: data,
        location
      })
    });
  });
  
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    pageTitle: "Weather App - 404 Page",
    title: "404 - No Help Content",
    name: "Vishal Vasishat",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    pageTitle: "Weather App - 404 Page",
    title: "404",
    name: "Vishal Vasishat",
  });
});

app.listen(port, () => console.log(`Server started and running at ${port}`));
