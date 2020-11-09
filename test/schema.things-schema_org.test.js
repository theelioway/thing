"use strict"
const should = require("chai").should()
const fs = require("fs")

const ThingBuilder = require("../thing-builder")
const { schemaDomainUrl } = require("../utils/get-schema")

let debug = true

before(() => {
  this.thingBuilder = new ThingBuilder(
    "data/releases/9.0/schemaorg-all-http",
    schemaDomainUrl
  )
  if (debug) this.jay = {}
})

after(() => {
  if (debug) fs.writeFileSync(`./expected.json`, JSON.stringify(this.jay))
})

let expectThings = {
  HealthAndBeautyBusiness: {
    potentialAction: {
      type: "Text",
    },
    identifier: {
      type: "Text",
    },
    sameAs: {
      type: "URL",
    },
    url: {
      type: "URL",
    },
    image: {
      type: "URL",
    },
    alternateName: {
      type: "Text",
    },
    name: {
      type: "Text",
    },
    description: {
      type: "Text",
    },
    mainEntityOfPage: {
      type: "URL",
    },
    disambiguatingDescription: {
      type: "Text",
    },
    subjectOf: {
      type: "Text",
    },
    additionalType: {
      type: "URL",
    },
    engage: {
      Place: {
        maximumAttendeeCapacity: {
          type: "Text",
        },
        geoCrosses: {
          type: "Place",
          foreign: true,
        },
        aggregateRating: {
          type: "Text",
        },
        reviews: {
          type: "Text",
        },
        photos: {
          type: "Text",
        },
        map: {
          type: "URL",
        },
        geoCoveredBy: {
          type: "Place",
          foreign: true,
        },
        branchCode: {
          type: "Text",
        },
        hasMap: {
          type: "URL",
        },
        longitude: {
          type: "Text",
        },
        additionalProperty: {
          type: "Text",
        },
        containedIn: {
          type: "Place",
          foreign: true,
        },
        geoWithin: {
          type: "Place",
          foreign: true,
        },
        hasDriveThroughService: {
          type: "Boolean",
        },
        geoContains: {
          type: "Place",
          foreign: true,
        },
        latitude: {
          type: "Text",
        },
        openingHoursSpecification: {
          type: "Text",
        },
        faxNumber: {
          type: "Text",
        },
        geoIntersects: {
          type: "Place",
          foreign: true,
        },
        geoOverlaps: {
          type: "Place",
          foreign: true,
        },
        smokingAllowed: {
          type: "Boolean",
        },
        globalLocationNumber: {
          type: "Text",
        },
        review: {
          type: "Text",
        },
        event: {
          type: "Text",
        },
        containsPlace: {
          type: "Place",
          foreign: true,
        },
        geoTouches: {
          type: "Place",
          foreign: true,
        },
        geoDisjoint: {
          type: "Place",
          foreign: true,
        },
        isicV4: {
          type: "Text",
        },
        slogan: {
          type: "Text",
        },
        containedInPlace: {
          type: "Place",
          foreign: true,
        },
        photo: {
          type: "Text",
        },
        events: {
          type: "Text",
        },
        isAccessibleForFree: {
          type: "Boolean",
        },
        publicAccess: {
          type: "Boolean",
        },
        maps: {
          type: "URL",
        },
        address: {
          type: "Text",
        },
        tourBookingPage: {
          type: "URL",
        },
        specialOpeningHoursSpecification: {
          type: "Text",
        },
        logo: {
          type: "URL",
        },
        amenityFeature: {
          type: "Text",
        },
        telephone: {
          type: "Text",
        },
        geo: {
          type: "Text",
        },
        geoCovers: {
          type: "Place",
          foreign: true,
        },
        geoEquals: {
          type: "Place",
          foreign: true,
        },
      },
      Organization: {
        members: {
          type: "Organization",
          foreign: true,
        },
        knowsAbout: {
          type: "Thing",
          foreign: true,
        },
        correctionsPolicy: {
          type: "URL",
        },
        aggregateRating: {
          type: "Text",
        },
        hasProductReturnPolicy: {
          type: "Text",
        },
        diversityPolicy: {
          type: "URL",
        },
        duns: {
          type: "Text",
        },
        taxID: {
          type: "Text",
        },
        reviews: {
          type: "Text",
        },
        award: {
          type: "Text",
        },
        makesOffer: {
          type: "Text",
        },
        contactPoints: {
          type: "Text",
        },
        awards: {
          type: "Text",
        },
        foundingDate: {
          type: "Date",
        },
        ownershipFundingInfo: {
          type: "Text",
        },
        founders: {
          type: "Text",
        },
        seeks: {
          type: "Text",
        },
        member: {
          type: "Organization",
          foreign: true,
        },
        serviceArea: {
          type: "Place",
          foreign: true,
        },
        funder: {
          type: "Organization",
          foreign: true,
        },
        actionableFeedbackPolicy: {
          type: "URL",
        },
        areaServed: {
          type: "Place",
          foreign: true,
        },
        unnamedSourcesPolicy: {
          type: "URL",
        },
        faxNumber: {
          type: "Text",
        },
        subOrganization: {
          type: "Organization",
          foreign: true,
        },
        hasOfferCatalog: {
          type: "Text",
        },
        globalLocationNumber: {
          type: "Text",
        },
        foundingLocation: {
          type: "Place",
          foreign: true,
        },
        review: {
          type: "Text",
        },
        owns: {
          type: "Text",
        },
        sponsor: {
          type: "Organization",
          foreign: true,
        },
        event: {
          type: "Text",
        },
        founder: {
          type: "Text",
        },
        publishingPrinciples: {
          type: "URL",
        },
        isicV4: {
          type: "Text",
        },
        slogan: {
          type: "Text",
        },
        location: {
          type: "Place",
          foreign: true,
        },
        brand: {
          type: "Organization",
          foreign: true,
        },
        memberOf: {
          type: "Organization",
          foreign: true,
        },
        vatID: {
          type: "Text",
        },
        hasCredential: {
          type: "Text",
        },
        knowsLanguage: {
          type: "Text",
        },
        events: {
          type: "Text",
        },
        diversityStaffingReport: {
          type: "URL",
        },
        nonprofitStatus: {
          type: "Text",
        },
        address: {
          type: "Text",
        },
        alumni: {
          type: "Text",
        },
        dissolutionDate: {
          type: "Date",
        },
        interactionStatistic: {
          type: "Text",
        },
        logo: {
          type: "URL",
        },
        employees: {
          type: "Text",
        },
        telephone: {
          type: "Text",
        },
        hasMerchantReturnPolicy: {
          type: "Text",
        },
        email: {
          type: "Text",
        },
        department: {
          type: "Organization",
          foreign: true,
        },
        contactPoint: {
          type: "Text",
        },
        parentOrganization: {
          type: "Organization",
          foreign: true,
        },
        ethicsPolicy: {
          type: "URL",
        },
        legalName: {
          type: "Text",
        },
        leiCode: {
          type: "Text",
        },
        employee: {
          type: "Text",
        },
        numberOfEmployees: {
          type: "Text",
        },
        naics: {
          type: "Text",
        },
        hasPOS: {
          type: "Place",
          foreign: true,
        },
      },
      LocalBusiness: {
        priceRange: {
          type: "Text",
        },
        openingHours: {
          type: "Text",
        },
        currenciesAccepted: {
          type: "Text",
        },
        branchOf: {
          type: "Organization",
          foreign: true,
        },
        paymentAccepted: {
          type: "Text",
        },
      },
      HealthAndBeautyBusiness: {},
    },
  },
  Thing: {
    potentialAction: {
      type: "Text",
    },
    identifier: {
      type: "Text",
    },
    sameAs: {
      type: "URL",
    },
    url: {
      type: "URL",
    },
    image: {
      type: "URL",
    },
    alternateName: {
      type: "Text",
    },
    name: {
      type: "Text",
    },
    description: {
      type: "Text",
    },
    mainEntityOfPage: {
      type: "URL",
    },
    disambiguatingDescription: {
      type: "Text",
    },
    subjectOf: {
      type: "Text",
    },
    additionalType: {
      type: "URL",
    },
  },
  Place: {
    potentialAction: {
      type: "Text",
    },
    identifier: {
      type: "Text",
    },
    sameAs: {
      type: "URL",
    },
    url: {
      type: "URL",
    },
    image: {
      type: "URL",
    },
    alternateName: {
      type: "Text",
    },
    name: {
      type: "Text",
    },
    description: {
      type: "Text",
    },
    mainEntityOfPage: {
      type: "URL",
    },
    disambiguatingDescription: {
      type: "Text",
    },
    subjectOf: {
      type: "Text",
    },
    additionalType: {
      type: "URL",
    },
    engage: {
      Place: {
        maximumAttendeeCapacity: {
          type: "Text",
        },
        geoCrosses: {
          type: "Place",
          foreign: true,
        },
        aggregateRating: {
          type: "Text",
        },
        reviews: {
          type: "Text",
        },
        photos: {
          type: "Text",
        },
        map: {
          type: "URL",
        },
        geoCoveredBy: {
          type: "Place",
          foreign: true,
        },
        branchCode: {
          type: "Text",
        },
        hasMap: {
          type: "URL",
        },
        longitude: {
          type: "Text",
        },
        additionalProperty: {
          type: "Text",
        },
        containedIn: {
          type: "Place",
          foreign: true,
        },
        geoWithin: {
          type: "Place",
          foreign: true,
        },
        hasDriveThroughService: {
          type: "Boolean",
        },
        geoContains: {
          type: "Place",
          foreign: true,
        },
        latitude: {
          type: "Text",
        },
        openingHoursSpecification: {
          type: "Text",
        },
        faxNumber: {
          type: "Text",
        },
        geoIntersects: {
          type: "Place",
          foreign: true,
        },
        geoOverlaps: {
          type: "Place",
          foreign: true,
        },
        smokingAllowed: {
          type: "Boolean",
        },
        globalLocationNumber: {
          type: "Text",
        },
        review: {
          type: "Text",
        },
        event: {
          type: "Text",
        },
        containsPlace: {
          type: "Place",
          foreign: true,
        },
        geoTouches: {
          type: "Place",
          foreign: true,
        },
        geoDisjoint: {
          type: "Place",
          foreign: true,
        },
        isicV4: {
          type: "Text",
        },
        slogan: {
          type: "Text",
        },
        containedInPlace: {
          type: "Place",
          foreign: true,
        },
        photo: {
          type: "Text",
        },
        events: {
          type: "Text",
        },
        isAccessibleForFree: {
          type: "Boolean",
        },
        publicAccess: {
          type: "Boolean",
        },
        maps: {
          type: "URL",
        },
        address: {
          type: "Text",
        },
        tourBookingPage: {
          type: "URL",
        },
        specialOpeningHoursSpecification: {
          type: "Text",
        },
        logo: {
          type: "URL",
        },
        amenityFeature: {
          type: "Text",
        },
        telephone: {
          type: "Text",
        },
        geo: {
          type: "Text",
        },
        geoCovers: {
          type: "Place",
          foreign: true,
        },
        geoEquals: {
          type: "Place",
          foreign: true,
        },
      },
    },
  },
  Organization: {
    potentialAction: {
      type: "Text",
    },
    identifier: {
      type: "Text",
    },
    sameAs: {
      type: "URL",
    },
    url: {
      type: "URL",
    },
    image: {
      type: "URL",
    },
    alternateName: {
      type: "Text",
    },
    name: {
      type: "Text",
    },
    description: {
      type: "Text",
    },
    mainEntityOfPage: {
      type: "URL",
    },
    disambiguatingDescription: {
      type: "Text",
    },
    subjectOf: {
      type: "Text",
    },
    additionalType: {
      type: "URL",
    },
    engage: {
      Organization: {
        members: {
          type: "Organization",
          foreign: true,
        },
        knowsAbout: {
          type: "Thing",
          foreign: true,
        },
        correctionsPolicy: {
          type: "URL",
        },
        aggregateRating: {
          type: "Text",
        },
        hasProductReturnPolicy: {
          type: "Text",
        },
        diversityPolicy: {
          type: "URL",
        },
        duns: {
          type: "Text",
        },
        taxID: {
          type: "Text",
        },
        reviews: {
          type: "Text",
        },
        award: {
          type: "Text",
        },
        makesOffer: {
          type: "Text",
        },
        contactPoints: {
          type: "Text",
        },
        awards: {
          type: "Text",
        },
        foundingDate: {
          type: "Date",
        },
        ownershipFundingInfo: {
          type: "Text",
        },
        founders: {
          type: "Text",
        },
        seeks: {
          type: "Text",
        },
        member: {
          type: "Organization",
          foreign: true,
        },
        serviceArea: {
          type: "Place",
          foreign: true,
        },
        funder: {
          type: "Organization",
          foreign: true,
        },
        actionableFeedbackPolicy: {
          type: "URL",
        },
        areaServed: {
          type: "Place",
          foreign: true,
        },
        unnamedSourcesPolicy: {
          type: "URL",
        },
        faxNumber: {
          type: "Text",
        },
        subOrganization: {
          type: "Organization",
          foreign: true,
        },
        hasOfferCatalog: {
          type: "Text",
        },
        globalLocationNumber: {
          type: "Text",
        },
        foundingLocation: {
          type: "Place",
          foreign: true,
        },
        review: {
          type: "Text",
        },
        owns: {
          type: "Text",
        },
        sponsor: {
          type: "Organization",
          foreign: true,
        },
        event: {
          type: "Text",
        },
        founder: {
          type: "Text",
        },
        publishingPrinciples: {
          type: "URL",
        },
        isicV4: {
          type: "Text",
        },
        slogan: {
          type: "Text",
        },
        location: {
          type: "Place",
          foreign: true,
        },
        brand: {
          type: "Organization",
          foreign: true,
        },
        memberOf: {
          type: "Organization",
          foreign: true,
        },
        vatID: {
          type: "Text",
        },
        hasCredential: {
          type: "Text",
        },
        knowsLanguage: {
          type: "Text",
        },
        events: {
          type: "Text",
        },
        diversityStaffingReport: {
          type: "URL",
        },
        nonprofitStatus: {
          type: "Text",
        },
        address: {
          type: "Text",
        },
        alumni: {
          type: "Text",
        },
        dissolutionDate: {
          type: "Date",
        },
        interactionStatistic: {
          type: "Text",
        },
        logo: {
          type: "URL",
        },
        employees: {
          type: "Text",
        },
        telephone: {
          type: "Text",
        },
        hasMerchantReturnPolicy: {
          type: "Text",
        },
        email: {
          type: "Text",
        },
        department: {
          type: "Organization",
          foreign: true,
        },
        contactPoint: {
          type: "Text",
        },
        parentOrganization: {
          type: "Organization",
          foreign: true,
        },
        ethicsPolicy: {
          type: "URL",
        },
        legalName: {
          type: "Text",
        },
        leiCode: {
          type: "Text",
        },
        employee: {
          type: "Text",
        },
        numberOfEmployees: {
          type: "Text",
        },
        naics: {
          type: "Text",
        },
        hasPOS: {
          type: "Place",
          foreign: true,
        },
      },
    },
  },
  LocalBusiness: {
    potentialAction: {
      type: "Text",
    },
    identifier: {
      type: "Text",
    },
    sameAs: {
      type: "URL",
    },
    url: {
      type: "URL",
    },
    image: {
      type: "URL",
    },
    alternateName: {
      type: "Text",
    },
    name: {
      type: "Text",
    },
    description: {
      type: "Text",
    },
    mainEntityOfPage: {
      type: "URL",
    },
    disambiguatingDescription: {
      type: "Text",
    },
    subjectOf: {
      type: "Text",
    },
    additionalType: {
      type: "URL",
    },
    engage: {
      Place: {
        maximumAttendeeCapacity: {
          type: "Text",
        },
        geoCrosses: {
          type: "Place",
          foreign: true,
        },
        aggregateRating: {
          type: "Text",
        },
        reviews: {
          type: "Text",
        },
        photos: {
          type: "Text",
        },
        map: {
          type: "URL",
        },
        geoCoveredBy: {
          type: "Place",
          foreign: true,
        },
        branchCode: {
          type: "Text",
        },
        hasMap: {
          type: "URL",
        },
        longitude: {
          type: "Text",
        },
        additionalProperty: {
          type: "Text",
        },
        containedIn: {
          type: "Place",
          foreign: true,
        },
        geoWithin: {
          type: "Place",
          foreign: true,
        },
        hasDriveThroughService: {
          type: "Boolean",
        },
        geoContains: {
          type: "Place",
          foreign: true,
        },
        latitude: {
          type: "Text",
        },
        openingHoursSpecification: {
          type: "Text",
        },
        faxNumber: {
          type: "Text",
        },
        geoIntersects: {
          type: "Place",
          foreign: true,
        },
        geoOverlaps: {
          type: "Place",
          foreign: true,
        },
        smokingAllowed: {
          type: "Boolean",
        },
        globalLocationNumber: {
          type: "Text",
        },
        review: {
          type: "Text",
        },
        event: {
          type: "Text",
        },
        containsPlace: {
          type: "Place",
          foreign: true,
        },
        geoTouches: {
          type: "Place",
          foreign: true,
        },
        geoDisjoint: {
          type: "Place",
          foreign: true,
        },
        isicV4: {
          type: "Text",
        },
        slogan: {
          type: "Text",
        },
        containedInPlace: {
          type: "Place",
          foreign: true,
        },
        photo: {
          type: "Text",
        },
        events: {
          type: "Text",
        },
        isAccessibleForFree: {
          type: "Boolean",
        },
        publicAccess: {
          type: "Boolean",
        },
        maps: {
          type: "URL",
        },
        address: {
          type: "Text",
        },
        tourBookingPage: {
          type: "URL",
        },
        specialOpeningHoursSpecification: {
          type: "Text",
        },
        logo: {
          type: "URL",
        },
        amenityFeature: {
          type: "Text",
        },
        telephone: {
          type: "Text",
        },
        geo: {
          type: "Text",
        },
        geoCovers: {
          type: "Place",
          foreign: true,
        },
        geoEquals: {
          type: "Place",
          foreign: true,
        },
      },
      Organization: {
        members: {
          type: "Organization",
          foreign: true,
        },
        knowsAbout: {
          type: "Thing",
          foreign: true,
        },
        correctionsPolicy: {
          type: "URL",
        },
        aggregateRating: {
          type: "Text",
        },
        hasProductReturnPolicy: {
          type: "Text",
        },
        diversityPolicy: {
          type: "URL",
        },
        duns: {
          type: "Text",
        },
        taxID: {
          type: "Text",
        },
        reviews: {
          type: "Text",
        },
        award: {
          type: "Text",
        },
        makesOffer: {
          type: "Text",
        },
        contactPoints: {
          type: "Text",
        },
        awards: {
          type: "Text",
        },
        foundingDate: {
          type: "Date",
        },
        ownershipFundingInfo: {
          type: "Text",
        },
        founders: {
          type: "Text",
        },
        seeks: {
          type: "Text",
        },
        member: {
          type: "Organization",
          foreign: true,
        },
        serviceArea: {
          type: "Place",
          foreign: true,
        },
        funder: {
          type: "Organization",
          foreign: true,
        },
        actionableFeedbackPolicy: {
          type: "URL",
        },
        areaServed: {
          type: "Place",
          foreign: true,
        },
        unnamedSourcesPolicy: {
          type: "URL",
        },
        faxNumber: {
          type: "Text",
        },
        subOrganization: {
          type: "Organization",
          foreign: true,
        },
        hasOfferCatalog: {
          type: "Text",
        },
        globalLocationNumber: {
          type: "Text",
        },
        foundingLocation: {
          type: "Place",
          foreign: true,
        },
        review: {
          type: "Text",
        },
        owns: {
          type: "Text",
        },
        sponsor: {
          type: "Organization",
          foreign: true,
        },
        event: {
          type: "Text",
        },
        founder: {
          type: "Text",
        },
        publishingPrinciples: {
          type: "URL",
        },
        isicV4: {
          type: "Text",
        },
        slogan: {
          type: "Text",
        },
        location: {
          type: "Place",
          foreign: true,
        },
        brand: {
          type: "Organization",
          foreign: true,
        },
        memberOf: {
          type: "Organization",
          foreign: true,
        },
        vatID: {
          type: "Text",
        },
        hasCredential: {
          type: "Text",
        },
        knowsLanguage: {
          type: "Text",
        },
        events: {
          type: "Text",
        },
        diversityStaffingReport: {
          type: "URL",
        },
        nonprofitStatus: {
          type: "Text",
        },
        address: {
          type: "Text",
        },
        alumni: {
          type: "Text",
        },
        dissolutionDate: {
          type: "Date",
        },
        interactionStatistic: {
          type: "Text",
        },
        logo: {
          type: "URL",
        },
        employees: {
          type: "Text",
        },
        telephone: {
          type: "Text",
        },
        hasMerchantReturnPolicy: {
          type: "Text",
        },
        email: {
          type: "Text",
        },
        department: {
          type: "Organization",
          foreign: true,
        },
        contactPoint: {
          type: "Text",
        },
        parentOrganization: {
          type: "Organization",
          foreign: true,
        },
        ethicsPolicy: {
          type: "URL",
        },
        legalName: {
          type: "Text",
        },
        leiCode: {
          type: "Text",
        },
        employee: {
          type: "Text",
        },
        numberOfEmployees: {
          type: "Text",
        },
        naics: {
          type: "Text",
        },
        hasPOS: {
          type: "Place",
          foreign: true,
        },
      },
      LocalBusiness: {
        priceRange: {
          type: "Text",
        },
        openingHours: {
          type: "Text",
        },
        currenciesAccepted: {
          type: "Text",
        },
        branchOf: {
          type: "Organization",
          foreign: true,
        },
        paymentAccepted: {
          type: "Text",
        },
      },
    },
  },
}

describe(`class | ThingBuilder | things schemaorg 9.0`, () => {
  it(`builds things`, () => {
    let opts = { depth: 0, comment: false }
    let thing = this.thingBuilder.things(["HealthAndBeautyBusiness"], opts)
    thing.should.be.eql(expectThings)
  })
})
