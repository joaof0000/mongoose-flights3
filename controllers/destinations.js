const Flight = require("../models/flight");

module.exports = {
  create
};

async function create(req, res) {
  try {
    const oneFlight = await Flight.findById(req.params.id);
    oneFlight.destinations.push(req.body);
    oneFlight.destinations.sort((a, b) => a.arrival - b.arrival);
    await oneFlight.save();
    res.redirect(`/flights/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.redirect(`/flights/${req.params.id}`);
  }
}
