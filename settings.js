"use strict"

module.exports = {
  sanitizers: {
    comment: queryString => {
      queryString = queryString || {}
      queryString.comment =
        queryString.hasOwnProperty("comment") &&
        String(queryString.comment) !== "false"
      return queryString
    },
    depth: queryString => {
      queryString = queryString || {}
      queryString.depth = Number(queryString.depth) || 0
      return queryString
    }
  },
  slim: {
    // additionalType: 1,
    // alternateName: 1,
    description: 1,
    // disambiguatingDescription: 1,
    // identifier: 1,
    // image: 1,
    // mainEntityOfPage: 1,
    name: 1,
    // potentialAction: 1,
    // sameAs: 1,
    // subjectOf: 1,
    // url: 1,
    thing: 1,
    // god: 1,
    // created: 1,
    // createdBy: 1,
    _id: 1
  }
}
