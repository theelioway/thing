module.exports = {
  "@graph": [
    { "@type": "rdfs:Class", "rdfs:label": "Cosmos" },
    {
      "@type": "rdf:Property",
      "rdfs:label": "name",
      "d:/domainIncludes": [
        { "@id": "d:/Belt" },
        { "@id": "d:/GPS" },
        { "@id": "d:/Cosmos" },
      ],
      "d:/rangeIncludes": { "@id": "d:/Text" },
    },
    {
      "@type": "rdf:Property",
      "rdfs:label": "isInteresting",
      "d:/domainIncludes": { "@id": "d:/Cosmos" },
      "d:/rangeIncludes": { "@id": "d:/Interestingness" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "Universe",
      "rdfs:subClassOf": { "@id": "d:/Cosmos" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "Galaxy",
      "rdfs:subClassOf": { "@id": "d:/Cosmos" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "SolarSystem",
      "rdfs:subClassOf": { "@id": "d:/Cosmos" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "Sun",
      "rdfs:subClassOf": { "@id": "d:/Cosmos" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "Planet",
      "rdfs:subClassOf": { "@id": "d:/Cosmos" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "Moon",
      "rdfs:subClassOf": { "@id": "d:/Planet" },
    },
    { "@type": "rdfs:Class", "rdfs:label": "Belt" },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "Asteroid",
      "rdfs:subClassOf": [{ "@id": "d:/Moon" }, { "@id": "d:/Sun" }],
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "Satellite",
      "rdfs:subClassOf": { "@id": "d:/Cosmos" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "GPS",
      "rdfs:subClassOf": { "@id": "d:/Satellite" },
    },
    {
      "@type": "rdf:Property",
      "rdfs:label": "satelliteName",
      "d:/domainIncludes": [{ "@id": "d:/Satellite" }, { "@id": "d:/GPS" }],
      "d:/rangeIncludes": { "@id": "d:/Text" },
    },
    {
      "@type": "rdf:Property",
      "rdfs:label": "milkiness",
      "d:/domainIncludes": { "@id": "d:/Galaxy" },
      "d:/rangeIncludes": [{ "@id": "d:/Universe" }, { "@id": "d:/DateTime" }],
    },
    {
      "@type": "rdf:Property",
      "rdfs:label": "qualifications",
      "d:/domainIncludes": { "@id": "d:/SolarSystem" },
      "d:/rangeIncludes": { "@id": "d:/Galaxy" },
    },
    {
      "@type": "rdf:Property",
      "rdfs:label": "naics",
      "d:/domainIncludes": { "@id": "d:/Sun" },
      "d:/rangeIncludes": [
        { "@id": "d:/SolarSystem" },
        { "@id": "d:/Boolean" },
      ],
    },
    {
      "@type": "rdf:Property",
      "rdfs:label": "email",
      "d:/domainIncludes": { "@id": "d:/Planet" },
      "d:/rangeIncludes": [{ "@id": "d:/URL" }, { "@id": "d:/Date" }],
    },
    {
      "@type": "rdf:Property",
      "rdfs:label": "sunny",
      "d:/domainIncludes": { "@id": "d:/Planet" },
      "d:/rangeIncludes": [{ "@id": "d:/Sun" }, { "@id": "d:/Text" }],
    },
    {
      "@type": "rdf:Property",
      "rdfs:label": "moonShine",
      "d:/domainIncludes": { "@id": "d:/Moon" },
      "d:/rangeIncludes": [
        { "@id": "d:/Text" },
        { "@id": "d:/Number" },
        { "@id": "d:/Float" },
      ],
    },
    {
      "@type": "rdf:Property",
      "rdfs:label": "image",
      "d:/domainIncludes": { "@id": "d:/Belt" },
      "d:/rangeIncludes": { "@id": "d:/ImageObject" },
    },
    {
      "@type": "rdf:Property",
      "rdfs:label": "belt",
      "d:/domainIncludes": { "@id": "d:/Asteroid" },
      "d:/rangeIncludes": { "@id": "d:/Belt" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "Gravitation",
      "rdfs:subClassOf": { "@id": "d:/Cosmos" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "Interestingness",
      "rdfs:subClassOf": { "@id": "d:/Gravitation" },
    },
    { "@type": "d:/Interestingness", "rdfs:label": "Boring" },
    { "@type": "d:/Interestingness", "rdfs:label": "Whatever" },
    { "@type": "d:/Interestingness", "rdfs:label": "Fascinating" },
    { "@type": ["rdfs:Class", "d:/DataType"], "rdfs:label": "Boolean" },
    { "@type": ["rdfs:Class", "d:/DataType"], "rdfs:label": "Date" },
    { "@type": ["rdfs:Class", "d:/DataType"], "rdfs:label": "DateTime" },
    { "@type": ["rdfs:Class", "d:/DataType"], "rdfs:label": "Number" },
    { "@type": ["rdfs:Class", "d:/DataType"], "rdfs:label": "Text" },
    { "@type": ["rdfs:Class", "d:/DataType"], "rdfs:label": "Time" },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "Float",
      "rdfs:subClassOf": { "@id": "d:/Number" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "Integer",
      "rdfs:subClassOf": { "@id": "d:/Number" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "URL",
      "rdfs:subClassOf": { "@id": "d:/Text" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "Quantity",
      "rdfs:subClassOf": { "@id": "d:/Number" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "Duration",
      "rdfs:subClassOf": { "@id": "d:/Quantity" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "ImageObject",
      "http://www.w3.org/2002/07/owl#equivalentClass": {
        "@id": "http://purl.org/dc/dcmitype/Image",
      },
      "rdfs:subClassOf": { "@id": "d:/MeteorObject" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "MeteorObject",
      "rdfs:subClassOf": { "@id": "d:/CreativeForce" },
    },
    {
      "@type": "rdfs:Class",
      "rdfs:label": "CreativeForce",
      "http://purl.org/dc/terms/source": {
        "@id":
          "http://www.w3.org/wiki/WebSchemas/SchemaDotOrgSources#source_rNews",
      },
      "rdfs:subClassOf": { "@id": "d:/Cosmos" },
    },
  ],
}