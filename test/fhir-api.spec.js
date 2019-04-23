import axios from "axios";
import * as fhirApi from "../index.js";

import questionnaireResponse from "./fixtures/QuestionnaireResponse.json";
import responseMetadata from "./fixtures/ResponseMetadata.json";
import responsePatients from "./fixtures/ResponsePatients.json";
import responsePatientsMapped from "./fixtures/ResponsePatientsMapped.json";
import responseQuestionnaire from "./fixtures/ResponseQuestionnaire.json";
import responseGeneral from "./fixtures/ResponseGeneral";

const FHIR_BASE_URL = "https://fhir.molit.eu/baseDstu3";
const FHIR_BASE_URL_INVALID = "slfdsaluztf";
const RESOURCE_TYPE = "Patient";
const RESOURCE_TYPE_INVALID = "Arizona";
const ID = "209";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const PARAMS = {
  _lastUpdated: "gt2010-10-01"
};

const ERROR_FETCH_BY_URL_URL_MISSING =
  "Fetching the resource(s) failed because the given url was null or undefined";
const ERROR_FHIR_BASE_URL_MISSING =
  "Fetching the resources failed because the given fhirBaseUrl was null or undefined";
const ERROR_RESOURCE_TYPE_MISSING =
  "Fetching the resources failed because the given resourceType was null or undefined";
const ERROR_DELETE_RESOURCE_TYPE_MISSING =
  "Resource was not deleted because the given resourceType was null or undefined";
const ERROR_RESOURCE_ID_MISSING =
  "Fetching the resource failed because the given id was null or undefined";
const ERROR_DELETE_RESOURCE_ID_MISSING =
  "Can not delete resource, resource body must contain an ID element for delete (DELETE) operation";
const ERROR_PUT_RESOURCE_ID_MISSING =
  "Can not update resource, resource body must contain an ID element for update (PUT) operation";
const ERROR_SUBMIT_FHIR_BASE_URL_MISSING =
  "Resource was not submitted because the given fhirBaseUrl was null or undefined";
const ERROR_SUBMIT_RESOURCE_MISSING =
  "Resource was not submitted because the given resource was null or undefined";
const ERROR_SUBMIT_RESOURCE_INVALID =
  "Invalid JSON content detected, missing required element: 'resourceType'";
const ERROR_DELETE_FHIR_BASE_URL_MISSING =
  "Resource was not deleted because the given fhirBaseUrl was null or undefined";
const ERROR_DELETE_RESOURCE_MISSING =
  "Resource was not deleted because the given resource was null or undefined";
const ERROR_DELETE_RESOURCE_INVALID =
  "Invalid JSON content detected, missing required element: 'resourceType'";
const ERROR_HTTP_AXIOS = "HTTP Error";

jest.mock("axios");

