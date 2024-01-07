# Authonomy Demo

## Build the project

clone the repository

```sh
git clone git@github.com:singhhp1069/authonomy-demo.git
```

### Build the service, frontend and run the serve

```sh
cd ..
cp .env.example .env (set the .env)
npm install
```

 .env for the backend looks like

```sh
AUTHONOMY_APP_DID="did:key:z6MkmrniEq3Cg7bv21BVbX8qkgJUPsAT6yPcBXoMKBvYtMAu"
AUTHONOMY_APP_SECRET="ebfd2798-d90c-4684-bd27-9fdf737d2013"
AUTHONOMY_SERVICE_URL=http://localhost:8081
APP_PORT=3000
```

start the service

```sh
npm start

access it on http://localhost:{PORT}
```
