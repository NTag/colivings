# colivin.gs

Source of [colivin.gs](https://colivin.gs): the map of the best colivings in Europe. Find your next place as a digital nomad!

Built with [dotted-map](https://github.com/NTag/dotted-map).

## Contributing

The list of colivings is in [colivings.js](https://github.com/NTag/colivings/blob/main/src/colivings.js). You can open a PR to add new colivings, however note that:

- for now we only list colivings: no hostel, hotel, AirBnB or rented appartment;
- for now only "short-term colivings" are accepted: meaning colivings where you can stay for a week if you want;
- "colivings" with a minimum duration of one month for example are currently not accepted.

## Development

Node 16 is required.

- `npm install`
- `npm start`
- To update the map JSON: `npm run compute-map`
