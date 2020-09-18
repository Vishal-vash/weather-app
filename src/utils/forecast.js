const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/forecast?access_key=5b9c3a2fefe4e96e6c3549157b078609&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to weather api", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
