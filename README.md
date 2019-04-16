[![Build Status](https://travis-ci.org/molitinstitute/fhir-api.svg?branch=master)](https://travis-ci.org/molitinstitute/fhir-api)
![npm](https://img.shields.io/npm/v/@molit/fhir-api.svg)
![NPM](https://img.shields.io/npm/l/@molit/fhir-api.svg)

## FHIR Api

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
