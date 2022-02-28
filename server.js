const { syncAndSeed } = require("./db");
const {
  models: { Major, Department },
} = require("./db");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.get("/api/majors", async (req, res, next) => {
  try {
    const majors = await Major.findAll({
      include: [Department],
    });
    res.send(majors);
  } catch (err) {
    next(err);
  }
});

app.get('/api/departments', async(req, res, next) => {
    try{
        const departments = await Department.findAll({
            include: [Major]
        })
        res.send(departments)
    } catch (err) {
        next(err)
    }
})

const start = async () => {
  try {
    await syncAndSeed();
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