describe("FHIR API", () => {
  describe("fetchByUrl", () => {
    test("fetchByUrl valid", async () => {
      const resp = { data: responsePatients };
      axios.get.mockResolvedValue(resp);

      const data = (await fhirApi.fetchByUrl(FHIR_BASE_URL, {}, TOKEN)).data;
      expect(data).toBeDefined();
      expect(data).toEqual(resp.data);
    });

    test("fetchByUrl param url missing", async () => {
      try {
        await fhirApi.fetchByUrl();
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_FETCH_BY_URL_URL_MISSING);
      }

      try {
        await fhirApi.fetchByUrl(null, {}, TOKEN);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_FETCH_BY_URL_URL_MISSING);
      }
    });

    test("fetchByUrl param url invalid", async () => {
      axios.get.mockRejectedValue(new Error(ERROR_HTTP_AXIOS));

      try {
        await fhirApi.fetchByUrl(FHIR_BASE_URL_INVALID);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_HTTP_AXIOS);
      }
    });
  });

  describe("fetchResource", () => {
    test("fetchResource valid", async () => {
      const resp = { data: responseQuestionnaire };
      axios.get.mockResolvedValue(resp);

      const data = (await fhirApi.fetchResource(
        FHIR_BASE_URL,
        RESOURCE_TYPE,
        ID,
        {},
        TOKEN
      )).data;
      expect(data).toBeDefined();
      expect(data).toEqual(resp.data);
    });

    test("fetchResource params missing", async () => {
      try {
        await fhirApi.fetchResource();
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_FHIR_BASE_URL_MISSING);
      }
      try {
        await fhirApi.fetchResource(null, null);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_FHIR_BASE_URL_MISSING);
      }
    });

    test("fetchResource param fhirBaseUrl missing", async () => {
      try {
        await fhirApi.fetchResource(null, RESOURCE_TYPE);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_FHIR_BASE_URL_MISSING);
      }
    });

    test("fetchResource param fhirBaseUrl invalid", async () => {
      axios.get.mockRejectedValue(new Error(ERROR_HTTP_AXIOS));

      try {
        await fhirApi.fetchResource(FHIR_BASE_URL_INVALID, RESOURCE_TYPE, ID);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_HTTP_AXIOS);
      }
    });

    test("fetchResource param resourceType missing", async () => {
      try {
        await fhirApi.fetchResource(FHIR_BASE_URL, null);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_RESOURCE_TYPE_MISSING);
      }
    });

    test("fetchResource param resourceType invalid", async () => {
      axios.get.mockRejectedValue(new Error(ERROR_HTTP_AXIOS));

      try {
        await fhirApi.fetchResource(FHIR_BASE_URL, RESOURCE_TYPE_INVALID, ID);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_HTTP_AXIOS);
      }
    });

    test("fetchResource param id missing", async () => {
      try {
        await fhirApi.fetchResource(FHIR_BASE_URL, RESOURCE_TYPE);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_RESOURCE_ID_MISSING);
      }
    });
  });

  describe("fetchResources", () => {
    test("fetchResources valid", async () => {
      const resp = { data: responsePatients };
      axios.get.mockResolvedValue(resp);

      const data = (await fhirApi.fetchResources(
        FHIR_BASE_URL,
        RESOURCE_TYPE,
        {},
        TOKEN
      )).data;
      expect(data).toBeDefined();
      expect(data).toEqual(resp.data);
    });

    test("fetchResources params missing", async () => {
      try {
        await fhirApi.fetchResources();
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_FHIR_BASE_URL_MISSING);
      }
      try {
        await fhirApi.fetchResources(null, null);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_FHIR_BASE_URL_MISSING);
      }
    });

    test("fetchResources param fhirBaseUrl missing", async () => {
      try {
        await fhirApi.fetchResources(null, RESOURCE_TYPE);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_FHIR_BASE_URL_MISSING);
      }
    });

    test("fetchResources param fhirBaseUrl invalid", async () => {
      axios.get.mockRejectedValue(new Error(ERROR_HTTP_AXIOS));

      try {
        await fhirApi.fetchResources(FHIR_BASE_URL_INVALID, RESOURCE_TYPE);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_HTTP_AXIOS);
      }
    });

    test("fetchResources param resourceType missing", async () => {
      try {
        await fhirApi.fetchResources(FHIR_BASE_URL, null);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_RESOURCE_TYPE_MISSING);
      }
    });

    test("fetchResources param resourceType invalid", async () => {
      axios.get.mockRejectedValue(new Error(ERROR_HTTP_AXIOS));

      try {
        await fhirApi.fetchResources(FHIR_BASE_URL, RESOURCE_TYPE_INVALID);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_HTTP_AXIOS);
      }
    });
  });

  describe("fetchResourcesPost", () => {
    test("fetchResourcesPost valid", async () => {
      const resp = { data: responsePatients };
      axios.post.mockResolvedValue(resp);

      const data = (await fhirApi.fetchResourcesPost(
        FHIR_BASE_URL,
        "Patient",
        PARAMS,
        TOKEN
      )).data;
      expect(data).toBeDefined();
      expect(data).toEqual(resp.data);
    });

    test("fetchResourcesPost params missing", async () => {
      try {
        await fhirApi.fetchResourcesPost();
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_FHIR_BASE_URL_MISSING);
      }

      try {
        await fhirApi.fetchResourcesPost(null, null);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_FHIR_BASE_URL_MISSING);
      }
    });

    test("fetchResourcesPost param fhirBaseUrl missing", async () => {
      try {
        await fhirApi.fetchResourcesPost(null, "Patient");
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_FHIR_BASE_URL_MISSING);
      }
    });

    test("fetchResourcesPost param fhirBaseUrl invalid", async () => {
      axios.post.mockRejectedValue(new Error(ERROR_HTTP_AXIOS));

      try {
        await fhirApi.fetchResourcesPost(FHIR_BASE_URL_INVALID, RESOURCE_TYPE);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_HTTP_AXIOS);
      }
    });

    test("fetchResourcesPost param resourceType missing", async () => {
      try {
        await fhirApi.fetchResourcesPost(FHIR_BASE_URL, null);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_RESOURCE_TYPE_MISSING);
      }
    });

    test("fetchResourcesPost param resourceType invalid", async () => {
      axios.post.mockRejectedValue(new Error(ERROR_HTTP_AXIOS));

      try {
        await fhirApi.fetchResourcesPost(FHIR_BASE_URL, RESOURCE_TYPE_INVALID);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_HTTP_AXIOS);
      }
    });
  });

  describe("submitResource", () => {
    test("submitResource valid", async () => {
      const resp = { data: questionnaireResponse };
      axios.post.mockResolvedValue(resp);

      const data = (await fhirApi.submitResource(
        FHIR_BASE_URL,
        questionnaireResponse,
        TOKEN
      )).data;
      expect(data).toBeDefined();
      expect(data).toEqual(resp.data);
    });

    test("submitResource params missing", async () => {
      try {
        await fhirApi.submitResource();
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_SUBMIT_FHIR_BASE_URL_MISSING);
      }

      try {
        await fhirApi.submitResource(null, null, null);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_SUBMIT_FHIR_BASE_URL_MISSING);
      }
    });

    test("submitResource param fhirBaseUrl missing", async () => {
      try {
        await fhirApi.submitResource(null, questionnaireResponse);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_SUBMIT_FHIR_BASE_URL_MISSING);
      }
    });

    test("submitResource param fhirBaseUrl Invalid", async () => {
      axios.post.mockRejectedValue(new Error(ERROR_HTTP_AXIOS));

      try {
        await fhirApi.submitResource(
          FHIR_BASE_URL_INVALID,
          questionnaireResponse
        );
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_HTTP_AXIOS);
      }
    });

    test("submitResource param resource missing", async () => {
      try {
        await fhirApi.submitResource(FHIR_BASE_URL);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_SUBMIT_RESOURCE_MISSING);
      }
    });

    test("submitResource param resource invalid", async () => {
      try {
        await fhirApi.submitResource(FHIR_BASE_URL, {});
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_SUBMIT_RESOURCE_INVALID);
      }
    });
  });

  describe("updateResource", () => {
    test("updateResource valid", async () => {
      const resp = { data: questionnaireResponse };
      axios.put.mockResolvedValue(resp);

      const data = (await fhirApi.updateResource(
        FHIR_BASE_URL,
        questionnaireResponse,
        TOKEN
      )).data;
      expect(data).toBeDefined();
      expect(data).toEqual(resp.data);
    });

    test("updateResource params missing", async () => {
      try {
        await fhirApi.updateResource();
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_SUBMIT_FHIR_BASE_URL_MISSING);
      }

      try {
        await fhirApi.updateResource(null, null, null);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_SUBMIT_FHIR_BASE_URL_MISSING);
      }
    });

    test("updateResource param fhirBaseUrl missing", async () => {
      try {
        await fhirApi.updateResource(null, questionnaireResponse);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_SUBMIT_FHIR_BASE_URL_MISSING);
      }
    });

    test("updateResource param fhirBaseUrl Invalid", async () => {
      axios.put.mockRejectedValue(new Error(ERROR_HTTP_AXIOS));

      try {
        await fhirApi.updateResource(
          FHIR_BASE_URL_INVALID,
          questionnaireResponse
        );
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_HTTP_AXIOS);
      }
    });

    test("updateResource param resource missing", async () => {
      try {
        await fhirApi.updateResource(FHIR_BASE_URL);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_SUBMIT_RESOURCE_MISSING);
      }
    });

    test("updateResource param resource invalid resourceType missing", async () => {
      try {
        await fhirApi.updateResource(FHIR_BASE_URL, {});
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_SUBMIT_RESOURCE_INVALID);
      }
    });

    test("updateResource param resource invalid id missing", async () => {
      try {
        await fhirApi.updateResource(FHIR_BASE_URL, {
          resourceType: RESOURCE_TYPE
        });
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_PUT_RESOURCE_ID_MISSING);
      }
    });
  });

  describe("updateResourceByUrl", () => {
    test("updateResource valid", async () => {
      const resp = { data: questionnaireResponse };
      axios.put.mockResolvedValue(resp);

      const data = (await fhirApi.updateResourceByUrl(
        FHIR_BASE_URL,
        questionnaireResponse,
        null,
        TOKEN
      )).data;
      expect(data).toBeDefined();
      expect(data).toEqual(resp.data);
    });

    test("updateResourceByUrl params missing", async () => {
      try {
        await fhirApi.updateResourceByUrl();
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_SUBMIT_FHIR_BASE_URL_MISSING);
      }

      try {
        await fhirApi.updateResourceByUrl(null, null, null, null);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_SUBMIT_FHIR_BASE_URL_MISSING);
      }
    });

    test("updateResourceByUrl param fhirBaseUrl missing", async () => {
      try {
        await fhirApi.updateResourceByUrl(null, questionnaireResponse);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_SUBMIT_FHIR_BASE_URL_MISSING);
      }
    });

    test("updateResourceByUrl param fhirBaseUrl Invalid", async () => {
      axios.put.mockRejectedValue(new Error(ERROR_HTTP_AXIOS));

      try {
        await fhirApi.updateResourceByUrl(
          FHIR_BASE_URL_INVALID,
          questionnaireResponse
        );
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_HTTP_AXIOS);
      }
    });

    test("updateResourceByUrl param resource missing", async () => {
      try {
        await fhirApi.updateResourceByUrl(FHIR_BASE_URL);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_SUBMIT_RESOURCE_MISSING);
      }
    });

    test("updateResourceByUrl param resource invalid resourceType missing", async () => {
      try {
        await fhirApi.updateResourceByUrl(FHIR_BASE_URL, {});
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_SUBMIT_RESOURCE_INVALID);
      }
    });
  });

  describe("deleteResource", () => {
    test("deleteResource valid", async () => {
      const resp = { status: 200 };
      axios.delete.mockResolvedValue(resp);

      const status = (await fhirApi.deleteResource(
        FHIR_BASE_URL,
        questionnaireResponse,
        TOKEN
      )).status;
      expect(status).toBeDefined();
      expect(status).toEqual(resp.status);
    });

    test("deleteResource params missing", async () => {
      try {
        await fhirApi.deleteResource();
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_DELETE_FHIR_BASE_URL_MISSING);
      }

      try {
        await fhirApi.deleteResource(null, null, null);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_DELETE_FHIR_BASE_URL_MISSING);
      }
    });

    test("deleteResource param fhirBaseUrl missing", async () => {
      try {
        await fhirApi.deleteResource(null, questionnaireResponse);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_DELETE_FHIR_BASE_URL_MISSING);
      }
    });

    test("deleteResource param fhirBaseUrl Invalid", async () => {
      axios.delete.mockRejectedValue(new Error(ERROR_HTTP_AXIOS));

      try {
        await fhirApi.deleteResource(
          FHIR_BASE_URL_INVALID,
          questionnaireResponse
        );
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_HTTP_AXIOS);
      }
    });

    test("deleteResource param resource missing", async () => {
      try {
        await fhirApi.deleteResource(FHIR_BASE_URL);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_DELETE_RESOURCE_MISSING);
      }
    });

    test("deleteResource param resource invalid resourceType missing", async () => {
      try {
        await fhirApi.deleteResource(FHIR_BASE_URL, {});
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_DELETE_RESOURCE_INVALID);
      }
    });

    test("deleteResource param resource invalid id missing", async () => {
      try {
        await fhirApi.deleteResource(FHIR_BASE_URL, {
          resourceType: RESOURCE_TYPE
        });
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_DELETE_RESOURCE_ID_MISSING);
      }
    });
  });

  describe("deleteResourceById", () => {
    test("deleteResourceById valid", async () => {
      const resp = { status: 200 };
      axios.delete.mockResolvedValue(resp);

      const status = (await fhirApi.deleteResourceById(
        FHIR_BASE_URL,
        RESOURCE_TYPE,
        ID,
        TOKEN
      )).status;
      expect(status).toBeDefined();
      expect(status).toEqual(resp.status);
    });

    test("deleteResourceById params missing", async () => {
      try {
        await fhirApi.deleteResourceById();
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_DELETE_FHIR_BASE_URL_MISSING);
      }
      try {
        await fhirApi.deleteResourceById(null, null);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_DELETE_FHIR_BASE_URL_MISSING);
      }
    });

    test("deleteResourceById param fhirBaseUrl missing", async () => {
      try {
        await fhirApi.deleteResourceById(null, RESOURCE_TYPE);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_DELETE_FHIR_BASE_URL_MISSING);
      }
    });

    test("deleteResourceById param fhirBaseUrl invalid", async () => {
      axios.delete.mockRejectedValue(new Error(ERROR_HTTP_AXIOS));

      try {
        await fhirApi.deleteResourceById(
          FHIR_BASE_URL_INVALID,
          RESOURCE_TYPE,
          ID
        );
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_HTTP_AXIOS);
      }
    });

    test("deleteResourceById param resourceType missing", async () => {
      try {
        await fhirApi.deleteResourceById(FHIR_BASE_URL, null);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_DELETE_RESOURCE_TYPE_MISSING);
      }
    });

    test("deleteResourceById param resourceType invalid", async () => {
      axios.get.mockRejectedValue(new Error(ERROR_HTTP_AXIOS));

      try {
        await fhirApi.deleteResourceById(
          FHIR_BASE_URL,
          RESOURCE_TYPE_INVALID,
          ID
        );
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_HTTP_AXIOS);
      }
    });

    test("deleteResourceById param id missing", async () => {
      try {
        await fhirApi.deleteResourceById(FHIR_BASE_URL, RESOURCE_TYPE);
        throw new Error("Test should fail");
      } catch (e) {
        expect(e.message).toBe(ERROR_DELETE_RESOURCE_ID_MISSING);
      }
    });
  });

  describe("mapper functions", () => {
    test("mapFhirData valid", () => {
      let resources = fhirApi.mapFhirData(responsePatients);
      expect(resources).toEqual(responsePatientsMapped);
    });

    test("mapFhirData param data missing", () => {
      let resources = fhirApi.mapFhirData();
      expect(resources).toEqual([]);

      resources = fhirApi.mapFhirData(null);
      expect(resources).toEqual([]);
    });

    test("mapFhirData param data invalid", () => {
      let resources = fhirApi.mapFhirData({});
      expect(resources).toEqual([]);

      resources = fhirApi.mapFhirData({ entry: {} });
      expect(resources).toEqual([]);
    });

    test("mapFhirResponse valid", async () => {
      const result = fhirApi.mapFhirResponse({ data: responsePatients });
      expect(result).toEqual(responsePatientsMapped);
    });

    test("mapFhirResponse param data missing", () => {
      let resources = fhirApi.mapFhirResponse();
      expect(resources).toEqual([]);

      resources = fhirApi.mapFhirResponse(null);
      expect(resources).toEqual([]);
    });

    test("mapFhirResponse param data invalid", () => {
      let resources = fhirApi.mapFhirResponse({});
      expect(resources).toEqual([]);

      resources = fhirApi.mapFhirResponse({ data: {} });
      expect(resources).toEqual([]);

      resources = fhirApi.mapFhirResponse({ data: { entry: {} } });
      expect(resources).toEqual([]);
    });
  });

  describe("fetch functions", () => {
    test("fetchConformanceStatement valid", async () => {
      const resp = { data: responseMetadata };
      axios.get.mockResolvedValue(resp);

      const data = (await fhirApi.fetchConformanceStatement(FHIR_BASE_URL))
        .data;
      expect(data).toBeDefined();
      expect(data).toEqual(resp.data);
    });

    test("fetchPatient valid", async () => {
      const resp = { data: responseGeneral };
      axios.get.mockResolvedValue(resp);

      const data = (await fhirApi.fetchPatient(FHIR_BASE_URL, 202)).data;
      expect(data).toBeDefined();
      expect(data).toEqual(resp.data);
    });

    test("fetchPatients valid", async () => {
      const resp = { data: responsePatients };
      axios.get.mockResolvedValue(resp);

      const data = (await fhirApi.fetchPatients(FHIR_BASE_URL)).data;
      expect(data).toBeDefined();
      expect(data).toEqual(resp.data);
    });

    test("fetchQuestionnaire valid", async () => {
      const resp = { data: responseQuestionnaire };
      axios.get.mockResolvedValue(resp);

      const data = (await fhirApi.fetchQuestionnaire(FHIR_BASE_URL, 202)).data;
      expect(data).toBeDefined();
      expect(data).toEqual(resp.data);
    });

    test("fetchQuestionnaires valid", async () => {
      const resp = { data: responseMetadata };
      axios.get.mockResolvedValue(resp);

      const data = (await fhirApi.fetchQuestionnaires(FHIR_BASE_URL)).data;
      expect(data).toBeDefined();
      expect(data).toEqual(resp.data);
    });

    test("fetchValueSet valid", async () => {
      const resp = { data: responseGeneral };
      axios.get.mockResolvedValue(resp);

      const data = (await fhirApi.fetchValueSet(FHIR_BASE_URL, 202)).data;
      expect(data).toBeDefined();
      expect(data).toEqual(resp.data);
    });

    test("fetchValueSets valid", async () => {
      const resp = { data: responseGeneral };
      axios.get.mockResolvedValue(resp);

      const data = (await fhirApi.fetchValueSets(FHIR_BASE_URL)).data;
      expect(data).toBeDefined();
      expect(data).toEqual(resp.data);
    });
  });
});
