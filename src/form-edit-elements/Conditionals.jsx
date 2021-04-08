import React from 'react';
import ID from "../UUID";

class Conditionals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: this.props.element,
      data: this.props.data,
      dirty: false,
      fields: this.props.data.filter(x => x.id !== this.props.element.id && x.static !== true),
      condition: {},
    };
  }

  setCondition(e, property) {
    this.setState({
      condition: {
        ...this.state.condition,
        [property]: e.target.value,
      },
    });
  }

  setField(e) {
    this.setCondition(e, 'field');
  }

  setOperator(e) {
    this.setCondition(e, 'operator');
  }

  setValue(e) {
    this.setCondition(e, 'value');
  }

  /**
   * Adds new condition field row.
   *
   * @param index
   * @param type
   */
  addCondition(index, type) {
    const {element} = this.state;
    element.conditionalRules.splice(index + 1, 0, {
      key: ID.uuid(),
      field: '0',
      operator: '0',
      value: '',
      type,
    });
    this.props.updateElement.call(this.props.preview, element);
  }

  /**
   * Removes a condition field row.
   * @param index
   */
  removeCondition(index) {
    const {element} = this.state;
    element.conditionalRules.splice(index, 1);
    this.props.updateElement.call(this.props.preview, element);
  }

  /**
   * Returns if the conditional field can be shown.
   *
   * @returns {*|boolean}
   */
  showConditionalField() {
    return this.state.fields && this.state.fields.length > 0;
  }

  render() {
    console.log(this.state.element.conditionalRules);
    const {conditionalRules} = this.props.element;
    return this.showConditionalField ? (
      <div className="dynamic-option-list">
        <h6>Conditional Display Rules</h6>
        <ul>
          {
            conditionalRules.map((condition, index) => {
              const key = `edit_${condition.key}`;
              return (
                <li className="clearfix" key={key}>
                  <div className="row">
                    <div className="col-sm-6">
                      <label className="control-label"
                             htmlFor="conditional-fields">Field</label>
                      <select tabIndex={index + 1}
                              className="form-control"
                              style={{ width: '100%' }}
                              name={`rule_${index}`}
                              value={condition.field}
                              placeholder="Validation Rule"
                              onBlur={this.updateRule.bind(this)}
                              onChange={this.editRule.bind(this, index)}>
                        <option value="0" disabled>Select Field</option>
                        {this.state.fields && this.state.fields.map(item => (
                          <option
                            value={item.id}>{item.text} ({item.label})</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-sm-2">
                      <label className="control-label"
                             htmlFor="conditional-fields">Operator</label>
                      <select className="form-control"
                              onChange={this.setOperator.bind(this)}
                              aria-label="Default select example">
                        <option selected disabled>Select</option>
                        <option value="1">is equal</option>
                        <option value="2">is not equal</option>
                        <option value="3">is greater than</option>
                        <option value="3">is less than</option>
                      </select>
                    </div>
                    <div className="col-sm-4">
                      <label className="control-label"
                             htmlFor="value">Value</label>
                      <input type="text" onChange={this.setValue.bind(this)}
                             className="form-control"/>
                    </div>
                    <div className="col-sm-5">
                      <div className="dynamic-options-actions-buttons">
                        <button
                          onClick={this.addCondition.bind(this, index, 'or')}
                          className="btn btn-success"><i
                          className="fas fa-plus-circle"/> OR
                        </button>
                        <button
                          onClick={this.addCondition.bind(this, index, 'and')}
                          className="btn btn-success"><i
                          className="fas fa-plus-circle"/> AND
                        </button>
                        {index > 0
                        &&
                        <button onClick={this.removeCondition.bind(this, index)}
                                className="btn btn-danger"><i
                          className="fas fa-minus-circle"/></button>
                        }
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
            }
            </ul>
            </div>
            ) : null;
          }
          }

  export
  default
  Conditionals;
