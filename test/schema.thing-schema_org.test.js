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

describe(`class | ThingBuilder | thing schemaorg 9.0`, () => {
  for (let [modelName, expectThing] of Object.entries({
    Thing: {
      potentialAction: { type: "Text" },
      identifier: { type: "Text" },
      sameAs: { type: "URL" },
      url: { type: "URL" },
      image: { type: "URL" },
      alternateName: { type: "Text" },
      name: { type: "Text" },
      description: { type: "Text" },
      mainEntityOfPage: { type: "URL" },
      disambiguatingDescription: { type: "Text" },
      subjectOf: { type: "Text" },
      additionalType: { type: "URL" },
    },
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
    ComicIssue: {
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
        type: "CreativeWork",
        foreign: true,
      },
      disambiguatingDescription: {
        type: "Text",
      },
      subjectOf: {
        type: "CreativeWork",
        foreign: true,
      },
      additionalType: {
        type: "URL",
      },
      engage: {
        CreativeWork: {
          typicalAgeRange: {
            type: "Text",
          },
          hasPart: {
            type: "CreativeWork",
            foreign: true,
          },
          sdDatePublished: {
            type: "Date",
          },
          educationalLevel: {
            type: "Text",
          },
          releasedEvent: {
            type: "Text",
          },
          schemaVersion: {
            type: "Text",
          },
          contentLocation: {
            type: "Text",
          },
          locationCreated: {
            type: "Text",
          },
          aggregateRating: {
            type: "Text",
          },
          temporalCoverage: {
            type: "Text",
          },
          accessModeSufficient: {
            type: "Text",
          },
          accountablePerson: {
            type: "Text",
          },
          mainEntity: {
            type: "Thing",
            foreign: true,
          },
          sdPublisher: {
            type: "Text",
          },
          spatialCoverage: {
            type: "Text",
          },
          reviews: {
            type: "Text",
          },
          exampleOfWork: {
            type: "CreativeWork",
            foreign: true,
          },
          maintainer: {
            type: "Text",
          },
          editor: {
            type: "Text",
          },
          offers: {
            type: "Text",
          },
          discussionUrl: {
            type: "URL",
          },
          award: {
            type: "Text",
          },
          sdLicense: {
            type: "CreativeWork",
            foreign: true,
          },
          copyrightHolder: {
            type: "Text",
          },
          accessibilityHazard: {
            type: "Text",
          },
          copyrightYear: {
            type: "Number",
          },
          awards: {
            type: "Text",
          },
          publisherImprint: {
            type: "Text",
          },
          commentCount: {
            type: "Text",
          },
          spatial: {
            type: "Text",
          },
          recordedAt: {
            type: "Text",
          },
          abstract: {
            type: "Text",
          },
          fileFormat: {
            type: "Text",
          },
          isPartOf: {
            type: "CreativeWork",
            foreign: true,
          },
          temporal: {
            type: "Text",
          },
          accessibilitySummary: {
            type: "Text",
          },
          inLanguage: {
            type: "Text",
          },
          educationalAlignment: {
            type: "Text",
          },
          associatedMedia: {
            type: "Text",
          },
          funder: {
            type: "Text",
          },
          position: {
            type: "Text",
          },
          audio: {
            type: "Text",
          },
          workExample: {
            type: "CreativeWork",
            foreign: true,
          },
          encoding: {
            type: "Text",
          },
          interactivityType: {
            type: "Text",
          },
          provider: {
            type: "Text",
          },
          character: {
            type: "Text",
          },
          sourceOrganization: {
            type: "Text",
          },
          audience: {
            type: "Text",
            enums: ["Researcher"],
          },
          materialExtent: {
            type: "Text",
          },
          video: {
            type: "Text",
          },
          accessibilityFeature: {
            type: "Text",
          },
          publisher: {
            type: "Text",
          },
          text: {
            type: "Text",
          },
          publication: {
            type: "Text",
          },
          contributor: {
            type: "Text",
          },
          encodingFormat: {
            type: "Text",
          },
          review: {
            type: "Text",
          },
          accessibilityControl: {
            type: "Text",
          },
          license: {
            type: "CreativeWork",
            foreign: true,
          },
          sponsor: {
            type: "Text",
          },
          encodings: {
            type: "Text",
          },
          about: {
            type: "Thing",
            foreign: true,
          },
          isBasedOn: {
            type: "CreativeWork",
            foreign: true,
          },
          creator: {
            type: "Text",
          },
          publishingPrinciples: {
            type: "CreativeWork",
            foreign: true,
          },
          producer: {
            type: "Text",
          },
          correction: {
            type: "Text",
          },
          workTranslation: {
            type: "CreativeWork",
            foreign: true,
          },
          mentions: {
            type: "Thing",
            foreign: true,
          },
          contentReferenceTime: {
            type: "DateTime",
          },
          dateCreated: {
            type: "Date",
          },
          educationalUse: {
            type: "Text",
          },
          teaches: {
            type: "Text",
          },
          alternativeHeadline: {
            type: "Text",
          },
          datePublished: {
            type: "Date",
          },
          isAccessibleForFree: {
            type: "Boolean",
          },
          headline: {
            type: "Text",
          },
          translationOfWork: {
            type: "CreativeWork",
            foreign: true,
          },
          acquireLicensePage: {
            type: "CreativeWork",
            foreign: true,
          },
          conditionsOfAccess: {
            type: "Text",
          },
          citation: {
            type: "CreativeWork",
            foreign: true,
          },
          accessibilityAPI: {
            type: "Text",
          },
          interactionStatistic: {
            type: "Text",
          },
          contentRating: {
            type: "Text",
          },
          accessMode: {
            type: "Text",
          },
          material: {
            type: "Text",
          },
          isFamilyFriendly: {
            type: "Boolean",
          },
          assesses: {
            type: "Text",
          },
          keywords: {
            type: "Text",
          },
          version: {
            type: "Text",
          },
          dateModified: {
            type: "Date",
          },
          learningResourceType: {
            type: "Text",
          },
          genre: {
            type: "Text",
          },
          creativeWorkStatus: {
            type: "Text",
          },
          pattern: {
            type: "Text",
          },
          editEIDR: {
            type: "Text",
          },
          author: {
            type: "Text",
          },
          size: {
            type: "Text",
          },
          translator: {
            type: "Text",
          },
          timeRequired: {
            type: "Text",
          },
          usageInfo: {
            type: "CreativeWork",
            foreign: true,
          },
          isBasedOnUrl: {
            type: "CreativeWork",
            foreign: true,
          },
          thumbnailUrl: {
            type: "URL",
          },
          expires: {
            type: "Date",
          },
          comment: {
            type: "Text",
          },
        },
        PublicationIssue: {
          issueNumber: {
            type: "Text",
          },
          pageEnd: {
            type: "Text",
          },
          pageStart: {
            type: "Text",
          },
          pagination: {
            type: "Text",
          },
        },
        ComicIssue: {
          artist: {
            type: "Text",
          },
          variantCover: {
            type: "Text",
          },
          inker: {
            type: "Text",
          },
          colorist: {
            type: "Text",
          },
          letterer: {
            type: "Text",
          },
          penciler: {
            type: "Text",
          },
        },
      },
    },
  })) {
    it(`${modelName} thing`, () => {
      let opts = { depth: 0, comment: false }
      let modelsMined = this.thingBuilder.modelMiner([modelName], opts)
      let thing = this.thingBuilder.thing(modelName, modelsMined, opts)
      thing.should.be.eql(expectThing)
    })
  }
})
