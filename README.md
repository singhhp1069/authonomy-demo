# Authonomy Demo

## Build the project

clone the repository

```sh
git clone git@github.com:singhhp1069/authonomy-demo.git
```

### Build the frontend

```sh
cd frontend
npm install
npm run build
cp .env.example .env 
```

setup .env fro the frontend

```sh
VUE_APP_AUTHONOMY_APP_DID="did:key:z6MkmrniEq3Cg7bv21BVbX8qkgJUPsAT6yPcBXoMKBvYtMAu"
VUE_APP_AUTHONOMY_APP_SECRET="ebfd2798-d90c-4684-bd27-9fdf737d2013"
VUE_APP_AUTHONOMY_SERVICE_URL=http://localhost:8081
VUE_APP_API_SERVICE=http://localhost:3000
```

### Build the backend and run the serve

```sh
cd ..
npm install
cp .env.example .env 
```

set .env for the backend

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
