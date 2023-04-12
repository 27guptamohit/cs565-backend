# cs565-backend (under construction)

Backend for our CS 565 project (name pending).

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
```

If using VSCode for development, installing [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) would be helpful.

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