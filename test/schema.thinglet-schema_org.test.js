"use strict"
const should = require("chai").should()
const fs = require("fs")

const ThingBuilder = require("../thing-builder")
const { schemaDomainUrl } = require("../utils/get-schema")

let debug = false

before(() => {
  this.thingBuilder = new ThingBuilder(
    "schemaorg/data/releases/9.0/schemaorg-all-http",
    schemaDomainUrl
  )
  if (debug) this.jay = {}
})

after(() => {
  if (debug && this.jay) {
    fs.writeFileSync(`./expected.json`, JSON.stringify(this.jay))
  }
})

describe(`class | ThingBuilder | thinglet schemaorg 9.0`, () => {
  for (let [modelName, expectThinglet] of Object.entries({
    Thing: {
      potentialAction: "",
      identifier: "",
      sameAs: "",
      url: "",
      image: "",
      alternateName: "",
      name: "",
      description: "",
      mainEntityOfPage: "Thing",
      disambiguatingDescription: "",
      subjectOf: "",
      additionalType: "",
      ItemList: {
        itemListElement: [],
        itemListOrder: "",
        numberOfItems: 0,
      },
    },
    HealthAndBeautyBusiness: {
      potentialAction: "",
      identifier: "",
      sameAs: "",
      url: "",
      image: "",
      alternateName: "",
      name: "",
      description: "",
      mainEntityOfPage: "HealthAndBeautyBusiness",
      disambiguatingDescription: "",
      subjectOf: "",
      additionalType: "",
      Place: {
        maximumAttendeeCapacity: 0,
        geoCrosses: "",
        aggregateRating: "",
        reviews: "",
        photos: "",
        map: "",
        geoCoveredBy: "",
        branchCode: "",
        hasMap: "",
        longitude: "",
        additionalProperty: "",
        containedIn: "",
        geoWithin: "",
        hasDriveThroughService: 0,
        geoContains: "",
        latitude: "",
        openingHoursSpecification: "",
        faxNumber: "",
        geoIntersects: "",
        geoOverlaps: "",
        smokingAllowed: 0,
        globalLocationNumber: "",
        review: "",
        event: "",
        containsPlace: "",
        geoTouches: "",
        geoDisjoint: "",
        isicV4: "",
        slogan: "",
        containedInPlace: "",
        photo: "",
        events: "",
        isAccessibleForFree: 0,
        publicAccess: 0,
        maps: "",
        address: "",
        tourBookingPage: "",
        specialOpeningHoursSpecification: "",
        logo: "",
        amenityFeature: "",
        telephone: "",
        geo: "",
        geoCovers: "",
        geoEquals: "",
      },
      Organization: {
        members: "",
        knowsAbout: "",
        correctionsPolicy: "",
        aggregateRating: "",
        hasProductReturnPolicy: "",
        diversityPolicy: "",
        duns: "",
        taxID: "",
        reviews: "",
        award: "",
        makesOffer: "",
        contactPoints: "",
        awards: "",
        foundingDate: "1970-01-01",
        ownershipFundingInfo: "",
        founders: "",
        seeks: "",
        member: "",
        serviceArea: "",
        funder: "",
        actionableFeedbackPolicy: "",
        areaServed: "",
        unnamedSourcesPolicy: "",
        faxNumber: "",
        subOrganization: "",
        hasOfferCatalog: "",
        globalLocationNumber: "",
        foundingLocation: "",
        review: "",
        owns: "",
        sponsor: "",
        event: "",
        founder: "",
        publishingPrinciples: "",
        isicV4: "",
        slogan: "",
        location: "",
        brand: "",
        memberOf: "",
        vatID: "",
        hasCredential: "",
        knowsLanguage: "",
        events: "",
        diversityStaffingReport: "",
        nonprofitStatus: "",
        address: "",
        alumni: "",
        dissolutionDate: "1970-01-01",
        interactionStatistic: "",
        logo: "",
        employees: "",
        telephone: "",
        hasMerchantReturnPolicy: "",
        email: "",
        department: "",
        contactPoint: "",
        parentOrganization: "",
        ethicsPolicy: "",
        legalName: "",
        leiCode: "",
        employee: "",
        numberOfEmployees: "",
        naics: "",
        hasPOS: "",
      },
      LocalBusiness: {
        priceRange: "",
        openingHours: "",
        currenciesAccepted: "",
        branchOf: "",
        paymentAccepted: "",
      },
      HealthAndBeautyBusiness: {},
      ItemList: {
        itemListElement: [],
        itemListOrder: "",
        numberOfItems: 0,
      },
    },
    ComicIssue: {
      potentialAction: "",
      identifier: "",
      sameAs: "",
      url: "",
      image: "",
      alternateName: "",
      name: "",
      description: "",
      mainEntityOfPage: "ComicIssue",
      disambiguatingDescription: "",
      subjectOf: "",
      additionalType: "",
      CreativeWork: {
        typicalAgeRange: "",
        hasPart: "",
        sdDatePublished: "1970-01-01",
        educationalLevel: "",
        releasedEvent: "",
        schemaVersion: "",
        contentLocation: "",
        locationCreated: "",
        aggregateRating: "",
        temporalCoverage: "",
        accessModeSufficient: "",
        accountablePerson: "",
        mainEntity: "",
        sdPublisher: "",
        spatialCoverage: "",
        reviews: "",
        exampleOfWork: "",
        maintainer: "",
        editor: "",
        offers: "",
        discussionUrl: "",
        award: "",
        sdLicense: "",
        copyrightHolder: "",
        accessibilityHazard: "",
        copyrightYear: 0,
        awards: "",
        publisherImprint: "",
        commentCount: 0,
        spatial: "",
        recordedAt: "",
        abstract: "",
        fileFormat: "",
        isPartOf: "",
        temporal: "",
        accessibilitySummary: "",
        inLanguage: "",
        educationalAlignment: "",
        associatedMedia: "",
        funder: "",
        position: "",
        audio: "",
        workExample: "",
        encoding: "",
        interactivityType: "",
        provider: "",
        character: "",
        sourceOrganization: "",
        audience: "",
        materialExtent: "",
        video: "",
        accessibilityFeature: "",
        publisher: "",
        text: "",
        publication: "",
        contributor: "",
        encodingFormat: "",
        review: "",
        accessibilityControl: "",
        license: "",
        sponsor: "",
        encodings: "",
        about: "",
        isBasedOn: "",
        creator: "",
        publishingPrinciples: "",
        producer: "",
        correction: "",
        workTranslation: "",
        mentions: "",
        contentReferenceTime: "1970-01-01T00:00:00.000Z",
        dateCreated: "1970-01-01",
        educationalUse: "",
        teaches: "",
        alternativeHeadline: "",
        datePublished: "1970-01-01",
        isAccessibleForFree: 0,
        headline: "",
        translationOfWork: "",
        acquireLicensePage: "",
        conditionsOfAccess: "",
        citation: "",
        accessibilityAPI: "",
        interactionStatistic: "",
        contentRating: "",
        accessMode: "",
        material: "",
        isFamilyFriendly: 0,
        assesses: "",
        keywords: "",
        version: "",
        dateModified: "1970-01-01",
        learningResourceType: "",
        genre: "",
        creativeWorkStatus: "",
        pattern: "",
        editEIDR: "",
        author: "",
        size: "",
        translator: "",
        timeRequired: "",
        usageInfo: "",
        isBasedOnUrl: "",
        thumbnailUrl: "",
        expires: "1970-01-01",
        comment: "",
      },
      PublicationIssue: {
        issueNumber: "",
        pageEnd: "",
        pageStart: "",
        pagination: "",
      },
      ComicIssue: {
        artist: "",
        variantCover: "",
        inker: "",
        colorist: "",
        letterer: "",
        penciler: "",
      },
      ItemList: {
        itemListElement: [],
        itemListOrder: "",
        numberOfItems: 0,
      },
    },
  })) {
    it(`${modelName} thing`, () => {
      let opts = { depth: 0, comments: false }
      let Thing = this.thingBuilder.Thing([modelName], opts)
      let thinglet = this.thingBuilder.thinglet(Thing[modelName], modelName)
      thinglet.should.be.eql(expectThinglet)
    })
  }
})
