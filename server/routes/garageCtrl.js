module.exports = {
  getParkingSpot: (req, res, next) => {
    const db = req.app.get("db");
    console.log(
      "returning lot id# ",
      req.query.lotid,
      " and type id = ",
      req.query.typeid,
      " and user id = ",
      req.query.carid
    );
    db
      .getParkingSpot(req.query.lotid, req.query.typeid, req.query.carid)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(() => res.status(500).send());
  },

  getParkingSpotType: (req, res, next) => {
    const db = req.app.get("db");
    console.log("Getting parking slop types");
    db
      .getParkingSpotType()
      .then(response => {
        res.status(200).json(response);
      })
      .catch(() => res.status(500).send());
  },

  getParkingLotStatus: (req, res, next) => {
    const db = req.app.get("db");
    console.log("Getting parking lot status");
    db
      .getParkingLotStatus(req.query.lotid)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(() => res.status(500).send());
  }

  // postUser: (req,res,next) => {
  // },

  // putUser: (req,res,next) => {
  // },

  // deleteUser: (req,res,next) => {
  // }
};
