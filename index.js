import axios from "axios";
import qs from "qs";

/**
 * Fetches resource(s) by the given <code>url</code>.
 *
 * @param {String} url - the url
 * @param {Object} [params = {}] - the FHIR query params
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function fetchByUrl(url, params = {}, token) {
  if (!url) {
    throw new Error(
      "Fetching the resource(s) failed because the given url was null or undefined"
    );
  }

  const headers = {
    "Cache-Control": "no-cache"
  };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const options = {
    params,
    headers
  };
  return axios.get(url, options);
}

/**
 * Fetches the resource from the FHIR server with the given <code>id</code>.
 *
 * @param {String} fhirBaseUrl - the base URL of the FHIR server
 * @param {String} resourceType - the type of the FHIR resource
 * @param {String} id - id of the resource to be fetched
 * @param {Object} [params = {}] - the FHIR query params
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function fetchResource(
  fhirBaseUrl,
  resourceType,
  id,
  params = {},
  token
) {
  if (!fhirBaseUrl) {
    throw new Error(
      "Fetching the resources failed because the given fhirBaseUrl was null or undefined"
    );
  }

  if (!resourceType) {
    throw new Error(
      "Fetching the resources failed because the given resourceType was null or undefined"
    );
  }

  if (id === null || id === undefined) {
    throw new Error(
      "Fetching the resource failed because the given id was null or undefined"
    );
  }

  const url = `${fhirBaseUrl}/${resourceType}/${id}`;
  const headers = {
    "Cache-Control": "no-cache"
  };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const options = {
    params,
    headers
  };

  return axios.get(url, options);
}

/**
 * Fetches resources from a FHIR server using a GET request.
 *
 * @param {String} fhirBaseUrl - the base URL of the FHIR server
 * @param {String} resourceType - the type of the FHIR resource
 * @param {Object} [params = {}] - the FHIR query params
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function fetchResources(fhirBaseUrl, resourceType, params = {}, token) {
  if (!fhirBaseUrl) {
    throw new Error(
      "Fetching the resources failed because the given fhirBaseUrl was null or undefined"
    );
  }

  if (!resourceType) {
    throw new Error(
      "Fetching the resources failed because the given resourceType was null or undefined"
    );
  }

  const url = `${fhirBaseUrl}/${resourceType}`;
  const headers = {
    "Cache-Control": "no-cache"
  };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const options = {
    headers,
    params
  };

  if (!(params instanceof URLSearchParams)) {
    options.paramsSerializer = params =>
      qs.stringify(params, { arrayFormat: "repeat" });
  }

  return axios.get(url, options);
}

/**
 * Fetches resources from a FHIR server using a POST request.
 *
 * @param {String} fhirBaseUrl - the base URL of the FHIR server
 * @param {String} resourceType - the type of the FHIR resource
 * @param {Object} [params = {}] - the FHIR query params
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function fetchResourcesPost(
  fhirBaseUrl,
  resourceType,
  params = {},
  token
) {
  if (!fhirBaseUrl) {
    throw new Error(
      "Fetching the resources failed because the given fhirBaseUrl was null or undefined"
    );
  }

  if (!resourceType) {
    throw new Error(
      "Fetching the resources failed because the given resourceType was null or undefined"
    );
  }

  const url = `${fhirBaseUrl}/${resourceType}/_search`;
  const headers = {
    "Cache-Control": "no-cache"
  };

  let urlSearchParams = new URLSearchParams();

  for (let p in params) {
    urlSearchParams.append(p, params[p]);
  }

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const options = {
    headers
  };

  return axios.post(url, urlSearchParams, options);
}

/**
 * Submits a given resource to the server
 *
 * @param {String} fhirBaseUrl - the base URL of the FHIR server
 * @param {Object} resource - resource that is supposed to be submitted
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function submitResource(fhirBaseUrl, resource, token) {
  if (!fhirBaseUrl) {
    throw new Error(
      "Resource was not submitted because the given fhirBaseUrl was null or undefined"
    );
  }

  if (!resource) {
    throw new Error(
      "Resource was not submitted because the given resource was null or undefined"
    );
  }

  if (!resource.resourceType) {
    throw new Error(
      "Invalid JSON content detected, missing required element: 'resourceType'"
    );
  }

  const url = `${fhirBaseUrl}/${resource.resourceType}`;
  const headers = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json"
  };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const options = {
    headers
  };

  return axios.post(url, resource, options);
}

/**
 * Updates an existing FHIR resource on the FHIR server.
 *
 * @param {String} fhirBaseUrl - the base URL of the FHIR server
 * @param {Object} resource - resource that is supposed to be submitted
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function updateResource(fhirBaseUrl, resource, token) {
  if (!fhirBaseUrl) {
    throw new Error(
      "Resource was not submitted because the given fhirBaseUrl was null or undefined"
    );
  }

  if (!resource) {
    throw new Error(
      "Resource was not submitted because the given resource was null or undefined"
    );
  }

  if (!resource.resourceType) {
    throw new Error(
      "Invalid JSON content detected, missing required element: 'resourceType'"
    );
  }

  if (resource.id === null || resource.id === undefined) {
    throw new Error(
      "Can not update resource, resource body must contain an ID element for update (PUT) operation"
    );
  }

  const url = `${fhirBaseUrl}/${resource.resourceType}/${resource.id}`;
  const headers = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json"
  };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const options = {
    headers
  };

  return axios.put(url, resource, options);
}

/**
 * Updates an existing FHIR resource on the FHIR server or creates a new resource if no id is in the given FHIR resource.
 *
 * @param {String} fhirBaseUrl - the base URL of the FHIR server
 * @param {Object} resource - resource that is supposed to be submitted
 * @param {Object} [params = {}] - the FHIR query params
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function updateResourceByUrl(fhirBaseUrl, resource, params = {}, token) {
  if (!fhirBaseUrl) {
    throw new Error(
      "Resource was not submitted because the given fhirBaseUrl was null or undefined"
    );
  }

  if (!resource) {
    throw new Error(
      "Resource was not submitted because the given resource was null or undefined"
    );
  }

  if (!resource.resourceType) {
    throw new Error(
      "Invalid JSON content detected, missing required element: 'resourceType'"
    );
  }

  const url = `${fhirBaseUrl}/${resource.resourceType}`;
  const headers = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json"
  };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const options = {
    params,
    headers
  };

  return axios.put(url, resource, options);
}

/**
 * Deletes a FHIR resource from the FHIR server.
 *
 * @param {String} fhirBaseUrl - the base URL of the FHIR server
 * @param {Object} resource - resource that is supposed to be deleted
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function deleteResource(fhirBaseUrl, resource, token) {
  if (!fhirBaseUrl) {
    throw new Error(
      "Resource was not deleted because the given fhirBaseUrl was null or undefined"
    );
  }

  if (!resource) {
    throw new Error(
      "Resource was not deleted because the given resource was null or undefined"
    );
  }

  if (!resource.resourceType) {
    throw new Error(
      "Invalid JSON content detected, missing required element: 'resourceType'"
    );
  }

  if (resource.id === null || resource.id === undefined) {
    throw new Error(
      "Can not delete resource, resource body must contain an ID element for delete (DELETE) operation"
    );
  }

  const url = `${fhirBaseUrl}/${resource.resourceType}/${resource.id}`;
  const headers = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json"
  };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const options = {
    headers
  };

  return axios.delete(url, options);
}

/**
 *
 * @param {String} fhirBaseUrl - the base URL of the FHIR server
 * @param {Object} resourceType - the type of the FHIR resource
 * @param {String} id - id of the resource to be deleted
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function deleteResourceById(fhirBaseUrl, resourceType, id, token) {
  if (!fhirBaseUrl) {
    throw new Error(
      "Resource was not deleted because the given fhirBaseUrl was null or undefined"
    );
  }

  if (!resourceType) {
    throw new Error(
      "Resource was not deleted because the given resourceType was null or undefined"
    );
  }

  if (id === null || id === undefined) {
    throw new Error(
      "Can not delete resource, resource body must contain an ID element for delete (DELETE) operation"
    );
  }

  const url = `${fhirBaseUrl}/${resourceType}/${id}`;
  const headers = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json"
  };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const options = {
    headers
  };

  return axios.delete(url, options);
}

/**
 * Maps the response of a FHIR search query bundle to the actual FHIR resources.
 *
 * @example
 * <caption>Basic usage</caption>
 * import fhirApi from "@molit/fhir-api";
 *
 * console.log(bundle);
 * // ->
 * // {
 * //   "resourceType": "Bundle",
 * //   "type": "searchset",
 * //   "total": 2,
 * //   "entry": [
 * //     {
 * //       "fullUrl": "\thttps://fhir.molit.eu/baseDstu3/Patient/6",
 * //       "resource": {
 * //         "resourceType": "Patient",
 * //         "id": "6"
 * //       }
 * //     },
 * //     {
 * //       "fullUrl": "\thttps://fhir.molit.eu/baseDstu3/Patient/8",
 * //       "resource": {
 * //         "resourceType": "Patient",
 * //         "id": "8"
 * //       }
 * //     }
 * //   ]
 * // }
 *
 * let patients = fhirApi.mapFhirData(bundle);
 * console.log(patients)
 * // ->
 * // [
 * //   {
 * //     "resourceType": "Patient",
 * //     "id": "6"
 * //   },
 * //   {
 * //     "resourceType": "Patient",
 * //     "id": "8"
 * //   }
 * // ]
 *
 * @param {Object} data - a FHIR search bundle.
 * @returns {Array} the resources in an array
 */
