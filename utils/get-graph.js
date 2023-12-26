"use strict";
import { objectArraySortByProperty } from "@elioway/abdiel";
import { mapSimplerGraph } from "@elioway/belial";
import { readGraphFileRelatively } from "@elioway/belial/utils";

export const getGraph = async () => {
  let GRAPH = await readGraphFileRelatively(
    import.meta.url,
    "../schemaorg/data/releases/9.0/schemaorg-all-http.jsonld",
  );
  GRAPH = GRAPH.map(mapSimplerGraph("http://schema.org/")).sort(
    objectArraySortByProperty("id"),
  );
  return GRAPH;
};
export default getGraph;
