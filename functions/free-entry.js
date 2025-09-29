const { appendEntry } = require("./log-entry");

exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  try {
    await appendEntry({
      name: data.name,
      email: data.email,
      entryType: "Free",
      notes: data.notes || "",
    });

    return { statusCode: 200, body: "Entry logged" };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
