# cs565-backend (under construction)

Backend for our CS 565 project (name pending).

## Development Environment Setup

Install nvm, node.js, npm (MacOS/Linux, [original reference](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
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

Install all node packages:
<!-- TODO: install vs ci? -->
```bash
npm ci
```

Create a `.env` file at the root project directory with the following contents (note that it is in the `.gitignore` and will be used to store secrets for development):
```properties
PORT=8000
```