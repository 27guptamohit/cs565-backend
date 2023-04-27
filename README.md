# cs565-backend (under construction)

Backend for our CS 565 project (name pending).

## Contents

- [API Documentation](#api-documentation)
- [Development Environment Setup](#development-environment-setup)

## API Documentation

### Models

User:
| Field | Type | Required | Unique | Default | Notes |
|-------|------|----------|--------|---------|-------|
| email | string | ✘ | ✓ | - | for raffle giveaway purposes |

Sheet:
| Field | Type | Required | Unique | Default | Notes |
|-------|------|----------|--------|---------|-------|
| name | string | ✓ | ✓ | - | title of sheet music |
| image | Buffer | ✓ | ✓ | - | base64 encoded image of sheet, only support single image |

Measure:
| Field | Type | Required | Unique | Default | Notes |
|-------|------|----------|--------|---------|-------|
| sheetId | ObjectId | ✓ | ✘ | - | document ID for corresponding sheet |
| measureNum | number | ✓ | ✘ | - | number of measure within sheet for ordering |
| image | Buffer | ✓ | ✓ | - | base64 encoded image of measure, only support single image |
| responses | [MeasureResponse] | ✘ | ✘ | [] | stores crowdworker digitizations of measure |
| responseCount | number | ✘ | ✘ | 0 | stores the number of responses (easier queries via sorting) |

MeasureResponse:
| Field | Type | Required | Unique | Default | Notes |
|-------|------|----------|--------|---------|-------|
| userId | ObjectId | ✓ | ✘ | - | document ID for corresponding user who submitted response |
| symbols | [Symbols] | ✘ | ✘ | [] | symbols in response |

Symbols:
| Field | Type | Required | Unique | Default | Notes |
|-------|------|----------|--------|---------|-------|
| name | string | ✓ | ✘ | - | name of symbol, one of {quarter_note, half_note, whole_note, quarter_rest, half_rest, whole_rest} |
| pitch | number | ✘ | ✘ | - | location of note object, where 1 is the bottom line, 2 is the bottom space, 3 is the second to bottom line, etc. |

### Endpoints

These are the following endpoints available:

| Endpoints  | Actions | Intended Outcome                                        |
|------------|---------|---------------------------------------------------------|
| users      | GET     | Respond with a list of users                            |
|            | POST    | Create a new user. Respond with details of new user     |
| users/:id  | GET     | Respond with details of specified user or 404 error     |
|            | PUT     | Replace entire user with supplied user or 404 error     |
|            | DELETE  | Delete specified user or 404 error                      |
| sheets     | GET     | Respond with a list of sheets                           |
|            | POST    | Create a new sheet. Respond with details of new sheet   |
| sheets/:id | GET     | Respond with details of specified sheet or 404 error    |
|            | PUT     | Replace entire sheet with supplied sheet or 404 error   |
|            | DELETE  | Delete specified sheet or 404 error                     |
| measures   | GET     | Respond with a list of measures                         |
|            | POST    | Create a new measures. Respond with details of new measures |
| measures/:id | GET   | Respond with details of specified measures or 404 error |
|            | PUT     | Replace entire measures with supplied measures or 404 error |
|            | DELETE  | Delete specified measures or 404 error                  |
| lilypond/:id | GET   | WIP                                                     |

### Query Parameters

Additionally, the API has the following JSON encoded query string parameters for GET requests on all endpoints.

| Parameter | Description                                                                                  |
|----------|----------------------------------------------------------------------------------------------|
| where    | filter results based on JSON query                                                           |
| sort     | specify the order in which to sort each specified field  (1- ascending; -1 - descending)     |
| select   | specify the set of fields to include or exclude in each document  (1 - include; 0 - exclude) |
| skip     | specify the number of results to skip in the result set; useful for pagination               |
| limit    | specify the number of results to return (default should be 100 for tasks and unlimited for users)                    |
| count    | if set to true, return the count of documents that match the query (instead of the documents themselves)                    |

## Development Environment Setup

Install nvm, node.js, npm (MacOS/Linux, [original reference](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

# The below command may be needed so that nvm can be found by your shell
export NVM_DIR="$HOME/.nvm"
\. "$NVM_DIR/nvm.sh"
\. "$NVM_DIR/bash_completion"

nvm install --lts
```

Note that Windows will have to install a different way, [see here](https://github.com/coreybutler/nvm-windows).

Verify that the versions match these:
```bash
> node --version
v18.15.0
> npm --version
9.5.0
> nvm --version
0.39.3
```

[Following these instructions.](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)

Install all node packages:
```bash
npm ci
```

Create a `.env` file at the root project directory with the following contents (note that it is in the `.gitignore` and will be used to store secrets for development):
```properties
PORT=8000
# ask group for details
MONGO_CONNECTION=<authlink>
# Used for Python scripts, can configure to live or local server
ENDPOINT=<endpoint>
```

If using VSCode for development, installing [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) would be helpful.

Testing can be done either through the browser or using the tool [Postman](https://www.postman.com/).

To run the Python scripts, install [Python3](https://www.python.org/downloads/).

Optionally set up a virtual environment:
```bash
python3 -m venv backend-venv
```

Then install required dependencies:
```bash
python3 -m pip install -r python3_requirements.txt
```

## Running the Server

To run the server for development with hot-reload:
```bash
npm run dev
```

To run the server in "production":
```bash
npx run build && npm start
```

<!-- TODO: setup MongoDB -->
<!-- TODO: setup Heroku -->
<!-- TODO: auto-deploy to Heroku -->