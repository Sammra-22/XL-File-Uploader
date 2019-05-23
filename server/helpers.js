/**
 *    @param  {string} headerValue - the value of a `Content-Range` header
 *    	The supported forms of this header are specified in this [RFC](https://tools.ietf.org/html/rfc7233#section-4.2)
 *    	and on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range#Syntax)
 *    @return {ParseResult}
 */
function parseContentRange(headerValue) {
  if (!headerValue) {
    return null;
  }

  if (typeof headerValue !== "string") {
    throw new Error("invalid argument");
  }

  // Check for presence of unit
  var matches = headerValue.match(/^(\w*) /);
  const unit = matches && matches[1];

  // check for start-end/size header format
  matches = headerValue.match(/(\d+)-(\d+)\/(\d+|\*)/);
  if (matches) {
    return {
      unit: unit,
      first: parseInt(matches[1], 10),
      last: parseInt(matches[2], 10),
      length: matches[3] === "*" ? null : parseInt(matches[3], 10)
    };
  }

  // check for size header format
  matches = headerValue.match(/(\d+|\*)/);
  if (matches) {
    return {
      unit: unit,
      first: null,
      last: null,
      length: matches[1] === "*" ? null : parseInt(matches[1], 10)
    };
  }

  return null;
}

module.exports = parseContentRange;
