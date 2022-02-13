const fs = require("fs");
const { join } = require("path");
const { getMapJSON } = require("dotted-map");

const mapJsonString = getMapJSON({
  height: 200,
  grid: "diagonal",
  countries: [
    "FRA",
    "NOR",
    "GBR",
    "DEU",
    "ESP",
    "DNK",
    "ITA",
    "PRT",
    "CHE",
    "FIN",
    "SWE",
    "SVN",
    "HRV",
    "ROU",
    "EST",
    "LTU",
    "LUX",
    "MNE",
    "AUT",
    "POL",
    "ISL",
    "NLD",
    "CZE",
    "GRC",
    "BEL",
    "HUN",
    "SVK",
    "SRB",
    "BIH",
    "ALB",
    "BGR",
    "MKD",
    "MLT",
    "CS-KM",
    "UKR",
    "BLR",
    "MDA",
    "LVA",
  ],
});

fs.writeFileSync(join(__dirname, "..", "src", "map.json"), mapJsonString);