export function mapFhirData(data) {
  if (!data || !data.entry || !Array.isArray(data.entry)) {
    return [];
  }
  return data.entry.map(element => element.resource);
}

/**
 * Maps the response of a FHIR search query to the actual FHIR resources.
 * @see {@link mapFhirData} for further information.
 *
 * @param {Object} res - the response of a FHIR search query.
 * @returns {Array} the resources in an array
 */
export function mapFhirResponse(res) {
  if (!res || !res.data || !res.data.entry || !Array.isArray(res.data.entry)) {
    return [];
  }
  return mapFhirData(res.data);
}

/**
 * Fetches the conformance statement.
 *
 * @param {String} fhirBaseUrl - the base URL of the FHIR server
 * @param {Object} [params] - the FHIR query params
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function fetchConformanceStatement(fhirBaseUrl, params, token) {
  const resourceType = `metadata`;
  return fetchResources(fhirBaseUrl, resourceType, params, token);
}

/**
 * Fetches the Patient with the given <code>id</code> from a FHIR server.
 *
 * @param {String} fhirBaseUrl - the base URL of the FHIR server
 * @param {String} id - id of the Patient to be fetched
 * @param {Object} [params] - the FHIR query params
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function fetchPatient(fhirBaseUrl, id, params, token) {
  const resourceType = `Patient`;
  return fetchResource(fhirBaseUrl, resourceType, id, params, token);
}

/**
 * Fetches Patients from a FHIR server.
 *
 * @param {String} fhirBaseUrl - the base URL of the FHIR server
 * @param {Object} [params] - the FHIR query params
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function fetchPatients(fhirBaseUrl, params, token) {
  return fetchResources(fhirBaseUrl, "Patient", params, token);
}

/**
 * Fetches the Questionnaire with the given <code>id</code> from a FHIR server.
 *
 * @param {String} fhirBaseUrl url of the FHIR-Server
 * @param {String} id - id of the Questionnaire to be fetched
 * @param {Object} [params] - the FHIR query params
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function fetchQuestionnaire(fhirBaseUrl, id, params, token) {
  const resourceType = `Questionnaire`;
  return fetchResource(fhirBaseUrl, resourceType, id, params, token);
}

/**
 * Fetches Questionnaires from a FHIR server.
 *
 * @param {String} fhirBaseUrl - the base URL of the FHIR server
 * @param {Object} [params] - the FHIR query params
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function fetchQuestionnaires(fhirBaseUrl, params, token) {
  return fetchResources(fhirBaseUrl, "Questionnaire", params, token);
}

/**
 * Fetches ValueSet from a FHIR server.
 *
 * @param {String} fhirBaseUrl - the base URL of the FHIR server
 * @param {String} id - id of the ValueSet to be fetched
 * @param {Object} [params] - the FHIR query params
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function fetchValueSet(fhirBaseUrl, id, params, token) {
  const resourceType = `ValueSet`;
  return fetchResource(fhirBaseUrl, resourceType, id, params, token);
}

/**
 * Fetches ValueSets from a FHIR server.
 *
 * @param {String} fhirBaseUrl - the base URL of the FHIR server
 * @param {Object} [params] - the FHIR query params
 * @param {String} [token] - the authentication token
 * @returns {Promise} Promise object representing the response to the http call
 */
export function fetchValueSets(fhirBaseUrl, params, token) {
  return fetchResources(fhirBaseUrl, "ValueSet", params, token);
}
