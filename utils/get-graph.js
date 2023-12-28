"use strict";
import {
  fsImportMetaUrlPath,
  fsReadJson,
  objectArraySortByProperty,
} from "@elioway/abdiel";
import { mapSimplerGraph } from "@elioway/belial";

export const getGraph = async () => {
  let schemaPath = fsImportMetaUrlPath(
    import.meta.url,
    "../schemaorg/data/releases/9.0/schemaorg-all-http.jsonld",
  );
  const GRAPH = await fsReadJson(schemaPath);
  return (
    GRAPH["@graph"]
      // Normalise for elioWay use.
      .map(mapSimplerGraph("http://schema.org/"))
      // Sort all the entities so that output propeties of objects are also;
      .sort(objectArraySortByProperty("id"))
  );
};

export default getGraph;
