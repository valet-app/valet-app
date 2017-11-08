module.exports = {
  getHourlyParks: (req, res, next) => {
    console.log("getting number parked per hour on ", req.query.chartdate);
    const db = req.app.get("db");
    db
      .getHourlyParks(req.query.chartdate)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(() => res.status(500).send());
  }
};
