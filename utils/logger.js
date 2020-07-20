const { createLogger, format, transports } = require("winston")
const { printf } = format

const message = printf(({ message }) => {
  return `${message}`
})

module.exports = createLogger({
  level: "error",
  transports: [new transports.Console()],
  format: message,
})
