/* global createSourceLocation */
/* eslint-disable no-unused-vars */

function AttributeNode(name, body, loc) {
  this.type = 'Attribute'
  this.name = name
  this.body = body
  this.loc = loc
}

function SpreadAttributeNode(identifier, loc) {
  this.type = 'SpreadAttribute'
  this.identifier = identifier
  this.loc = loc
}

function DirectiveNode(name, body, loc) {
  this.type = 'Directive'
  this.name = name
  this.body = body
  this.loc = loc
}


function ImportDirectiveNode(identifier, path, loc) {
  this.type = 'ImportDirective'
  this.identifier = identifier
  this.path = path
  this.loc = loc
}

function EachDirectiveNode(expr, body, options, loc) {
  this.type = 'EachDirective'
  this.expr = expr
  this.body = body
  this.options = options
  this.loc = loc
}

function UnsafeDirectiveNode(html, loc) {
  this.type = 'UnsafeDirective'
  this.html = html
  this.loc = loc
}

function FilterExpressionNode(callee, args, loc) {
  this.type = 'FilterExpression'
  this.callee = callee
  this.arguments = args
  this.loc = loc
}

function ThisExpressionNode(loc) {
  this.type = 'ThisExpression'
  this.loc = loc
}

function ArrayExpressionNode(elements, loc) {
  this.type = 'ArrayExpression'
  this.elements = elements
  this.loc = loc
}

function ObjectExpressionNode(properties, loc) {
  this.type = 'ObjectExpression'
  this.properties = properties
  this.loc = loc
}

function SequenceExpressionNode(expressions, loc) {
  this.type = 'SequenceExpression'
  this.expressions = expressions
  this.loc = loc
}

function UnaryExpressionNode(operator, prefix, argument, loc) {
  this.type = 'UnaryExpression'
  this.operator = operator
  this.prefix = prefix
  this.argument = argument
  this.loc = loc
}

function BinaryExpressionNode(operator, left, right, loc) {
  this.type = 'BinaryExpression'
  this.operator = operator
  this.left = left
  this.right = right
  this.loc = loc
}

function AssignmentExpressionNode(operator, left, right, loc) {
  this.type = 'AssignmentExpression'
  this.operator = operator
  this.left = left
  this.right = right
  this.loc = loc
}

function UpdateExpressionNode(operator, argument, prefix, loc) {
  this.type = 'UpdateExpression'
  this.operator = operator
  this.argument = argument
  this.prefix = prefix
  this.loc = loc
}

function LogicalExpressionNode(operator, left, right, loc) {
  this.type = 'LogicalExpression'
  this.operator = operator
  this.left = left
  this.right = right
  this.loc = loc
}

function ConditionalExpressionNode(test, consequent, alternate, loc) {
  this.type = 'ConditionalExpression'
  this.test = test
  this.consequent = consequent
  this.alternate = alternate
  this.loc = loc
}

function NewExpressionNode(callee, args, loc) {
  this.type = 'NewExpression'
  this.callee = callee
  this.arguments = args
  this.loc = loc
}

function CallExpressionNode(callee, args, loc) {
  this.type = 'CallExpression'
  this.callee = callee
  this.arguments = args
  this.loc = loc
}

function MemberExpressionNode(object, property, computed, loc) {
  this.type = 'MemberExpression'
  this.object = object
  this.property = property
  this.computed = computed
  this.loc = loc
}

function IdentifierNode(name, loc) {
  this.type = 'Identifier'
  this.name = name
  this.loc = loc
}

function AccessorNode(name, loc) {
  this.type = 'Accessor'
  this.name = name
  this.loc = loc
}

function LiteralNode(value, loc) {
  this.type = 'Literal'
  this.value = value
  this.loc = loc
}


/**
 * Nodes creation function
 */

function createNode(props) {
  return Object.assign(props, {
    loc: createSourceLocation(props.loc[0], props.loc[1])
  })
}