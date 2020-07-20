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
   * @param {Array} graphList of schema objects from jsonld.
   */
  constructor(graphList, domain) {
    this.domain = domain
    this.MODELS = new Map()
    this.FIELDS = new Map()
    this.PRIMTS = new Map()
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
      let schemaType = schemaObj["@type"]
      let schemaName = schemaObj["rdfs:label"]
      let schemaComment = schemaObj["rdfs:comment"]
      // Handle Primitives
      if (schemaType.includes(`${this.domain}DataType`)) {
        this.PRIMTS.set(schemaName, {
          name: schemaName,
          help: schemaComment,
        })
      }
      // Handle a Type/Class/Model
      else if (schemaType === "rdfs:Class") {
        this._setModel(schemaName, {
          help: schemaComment,
          subs: this._setOf(schemaObj, "rdfs:subClassOf"),
        })
      }
      // Handle a Property/Field
      else if (schemaType === "rdf:Property") {
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
        let enumeratorOf = schemaType.replace(this.domain, "")
        this._setModel(enumeratorOf, { enum: schemaName })
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
    // Just check to see if this is a primitive.
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
    // Other handle as normal type.
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
    log(`DEPTH: ${currentDepth}`)
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
        // Check the ModelType(s) of its fields.
        log(`$currentDepth modelDef.fields: ${[...modelDef.fields]}`)
        for (let fieldName of modelDef.fields) {
          let fieldDef = this.FIELDS.get(fieldName)
          // Put them in order: selectedModels, candidateModels then primitives.
          // We're adding candidateModels here because there's a chance we might
          // use them,
          let selectFromModels = _.union(candidateModels, PRIMITIVES)
          // Select the most appropriate type for this fieldDef.
          log(
            `${currentDepth} fieldDef.types ${[...fieldDef.types]}`
          )
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
            log(
              `${currentDepth} fieldsModelTypes: ${fieldsModelTypes}`
            )
            deeperModels = _.union(deeperModels, fieldsModelTypes)
          }
        } // end for each field of modelDef
      } // end if modelDef
    }
    let modelResults = _.union(selectedModels, modelsMined)
    // Only go deeper if there are unmined ModelTypes.
    deeperModels = _.difference(deeperModels, modelResults)
    // Allow to go deeper?
    if (currentDepth < depth && deeperModels) {
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
