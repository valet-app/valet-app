module.exports = {
  getHourlyParks: (req, res, next) => {
    console.log(
      "getting number parked per hour on ",
      req.query.chartdate,
      req.query.company_id
    );
    const db = req.app.get("db");
    db
      .getHourlyParks(req.query.chartdate, req.query.company_id)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(() => res.status(500).send());
  },
  getHourlyRetrievals: (req, res, next) => {
    console.log(
      "getting number retrieved per hour on",
      req.query.chartdate,
      req.query.company_id
    );
    const db = req.app.get("db");
    db
      .getHourlyRetrievals(req.query.chartdate, req.query.company_id)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(() => {
        console.log("Error");
        res.status(500).send();
      });
  },
  getHourlyEmplWork: (req, res, next) => {
    console.log(
      "employee workload data:",
      req.query.chartdate,
      " for company ",
      req.query.company_id
    );
    const db = req.app.get("db");
    db
      .getHourlyEmplWork(req.query.chartdate, req.query.company_id)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(() => res.status(500).send());
  }
};
