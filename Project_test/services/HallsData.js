const db = require("./DB");
const helper = require("../Helper");
const config = require("../Configurations");
const { query } = require("express");

async function getData(page = 1) {
  const rows = await db.query("select * from even_hall where id = ?", [1]);

  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function eventGuests(page = 1, user_id, event_id) {
  const rows = await db.query(
    "select * from guest where user_id = ? and event_id = ?",
    [user_id, event_id]
  );

  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

module.exports = {
  getData,
  eventGuests
};
