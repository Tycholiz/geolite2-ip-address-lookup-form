## Getting started

1. Install dependencies with `yarn install`
2. Prepare `.env` file by copying contents of `.env.example` and replacing values.
3. Download the [GeoLite2 City Database .mmdb file](https://www.maxmind.com/en/accounts/836106/geoip/downloads), and update the env variable in `.env` to point to its location

### Things to note

1. Check that the form has simple validation checking for valid IP addresses, allowing both IPv4 and IPv6. Given more time, I would have added more detailed error messages, letting the user know exactly why the IP address they entered was invalid, such as using a local IP address
2. There is simple CI set up through Github Actions that will run tests on creation of PRs and merges to `main` branch.
3. Only very basic error handling has been done. Given more time, a more robust solution would _surely_ have been built
4. Not a whole lot of time was spent styling the components. This was my first time using MUI, and I wanted to just take the opportunity to dip my toes in. Alas, I did not dig too deep into the documentation to figure out the most idiomatic way to build components with the library. As a result, some of the styling is a tad more finnicky that I would have liked. If I were to repeat this project, I probably would have just homegrown a solution.
