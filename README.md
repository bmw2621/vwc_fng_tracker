# Vets Who Code #
## FNG Tracker Application ##

[![Build Status](https://travis-ci.org/Vets-Who-Code/vwc_fng_tracker.svg?branch=master)](https://travis-ci.org/Vets-Who-Code/vwc_fng_tracker)

An application to track VWC applicant status

### To run the app locally:
0. Contact Eddie to get your github email address added to the Auth0 whitelist
1. Install docker
2. run `docker pull dgraph/dgraph`
3. from `vwc_fng_tracker_be`, run `docker-compose -d`
4. Navigate to the 'ratel' dash board at 'localhost:9000'
5. Navigate to the 'schema' tab, and click the 'bulk edit' link at the top
6. copy/paste the `vwc_fng_tracker_schema.gql` file into the editor and save
7. Click the 'Types' radio button, and add type entries for each type in 'types.gql'
8. Navigate to the 'console' tab on ratel and select the 'Mutate' radio button. For each fle in the 'seeds' directory, copy/paste the text and hit the 'Run' button
9. `cd` to `vwc_fng_tracker_be`
10. run `yarn` to install dependencies
11. run `yarn start` to start the FE application
12. Contact Eddie to gain access to the google docs spreadsheet which contains applicant seed data. This should be downloaded as csv and imported through the applicant page's 'import csv' function (data will not show up immediately after import, page will need a refresh (this is a known bug)
13. Congrats, you now should have a (mostly) functional working copy of the app!

### Caveats
As of last Friday, a lot of save/delete functions are broken. v1.1 of Dgraph implemented some breaking changes that requires most of the mutation scripts to be rewritten; this is WIP
