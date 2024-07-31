# My Project

Descripción del proyecto.

## Instalacion

```angular2html
npm i @aws-sdk/client-s3@3.272.0 @sparticuz/chromium@126.0.0 puppeteer-core@22.14.0
npm i -D serverless@3.39.0 typescript
```
## Scripts
```npm
"build": "npx tsc"
"deploy": "npx sls deploy"
```

## Compilacion y despliegue
```npm 
npm run deploy
```

## Estructura del Proyecto

```plaintext
aws-lambda-puppeteer/
│
├── src/
│   └── handler.ts
│
├── dist/
│   └── (archivos compilados)
│
├── package.json
├── README.md
├── serverless.yml
└── tsconfig.json
