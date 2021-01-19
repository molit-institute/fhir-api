## FHIR API

![build](https://github.com/molit-institute/fhir-api/workflows/Build/badge.svg)
![publish](https://github.com/molit-institute/fhir-api/workflows/Publish/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/molitinstitute/fhir-api/badge.svg?branch=master)](https://coveralls.io/github/molitinstitute/fhir-api?branch=master)
![npm](https://img.shields.io/npm/v/@molit/fhir-api.svg)
![NPM](https://img.shields.io/npm/l/@molit/fhir-api.svg)

This is an api library to handle FHIR resources.

### Installation

Install like a normal npm dependency.

```bash
npm i @molit/fhir-api
```

### Usage

Import the library and use the functions of the library.

```js
import * as fhirApi from "@molit/fhir-api";

let List = fhirApi.fetchQuestionnaires(fhirBaseUrl);
```

Tree shaking is also supported. 🌲

```js
import { fetchQuestionnaires } from "@molit/fhir-api";

let name = fetchQuestionnaires(fhirBaseUrl);
```

### Documentation

See full documentation here: https://docs.molit.eu/fhir-api/
