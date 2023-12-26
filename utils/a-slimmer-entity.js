"use strict";
import { objectPick } from "@elioway/abdiel";

/** An "object picker" to make a slimmer schemaorg entity object. */
export const aSlimmerEntity = objectPick([
  "type",
  // "comment",
  "domainIncludes",
  "rangeIncludes",
  "subPropertyOf",
]);

export default aSlimmerEntity;
