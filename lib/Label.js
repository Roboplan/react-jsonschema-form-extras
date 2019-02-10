"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultLabel = DefaultLabel;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("react-jsonschema-form/lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REQUIRED_FIELD_SYMBOL = "*";

function Label(props) {
  var label = props.label,
      required = props.required,
      id = props.id;

  if (!label) {
    // See #312: Ensure compatibility with old versions of React.
    return _react2.default.createElement("div", null);
  }
  return _react2.default.createElement(
    "label",
    { key: 0, className: "control-label", htmlFor: id },
    label,
    required && _react2.default.createElement(
      "span",
      { className: "required" },
      REQUIRED_FIELD_SYMBOL
    )
  );
}

function DefaultLabel(_ref) {
  var schema = _ref.schema,
      uiSchema = _ref.uiSchema,
      definitions = _ref.definitions,
      required = _ref.required,
      id = _ref.id,
      name = _ref.name,
      _ref$registry = _ref.registry,
      registry = _ref$registry === undefined ? (0, _utils.getDefaultRegistry)() : _ref$registry,
      formContext = _ref.formContext;

  var uiOptions = (0, _utils.getUiOptions)(uiSchema);
  var _uiOptions$label = uiOptions.label,
      displayLabel = _uiOptions$label === undefined ? true : _uiOptions$label,
      forceLabelDisplay = uiOptions.forceLabelDisplay;

  if (schema.type === "array") {
    displayLabel = (0, _utils.isMultiSelect)(schema, definitions) || (0, _utils.isFilesArray)(schema, uiSchema, definitions);
  }
  if (schema.type === "object") {
    displayLabel = false;
  }
  if (schema.type === "boolean" && !uiSchema["ui:widget"]) {
    displayLabel = false;
  }

  var label = uiSchema["ui:title"] || schema.title || name;
  var description = uiSchema["ui:description"] || schema.description;

  var fields = registry.fields;
  var DescriptionField = fields.DescriptionField;


  if (displayLabel || forceLabelDisplay) {
    return [_react2.default.createElement(Label, { key: 0, label: label, required: required, id: id }), description ? _react2.default.createElement(DescriptionField, {
      key: 1,
      id: id + "__description",
      description: description,
      formContext: formContext
    }) : undefined];
  }

  return null;
}