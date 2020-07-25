const _ = require("lodash")
const logger = require("./utils/logger")

const log = logger.debug

module.exports = class Crispr {
  /**
   * @file
   * @author Tim Bushell
   *
   * @tutorial Doing this makes it easier to build the "DNA" of Models.
   *
   * @param {Array} graphList of schema objects from jsonld.
   * @param {str} domain used in jsonld.
   * @param {Array} fixedPrimitives names we'll always treat as Primitive datatypes.
   *        For instance, depending on the database, you might choose to make
   *        "ImageObject" a Primitive if your database supports it.
   */
  constructor(graphList, domain, fixedPrimitives) {
    this.domain = domain
    this.MODELS = new Map()
    this.FIELDS = new Map()
    this.PRIMTS = new Map()
    if (Array.isArray(fixedPrimitives) && fixedPrimitives.length) {
      for (let primitiveName of fixedPrimitives) {
        this.PRIMTS.set(primitiveName, {
          name: primitiveName,
          help: "Fixed as Primitive in constructor.",
        })
      }
    }
    this.crispify(graphList)
  }

  /**
   * @file Builds models/fields/primts
   * @author Tim Bushell
   *
   * @tutorial Doing this makes it easier to build the "DNA" of Models.
   *
   * @param {Array} graphList of schema objects from jsonld.
   */
  async crispify(graphList) {
    this.MODELS = new Map()
    this.FIELDS = new Map()
    for (let schemaObj of graphList) {
      let schemaName = this._labelOf(schemaObj["rdfs:label"])
      let schemaType = this._typeOf(schemaObj["@type"])
      let schemaComment = schemaObj["rdfs:comment"]
      // Handle Primitives
      if (schemaType === "Primitive") {
        this.PRIMTS.set(schemaName, {
          name: schemaName,
          help: schemaComment,
        })
      }
      // Handle a Type/Class/Model
      else if (schemaType === "Class") {
        this._setModel(schemaName, {
          help: schemaComment,
          subs: this._setOf(schemaObj, "rdfs:subClassOf"),
        })
      }
      // Handle a Property/Field
      else if (schemaType === "Property") {
        let typeOf = this._setOf(schemaObj, `${this.domain}rangeIncludes`)
        let fieldOf = this._setOf(schemaObj, `${this.domain}domainIncludes`)
        this.FIELDS.set(schemaName, {
          name: schemaName,
          help: schemaComment,
          types: typeOf,
          models: fieldOf,
        })
        // Add this property to any related Domain/Type/Class/Model
        for (let classType of fieldOf) {
          this._setModel(classType, { field: schemaName })
        }
      }
      // Handle a Enumerated Type Value
      else {
        for (let typeOf of schemaType) {
          let enumeratorOf = typeOf.replace(this.domain, "")
          this._setModel(enumeratorOf, { enum: schemaName })
        }
      }
    }
  }

  /**
   * @file Utility function to progressively build up the map of a model.
   * @author Tim Bushell
   *
   * @param {str} name of the Model/Type/Class.
   * @param {Object} opts with values to create/update the Model/Type/Class.
   */
  _setModel(name, opts) {
    // Check to see if subClasses a primitive.
    let primts = [...this.PRIMTS.keys()]
    if (
      opts.subs &&
      [...opts.subs].filter(sub => primts.includes(sub)).length
    ) {
      let p = this.PRIMTS.get(name) || {
        name: name,
        help: opts.help,
      }
      this.PRIMTS.set(name, p)
      return
    }
    // Otherwise handle as normal type.
    let t = this.MODELS.get(name) || {
      name: name,
      fields: new Set(),
      enums: new Set(),
    }
    t.help = opts.help ? opts.help : t.help
    t.subs = opts.subs ? opts.subs : t.subs
    t.fields = opts.field ? new Set([...t.fields]).add(opts.field) : t.fields
    t.enums = opts.enum ? new Set([...t.enums]).add(opts.enum) : t.enums
    this.MODELS.set(name, t)
  }

  /**
   * @file Utility function to treat schema properties consistently.
   * @author Tim Bushell
   *
   * @tutorial Some schema property are single objs, some are lists. We'll
   * just convert the singles to an array of one item so that the rest of the
   * the code doesn't have to worry about it!
   *
   * @param {str} name of the Model/Type/Class.
   * @param {Object} opts with values to create/update the Model/Type/Class.
   * @returns {Array} whether it was originally an Array or not.
   */
  _listAnyway(obj) {
    return Array.isArray(obj) ? obj : [obj]
  }

  /** @file Resolve variations in the "@type" property of a Schema.org jsonld object.
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
   * @returns {str/Array} String or Array representing the type of Schema.org jsonld object.
   */
  _typeOf(value) {
    if (value === "rdfs:Class") {
      return "Class"
    } else if (value === "rdf:Property") {
      return "Property"
    } else if (
      Array.isArray(value) &&
      value.includes(`${this.domain}DataType`)
    ) {
      return "Primitive"
    } else if (Array.isArray(value) || value.includes(this.domain)) {
      // List anyway philosophy (if some are a list - force a list).
      return this._listAnyway(value)
    } else {
      throw `Unknown @type: ${value}.`
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
      return value
    } else if (typeof value === "object") {
      return value["@value"]
    } else {
      throw `Unknown rdfs:label: ${value}.`
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
      return new Set()
    }
    return new Set(
      this._listAnyway(obj[key]).map(d => d["@id"].replace(this.domain, ""))
    )
  }

  /**
   * @file Utility to show all the types which subclass the given types.
   * @author Tim Bushell
   *
   * @param {graphList} obj is the schema
   * @param {Array} types you want to see which classes are subclass of.
   * @returns {Set} of types which subclass any of those types.
   */
  subClassesOf(graphList, types) {
    for (let schemaObj of graphList["@graph"]) {
      let subClasses = new Map()
      for (let schemaObj of graphList) {
        if (schemaObj["@type"] === "rdfs:Class") {
          let schemaObjLabel = labelOf(schemaObj["rdfs:label"])
          for (let sub of listAnyway(schemaObj["rdfs:subClassOf"])) {
            if (sub) {
              let subName = sub["@id"].replace("http://schema.org/", "")
              if (types.includes(subName)) {
                let subs = rtn.get(schemaObjLabel)
                if (!subs) subs = new Set()
                subs.add(subName)
                subClasses.set(schemaObjLabel, subs)
              }
            }
          }
        }
      }
      return rtn
    }
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
      if (fieldTypes.has(type)) return type
    }
  }

  /** @file Subclass miner
   * @author Tim Bushell */
  _parentClassesOf(knownSubs) {
    let newSubs = new Array()
    for (let parent of knownSubs) {
      let parentClass = this.MODELS.get(parent)
      let unKnownSubs = _.difference([...parentClass.subs], knownSubs)
      newSubs = _.union(newSubs, unKnownSubs)
    }
    if (newSubs.length) {
      knownSubs = _.union(this._parentClassesOf(newSubs), knownSubs)
    }
    return knownSubs
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
   * Fields belongiing to the wanted Models can be also be Models, i.e. Foreign
   * Keys. Models need to be created to cover those cases. Often Fields have
   * more than 1 Type.
   *
   * We will take the approach that if a Field has a PrimitiveType, we will use
   * that UNLESS it also has a ModelType that is already included in the
   * original list of Models wanted. If the Field has no PrimitiveType, we will
   * use the ModelType if the depth allows. If the depth is 0, we will use Text
   * as the Default Primitive Type. But if the depth is higher we will use the
   * ModelType.
   *
   * WORSE CASE: Some ModelTypes have Fields which are also Types. This is where
   * the the depth arg is most important ensuring we start substituting
   * ModelTypes with a PrimitiveType once the depth has been reached.
   *
   * @param {Array} selectedModels in the target elioWay application.
   * @param {integer} depth we need to go to resolve Model dependancies.
   * @param {Array} {opt} candidateModels more models to search.
   * @param {integer} {opt} currentDepth we need to go to resolve Model dependancies.
   * @returns {Array} of Models.
   */
  modelMiner(selectedModels, depth, candidateModels, currentDepth) {
    // Defaults for recursive parameters.
    if (!currentDepth) currentDepth = 0
    // At each depth, search with the current models and the candidates.
    candidateModels = _.union(selectedModels, candidateModels)

    let PRIMITIVES = [...this.PRIMTS.keys()]
    log(`PRIMITIVES: ${PRIMITIVES}`)
    log(`DEPTH: ${depth}`)
    log(`CURRENTDEPTH: ${currentDepth}`)
    log(`${currentDepth} selectedModels: ${selectedModels}`)
    log(`${currentDepth} candidateModels: ${candidateModels}`)
    // Models mined at this depth.
    let modelsMined = new Array()
    // Models to check for the next depth.
    let deeperModels = new Array()
    // The set of models we want to search against.
    for (let modelName of candidateModels) {
      let modelDef = this.MODELS.get(modelName)
      // Null if Primitive type. Ignore.
      if (modelDef) {
        modelsMined = _.union(
          modelsMined,
          this._parentClassesOf([...modelDef.subs])
        )
        log(`${currentDepth} SubsMined: ${modelsMined}`)
        // Check the ModelType(s) of its fields.
        log(`${currentDepth} modelDef.fields: ${[...modelDef.fields]}`)
        for (let fieldName of modelDef.fields) {
          let fieldDef = this.FIELDS.get(fieldName)
          // Put them in order: selectedModels, candidateModels then primitives.
          // We're adding candidateModels here because there's a chance we might
          // use them,
          let selectFromModels = _.union(candidateModels, PRIMITIVES)
          // Select the most appropriate type for this fieldDef.
          log(`${currentDepth} fieldDef.types ${[...fieldDef.types]}`)
          let chosenFieldType = this._bestFieldType(
            fieldDef.types,
            selectFromModels
          )
          log(`${currentDepth} chosenFieldType: ${chosenFieldType}`)
          // See whether this is a ModelType, or a simple Primitive.
          if (this.MODELS.get(chosenFieldType)) {
            // If ModelType, add to the Set of models we will need.
            modelsMined.push(chosenFieldType)
          } else {
            // Build a list of future Models to check.
            let fieldsModelTypes = _.difference([...fieldDef.types], PRIMITIVES)
            log(`${currentDepth} fieldsModelTypes: ${fieldsModelTypes}`)
            deeperModels = _.union(deeperModels, fieldsModelTypes)
          }
        } // end for each field of modelDef
      } // end if modelDef
    }
    let modelResults = _.union(
      selectedModels,
      _.difference(modelsMined, PRIMITIVES)
    )
    log("------")
    // Only go deeper if there are unmined ModelTypes.
    deeperModels = _.union(
      _.difference(deeperModels, modelResults),
      _.difference(modelResults, deeperModels)
    )
    log(`${currentDepth} modelResults: ${modelResults}`)
    log(`${currentDepth} deeperModels: ${deeperModels}`)
    log(`==================== end depth ${currentDepth}`)
    // Allow to go deeper?
    if (currentDepth < depth && deeperModels && deeperModels.length) {
      return this.modelMiner(
        modelResults,
        depth,
        deeperModels,
        (currentDepth += 1)
      )
    } else {
      // Return as Array
      return modelResults
    }
  }
}
