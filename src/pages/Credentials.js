var express = require("express");
var app = express();
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
var guard = require("express-jwt-permissions")();

var port = process.env.PORT || 8100;

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://ambient-coder.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://localhost:8100",
  issuer: "https://ambient-coder.us.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);

app.get("/credentials", guard.check(["read:credentials"]), function (req, res) {
  res.json({
    username: "This is the your username",
    password: "This is your password",
  });
});

app.listen(port);


