"use strict";
import path from "path";
import { fileURLToPath } from "url";
import difference from "./utils/difference.js";
import union from "./utils/union.js";
import xor from "./utils/xor.js";
import { getSchema } from "./get-schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ThingBuilder {
  /**
   * @file
   * @author Tim Bushell
   *
   * @tutorial
   * You'll want to use this. A lot. Thing CLI uses it extensively so the best "tutorial" for now is that.
   *
   * @param {Array} graphList of schema objects from jsonld.
   * @param {String} domain used in jsonld.
   * @param {Array} fixedPrimitives names we'll treat as Primitive datatypes.
   *        For instance, depending on the database, you might choose to make
   *        "ImageObject" a Primitive if your database supports it.
   */
  constructor(schemaVersion, domain, fixedPrimitives) {
    let graphList = getSchema(path.join(__dirname, schemaVersion));
    this.domain = domain;
    this.graphList = graphList;
    this.MODELS = new Map();
    this.FIELDS = new Map();
    this.PRIMTS = new Map();
    if (Array.isArray(fixedPrimitives) && fixedPrimitives.length) {
      for (let primitiveName of fixedPrimitives) {
        this.PRIMTS.set(primitiveName, {
          name: primitiveName,
          comment: "Fixed as Primitive in constructor.",
        });
      }
    }
    this.schemify(graphList);
  }

  /**
   * @file Builds models/fields/primts
   * @author Tim Bushell
   *
   * @tutorial Doing this makes it easier to build the "DNA" of Models.
   *
   * @param {Array} graphList of schema objects from jsonld.
   */
  async schemify(graphList) {
    // Zero out.
    this.MODELS = new Map();
    this.FIELDS = new Map();
    // Collect all the known Primitives first.
    for (let schemaObj of graphList) {
      let schemaName = this._labelOf(schemaObj["rdfs:label"]);
      let schemaType = this._typeOf(schemaObj["@type"]);
      let schemaComment = schemaObj["rdfs:comment"];
      // Handle Primitives
      if (schemaType === "Primitive") {
        this.PRIMTS.set(schemaName, {
          comment: schemaComment,
          name: schemaName,
        });
      }
    }
    // Collect Type/Class/Models.
    for (let schemaObj of graphList) {
      let schemaName = this._labelOf(schemaObj["rdfs:label"]);
      let schemaType = this._typeOf(schemaObj["@type"]);
      let schemaComment = schemaObj["rdfs:comment"];
      // Handle a Type/Class/Model
      if (schemaType === "Class") {
        this._setModel(schemaName, {
          comment: schemaComment,
          subs: this._setOf(schemaObj, "rdfs:subClassOf"),
        });
      }
      // Handle a Property/Field
      else if (schemaType === "Property") {
        let typeOf = this._setOf(schemaObj, `${this.domain}rangeIncludes`);
        let fieldOf = this._setOf(schemaObj, `${this.domain}domainIncludes`);
        this.FIELDS.set(schemaName, {
          comment: schemaComment,
          models: fieldOf,
          name: schemaName,
          types: typeOf,
        });
        // Add this property to any related Domain/Type/Class/Model
        for (let classType of fieldOf) {
          this._setModel(classType, { field: schemaName });
        }
      }
      // Handle a Enumerated Type Value
      else {
        for (let typeOf of schemaType) {
          let enumeratorOf = typeOf.replace(this.domain, "");
          this._setModel(enumeratorOf, { enum: schemaName });
        }
      }
    }
  }

  /**
   * @file Utility function to progressively build up the map of a model.
   * @author Tim Bushell
   *
   * @param {str} name of the Model/Type/Class.
   * @param {Object} cfg with values to create/update the Model/Type/Class.
   */
  _setModel(name, cfg) {
    // Check to see if subClasses a primitive.
    let primts = [...this.PRIMTS.keys()];
    if (
      cfg.subs &&
      [...cfg.subs].filter((sub) => primts.includes(sub)).length
    ) {
      let p = this.PRIMTS.get(name) || {
        comment: cfg.comment,
        name: name,
      };
      this.PRIMTS.set(name, p);
      return;
    }
    // Otherwise handle as normal type.
    let t = this.MODELS.get(name) || {
      name: name,
      fields: new Set(),
      enums: new Set(),
    };
    t.comment = cfg.comment ? cfg.comment : t.comment;
    t.subs = cfg.subs ? cfg.subs : t.subs;
    t.fields = cfg.field ? new Set([...t.fields]).add(cfg.field) : t.fields;
    t.enums = cfg.enum ? new Set([...t.enums]).add(cfg.enum) : t.enums;
    this.MODELS.set(name, t);
  }

  /**
   * @file Utility function to treat schema properties consistently.
   * @author Tim Bushell
   *
   * @tutorial Some schema property are single objs, some are lists. We'll
   * just convert the singles to an array of one item so that the rest of the
   * the code doesn't have to worry about it!
   *
   * @param {obj} name of the Model/Type/Class.
   * @returns {Array} whether it was originally an Array or not.
   */
  _listAnyway(obj) {
    return Array.isArray(obj) ? obj : [obj];
  }

  /** @file Resolve variations in the "@type" property of a Schema.org jsonld
   * object.
   * @author Tim Bushell
   *
   * @tutorial
   * Variations are:
   * - Class Type i.e. "rdfs:Class"
   * - Property Type i.e. "rdf:Property"
   * - Primitive Type i.e. [ "rdfs:Class", "http://schema.org/DataType" ]
   * - Schema Type e.g. "http://schema.org/RestrictedDiet"
   * - Schema Types e.g. ["http://schema.org/RestrictedDiet", "http://schema.org/MedicalDiet"]
   * @param {operand} value is from the schema obj "@type" property.
   * @returns {str/Array} String or Array representing the type of Schema.org
   * jsonld object.
   */
  _typeOf(value) {
    if (value === "rdfs:Class") {
      return "Class";
    } else if (value === "rdf:Property") {
      return "Property";
    } else if (
      Array.isArray(value) &&
      value.includes(`${this.domain}DataType`)
    ) {
      return "Primitive";
    } else if (Array.isArray(value) || value.includes(this.domain)) {
      // List anyway philosophy (if some are a list - force a list).
      return this._listAnyway(value);
    } else {
      throw `Unknown @type: ${value}.`;
    }
  }

  /** @file Resolve variations in the "rdfs:label" property of a Schema.org jsonld object.
   * @author Tim Bushell
   *
   * @tutorial
   * Variations are:
   * - String i.e. "Rocket"
   * - Language i.e. { "@language": "en", "@value": "publisherImprint" }
   * @param {operand} value is from the schema obj "rdfs:label" property.
   * @returns {str} representing the label of Schema.org jsonld object.
   */
  _labelOf(value) {
    if (typeof value === "string") {
      return value;
    } else if (typeof value === "object") {
      return value["@value"];
    } else {
      throw `Unknown rdfs:label: ${value}.`;
    }
  }

  /**
   * @file Utility function to handle a schema's relationship properties.
   * @author Tim Bushell
   *
   * @param {Object} obj is a schema object lsted in the graph.
   * @param {str} key is the property name to resolve.
   * @returns {Set} of values for this property stripped of the Schema domain.
   */
  _setOf(obj, key) {
    if (!obj.hasOwnProperty(key)) {
      return new Set();
    }
    return new Set(
      this._listAnyway(obj[key]).map((d) => d["@id"].replace(this.domain, "")),
    );
  }

  /** @file Utility class to find the best Matching Type.
   * @author Tim Bushell
   *
   * @tutorial We will add the Primitives to the modelsAvailable and return the
   * first match or Text. For that reason, the list of primitives should be
   * ordered by preference.
   *
   * @param {Set} fieldTypes available to this field.
   * @param {Array} modelsAvailable which could be made available to the field.
   * @returns {str} being the best Type to use for this field.
   */
  _bestFieldType(fieldTypes, modelsAvailable) {
    for (let type of modelsAvailable) {
      if (fieldTypes.has(type)) return type;
    }
  }

  /**
   * @file Utility to "climb the tree" of class type inheritance.
   * @author Tim Bushell
   *
   * @param {Array} subs are usually the direct classes.
   * @returns {Array} the entire tree of inheritance.
   */
  _parentClassesOf(knownSubs) {
    let newSubs = new Array();
    for (let parent of knownSubs) {
      let parentClass = this.MODELS.get(parent);
      if (parentClass) {
        let unKnownSubs = difference([...parentClass.subs], knownSubs);
        newSubs = union(newSubs, unKnownSubs);
      }
    }
    if (newSubs.length) {
      knownSubs = union(this._parentClassesOf(newSubs), knownSubs);
    }
    return knownSubs;
  }

  /**
   * @file Gets the Model dependancies required to handle the wanted models'
   * foreign keys and field types.
   * @author Tim Bushell
   *
   * @tutorial
   * In the list of Models wanted, we need to check for Parent Models and
   * include these in the final list of models to build.
   *
   * Also... Fields belonging to the wanted Models can be also be Models, i.e.
   * Foreign Keys. Models need to be created to cover those cases. Often
   * Fields have more than 1 Type in Schema, but for purposes of modelling
   * them for a database, we need to resolve to just 1 of those Types.
   *
   * We will take the approach that if a Field has a PrimitiveType, we will use
   * that UNLESS it also has a ModelType that is already included in the
   * original list of Models wanted. If the Field has no PrimitiveType, we will
   * use the ModelType if the depth allows. If the depth is 0, we will use Text
   * as the Default Primitive Type. But if the depth is higher we will use the
   * ModelType.
   *
   * WORSE CASE: Some ModelTypes have Fields which are also Types. This is where
   * the depth option is important, ensuring we start substituting ModelTypes
   * with a PrimitiveType once the depth has been reached.
   *
   * @param {Array} selectedModels in the target elioWay application.
   * @param {integer} opts including "depth" we need to go to resolve Model dependancies.
   * @param {Array} {opt} candidateModels more models to search.
   * @param {integer} {opt} currentDepth we need to go to resolve Model dependancies.
   * @returns {Array} of Models.
   */
  modelMiner(selectedModels, opts, candidateModels, currentDepth) {
    if (!opts) opts = { depth: 0, comments: false };
    // Defaults for recursive parameters.
    if (!currentDepth) currentDepth = 0;
    // At each depth, search with the current models and the candidates.
    candidateModels = union(selectedModels, candidateModels);

    let PRIMITIVES = [...this.PRIMTS.keys()];
    // log(`PRIMITIVES: ${PRIMITIVES}`)
    // log(`DEPTH: ${opts.depth}`)
    // log(`CURRENTDEPTH: ${currentDepth}`)
    // log(`${currentDepth} selectedModels: ${selectedModels}`)
    // log(`${currentDepth} candidateModels: ${candidateModels}`)
    // Models mined at this depth.
    let modelsMined = new Array();
    // Models to check for the next depth.
    let deeperModels = new Array();
    // The set of models we want to search against.
    for (let modelName of candidateModels) {
      let modelDef = this.MODELS.get(modelName);
      // Null if Primitive type. Ignore.
      if (modelDef) {
        modelsMined = union(
          modelsMined,
          this._parentClassesOf([...(modelDef.subs || [])]),
        );
        // log(`${currentDepth} SubsMined: ${modelsMined}`)
        // Check the ModelType(s) of its fields.
        // log(`${currentDepth} modelDef.fields: ${[...modelDef.fields]}`)
        for (let fieldName of modelDef.fields) {
          let fieldDef = this.FIELDS.get(fieldName);
          // Put them in order: selectedModels, candidateModels then primitives.
          // We're adding candidateModels here because there's a chance we might
          // use them,
          let selectFromModels = union(candidateModels, PRIMITIVES);
          // Select the most appropriate type for this fieldDef.
          // log(`${currentDepth} fieldDef.types ${[...fieldDef.types]}`)
          let chosenFieldType = this._bestFieldType(
            fieldDef.types,
            selectFromModels,
          );
          // log(`${currentDepth} chosenFieldType: ${chosenFieldType}`)
          // See whether this is a ModelType, or a simple Primitive.
          if (this.MODELS.get(chosenFieldType)) {
            // If ModelType, add to the Set of models we will need.
            modelsMined.push(chosenFieldType);
          } else {
            // Build a list of future Models to check.
            let fieldsModelTypes = difference([...fieldDef.types], PRIMITIVES);
            // log(`${currentDepth} fieldsModelTypes: ${fieldsModelTypes}`)
            deeperModels = union(deeperModels, fieldsModelTypes);
          }
        } // end for each field of modelDef
      } // end if modelDef
    }
    let modelResults = union(
      selectedModels,
      difference(modelsMined, PRIMITIVES),
    );
    // log("------")
    // Only go deeper if there are unmined ModelTypes.
    deeperModels = xor(modelResults, deeperModels);
    // log(`${currentDepth} modelResults: ${modelResults}`)
    // log(`${currentDepth} deeperModels: ${deeperModels}`)
    // log(`==================== end depth ${currentDepth}`)
    // Allow to go deeper?
    if (currentDepth < opts.depth && deeperModels && deeperModels.length) {
      return this.modelMiner(
        modelResults,
        opts,
        deeperModels,
        (currentDepth += 1),
      );
    } else {
      // Return as Array
      return modelResults;
    }
  }

  /**
   * @file Conveniently makes an array of Models.
   * @author Tim Bushell
   *
   * @param {Array} selectedModels in the target elioWay application.
   * @param {integer} opts including "depth" we need to go to resolve Model dependancies.
   * @returns {Array} of Models.
   */

  modelsMaker(selectedModels, opts) {
    if (!opts) opts = { depth: 0, comments: false };
    let models = new Object();
    let baseModels = this.modelMiner(selectedModels, opts);
    for (let selectedModelName of selectedModels) {
      models[selectedModelName] = this.modelMaker(
        selectedModelName,
        baseModels,
        opts,
      );
    }
    return models;
  }
  /**
   * @file Make a simple JSON version of a Model.
   * @tutorial To build a Model prepared for a backend database, you have two
   * choices. Either override this function, or use it's return value as the
   * basis for a custom function.
   *
   * @param {str} selectedModelName to build.
   * @param {Array} baseModels output from this.modelMiner.
   * @returns {Object} JSON format version of the Model.
   */
  modelMaker(selectedModelName, baseModels, opts) {
    // Convinient for a single call.
    if (!baseModels) {
      baseModels = this.modelMiner([selectedModelName]);
    }
    // Fall back if Field Type is not a Schema Class.
    let PRIMITIVES = [...this.PRIMTS.keys()];
    let ENUMTYPES = [...this.MODELS.values()]
      .filter((m) => m.enums.size)
      .map((m) => m.name);
    // Primitives and Enum should permanently be available as Field Types.
    let PERMANENTLY = union(PRIMITIVES, ENUMTYPES);
    // log(`PERMANENTLY: ${PERMANENTLY}`)
    // Internal Model definition resolved by `schemify` function.
    let modelDef = this.MODELS.get(selectedModelName);
    if (!modelDef) {
      throw new RangeError(
        `${selectedModelName} Model not found. Is Class Type in Schema?`,
      );
    }
    // Return object.
    let model = new Object();
    // Instantiate return object's fields and other properties.
    model.fields = new Object();
    model.name = selectedModelName;
    model.subs = this._parentClassesOf([...modelDef.subs]);
    if (opts.comments) {
      model.comment = modelDef.comment;
    }
    // Resolve this Model's fields
    for (let fieldName of modelDef.fields) {
      // Internal Field definition resolved by `schemify` function.
      let fieldDef = this.FIELDS.get(fieldName);
      // Current field object.
      let field = new Object();
      // Schema fields often have 2 or more Types. We need to logically select
      // one of those types. `baseModels` are the models we have previously
      // mined depending on the depth we will tolerate and it will be the first
      // field type to matches one of those Models which will be selected -
      // otherwise we will default to a Primitive. In the unlikely event none
      // are matched: Fallsback to Text.
      let selectFromModels = union(baseModels, PERMANENTLY);
      field.type =
        this._bestFieldType(fieldDef.types, selectFromModels) || "Text";
      // Internal Model definition resolved by `schemify` function.
      let fieldTypeDef = this.MODELS.get(field.type);
      if (fieldTypeDef) {
        field.foreign = true;
        // If Model Type is enumerated, convert to Text field type and attached
        // the valid list of Schema enumerated values.
        if (fieldTypeDef.enums) {
          let fieldEnums = [...fieldTypeDef.enums.values()];
          if (fieldEnums.length) {
            delete field.foreign;
            if (!difference(fieldEnums, ["True", "False"]).length) {
              // Convert to Text + enumerated values.
              field.type = "Boolean";
            } else {
              // Convert to Text + enumerated values.
              field.type = "Text";
              field.enums = fieldEnums;
            }
          }
        }
      } else {
        fieldTypeDef = this.PRIMTS.get(field.type);
      }
      if (opts.comments) {
        field.comment = fieldDef.comment;
      }
      model.fields[fieldName] = field;
    }
    return model;
  }

  /**
   * @file Make a simple JSON, version of a complete Thing.
   * @tutorial This creates a Thing with the Thing type's fields and a map
   * of all the sub-Types.
   *
   * @param {str} selectedModelName to build.
   * @param {Array} baseModels output from this.modelMiner.
   * @param {Object} opts {depth, comments}
   * @returns {Object} JSON format version of the Model.
   */
  _Thing(selectedModelName, baseModels, opts) {
    // Default options.
    if (!opts) opts = { depth: 0, comments: false };
    // Return a Thing,
    let thing = this.sortObjKeysAlphabetically(
      this.modelMaker("Thing", baseModels, opts).fields,
    );
    // Add ItemList to the Thing model.
    thing.ItemList = this.sortObjKeysAlphabetically(
      this.modelMaker("ItemList", baseModels, opts).fields,
    );
    // If selectedModelName is not super class.
    if (
      selectedModelName !== "Thing" &&
      typeof selectedModelName === "string"
    ) {
      // Make the selectedModel.
      let selectedModel = this.modelMaker(selectedModelName, baseModels, opts);
      // "Engage" the selectedModel.
      thing[selectedModelName] = this.sortObjKeysAlphabetically(
        selectedModel.fields,
      );
      // thing[selectedModelName].comment = selectedModel.comment
      // Find all the Types this thing subclasses.
      let subs = selectedModel.subs.map((s) => s);
      for (let sub of subs) {
        if (sub !== "Thing" && sub !== "ItemList") {
          // "Engage" the selectedModel's subclasses.
          thing[sub] = this.sortObjKeysAlphabetically(
            this.modelMaker(sub, baseModels, opts).fields,
          );
        }
      }
    }
    return thing;
  }

  /**
   * @file Build all the Schemas, with meta, your app needs.
   * @param {str} selectedModelNames to build.
   * @param {Object} opts {depth, comments}
   * @returns {Object} JSON format version of the Model with data types.
   */
  Things(selectedModelNames, opts) {
    if (!opts) opts = { depth: 0, comments: false };
    if (!Array.isArray(selectedModelNames)) {
      selectedModelNames = [selectedModelNames];
    }
    let things = new Object();
    let modelsMined = this.modelMiner(selectedModelNames, opts);
    for (let modelName of modelsMined) {
      things[modelName] = this._Thing(modelName, modelsMined, opts);
    }
    return things;
  }
  /**
   * @file Build a Schema, with meta.
   * @param {str} selectedModelName to build.
   * @param {Object} opts {depth, comments}
   * @returns {Object} JSON format version of the Model with data types.
   */
  Thing(selectedModelName, opts) {
    if (!opts) opts = { depth: 0, comments: false };
    let modelsMined = this.modelMiner([selectedModelName], opts);
    return this._Thing(selectedModelName, modelsMined, opts);
  }
  /**
   * @file Convenient utility to build an instance of a Thing (a thinglet),
   * no meta, just empty fields.
   * @param {str} selectedModel to build.
   * @returns {Object} JSON format instance of a Thing.
   */
  thinglet(Thing, thingType) {
    let thing = {};
    Object.entries(Thing).forEach(([field, def]) => {
      if (!def.hasOwnProperty("type")) {
        thing[field] = this.thinglet(def, field);
      } else {
        if (field === "identifier") {
          thing[field] = "";
        } else if (field === "mainEntityOfPage") {
          thing[field] = thingType;
        } else if (field === "itemListElement") {
          thing[field] = [];
        } else if (["String", "Time", "URL"].includes(def.type)) {
          thing[field] = "";
        } else if (["DateTime"].includes(def.type)) {
          thing[field] = new Date(0).toISOString();
        } else if (["Time"].includes(def.type)) {
          thing[field] = new Date(0).toISOString().slice(11);
        } else if (["Date"].includes(def.type)) {
          thing[field] = new Date(0).toISOString().slice(0, 10);
        } else if (
          [
            "Boolean",
            "Distance",
            "Duration",
            "Integer",
            "Number",
            "Quantity",
            "Time",
          ].includes(def.type)
        ) {
          thing[field] = 0;
        } else if (
          [
            "minPrice",
            "maxPrice",
            "minValue",
            "maxValue",
            "price",
            "value",
          ].includes(field)
        ) {
          thing[field] = 0.0;
        } else {
          thing[field] = "";
        }
      }
    });
    return thing;
  }

  /** @credit https://gist.github.com/farskid/b1c128639cd42e44734282e2d9e3beb2 */
  sortObjKeysAlphabetically(obj) {
    return Object.keys(obj)
      .sort(new Intl.Collator("en", { caseFirst: "lower" }).compare)
      .reduce((result, key) => {
        result[key] = obj[key];
        return result;
      }, {});
  }
  say(msg) {
    console.log(msg);
  }
  // writeOut(thingType, Thing, opts) {
  //   let thinglet = this.thinglet(Thing, thingType)

  //   if (!opts.write) {
  //     if (opts.thinglet) {
  //       this.say(JSON.stringify(thinglet, null, "  "))
  //     }
  //     if (opts.schema) {
  //       this.say(JSON.stringify(Thing, null, "  "))
  //     }
  //     if (opts.list) {
  //       this.say([thingType, ...this._listSubs(thingType)].join("\n"))
  //     }
  //   } else {
  //     this.say(`- ${thingType}:`)
  //     let hierarchy = this._parentClassesOf([thingType])
  //     hierarchy.pop()
  //     let thingPath = path.join(opts.write)
  //     sh.mkdir("-p", thingPath)
  //     if (opts.thinglet) {
  //       let writePath = path.join(thingPath, `${opts.thingletName}.json`)
  //       fs.writeFileSync(writePath, JSON.stringify(thinglet, null, "  "))
  //       this.say("       thinglet ✔ ")
  //       this.say(`           ${writePath}`)
  //     }
  //     if (opts.schema) {
  //       let thingSchemaPath = path.join(opts.write, ...hierarchy)
  //       let writePath = path.join(thingSchemaPath, `${thingType}.json`)
  //       sh.mkdir("-p", thingSchemaPath)
  //       fs.writeFileSync(writePath, JSON.stringify(Thing, null, "  "))
  //       this.say("       schemed ✔ ")
  //       this.say(`           ${writePath}`)
  //     }
  //     if (opts.list) {
  //       let writePath = path.join(thingPath, `${thingType}sList.json`)
  //       fs.writeFileSync(
  //         writePath,
  //         JSON.stringify([thingType, ...this._listSubs(thingType)], null, "  "),
  //       )
  //       this.say("       found ✔ ")
  //       this.say(`           ${writePath}`)
  //     }
  //   }
  // }
  _listSubs(schemaName) {
    return this.graphList
      .filter(
        (a) =>
          a["@type"] === "rdfs:Class" &&
          a["rdfs:comment"].slice(0, 10) !== "Data type:" &&
          [...this._setOf(a, "rdfs:subClassOf")].includes(schemaName),
      )
      .map((a) =>
        typeof a["rdfs:label"] === "object"
          ? a["rdfs:label"]["@value"]
          : a["rdfs:label"],
      )
      .sort();
  }
}

export default ThingBuilder;
