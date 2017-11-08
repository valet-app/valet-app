module.exports = {
  getHourlyParks: (req, res, next) => {
    console.log("adding new company ", req.body.name);
    const db = req.app.get("db");
    db
      .getHourlyParks(req.query.chartdate)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(() => res.status(500).send());
  }
};
