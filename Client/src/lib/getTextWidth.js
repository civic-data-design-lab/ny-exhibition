/**
 * Uses canvas.measureText to compute and return the width of the given text in pixels.
 *
 * @param {String} text The text to be rendered.
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
export function getTextWidth(text, cssFont) {
  // re-use canvas object for better performance
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
  var context = canvas.getContext('2d')
  context.font = cssFont
  var metrics = context.measureText(text)
  return Math.ceil(metrics.width)
}
