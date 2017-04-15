import { each, conditional } from './flow-expressions'
import TemplateParser from '../grammar'
/**
 * HTML_TAGS matches opening and self-closing tags, not the content.
 * Used by {@link module:compiler~_compileHTML|_compileHTML} after hidding
 * the expressions.
 *
 * 2016-01-18: exclude `'\s'` from attr capture to avoid unnecessary call to
 *  {@link module:compiler~parseAttribs|parseAttribs}
 * @const {RegExp}
 */
export const HTML_TAGS = /<(-?[A-Za-z][-\w\xA0-\xFF]*)(?:\s+([^"'\/>]*(?:(?:"[^"]*"|'[^']*'|\/[^>])[^'"\/>]*)*)|\s*)(\/?)>/g
/**
 * HTML5 void elements that cannot be auto-closed.
 * @const {RegExp}
 * @see   {@link http://www.w3.org/TR/html-markup/syntax.html#syntax-elements}
 * @see   {@link http://www.w3.org/TR/html5/syntax.html#void-elements}
 */
export const VOID_TAGS = /^(?:input|img|br|wbr|hr|area|base|col|embed|keygen|link|meta|param|source|track)$/
// match all the "{" and "\{" and "${" to replace eventually with "${"
export const TMPL_EXPR = /(?:({|[\\|$]{)(?:!)?)(?!#)(.+)}/
// match all the {#whathever } expressions
export const START_FLOW_EXPR = /{#(\w+(?:\sif)?)(?:\s)?(.+)?}/i
// match all the {/whathever } expressions
export const END_FLOW_EXPR = /{\/(?:\s+)?(\w+)(?:\s+)?}/i
// detect the variable names in the expressions
export const VARIABLES = /(?:^ *|[\S])(?:[\S]*)/


export function replaceFlowExpressions(expr, name, value, position) {
  switch (name) {
  case 'each':
    return each[position](expr, value)
  case 'if':
  case 'else if':
  case 'elseif':
    return conditional[position](expr, value, name)
  default:
    return expr
  }
}

export function normalizeMarkup(name, attr, ends) {
  // force all tag names to lowercase
  name = name.toLowerCase()
  // close self-closing tag, except if this is a html5 void tag
  ends = ends && !VOID_TAGS.test(name) ? `></${name}` : ''
  return `<${name}${ends}>`
}

export function parse(html, offset) {
  const lines = html.code.split('\n')
  const map = []

  lines.map((line, row) => {
    map.push({
      original: { line: row + offset, column: 0 },
      generated: { line: row + 1, column: 0 }
    })

    return line
      .replace(TMPL_EXPR, (_, openBrackets, expr) => {
        if (expr.substring(0, 2) === '!') {
          lines[row -1] = lines[row -1].trim()
          line = line.trim()
        } else {
          lines[row -1] += ' '
        }

        return openBrackets.substring(0, 1) === '{' ? '${' : openBrackets
      })
      .replace(START_FLOW_EXPR, (_, expr, name, value) => {
        // update the previous row
        lines[row -1] = `${lines[row -1].trim()}$\{`
        return replaceFlowExpressions(expr, name, value, 'start')
      })
      .replace(END_FLOW_EXPR, (_, expr, name, value) => {
        // update the next row
        lines[row +1] = `}${lines[row +1].trim()}`
        return replaceFlowExpressions(expr, name, value, 'end')
      })
      .replace(HTML_TAGS, (_, name, attr, ends) => normalizeMarkup(name, attr, ends))
  })

  return {
    code: lines.join('\n'),
    map
  }
}