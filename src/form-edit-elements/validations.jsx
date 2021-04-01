/**
 * <DynamicOptionList />
 */

import React from 'react';
import ID from '../UUID';

const availableValidationRules = [
  {
    key: 'required',
  },
  {
    key: 'email',
  },
  {
    key: 'account_number',
    title: 'Account Number',
  },
  {
    key: 'min',
    hasConstraint: true,
    constraint: 'number',
    description: 'Minimum range a number can be.',
    onlyOn: 'NumberInput',
  },
  {
    key: 'max',
    hasConstraint: true,
    constraint: 'number',
    description: 'Maximum range a number can be.',
    onlyOn: 'NumberInput',
  },
  {
    key: 'in',
    hasConstraint: true,
    description: 'A list of allowed values.',
  },
];

export default class Validations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: this.props.element,
      data: this.props.data,
      dirty: false,
      availableRules: availableValidationRules,
    };
  }

  _setValue(text) {
    return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
  }

  editRule(index, e) {
    const { element } = this.state;
    // const val = (element.validationRules[index].rule !== this._setValue(element.validationRules[index].text)) ? element.validationRules[index].value : this._setValue(e.target.value);
    element.validationRules[index].rule = e.target.value;
    // element.validationRules[index].value = val;
    this.setState({
      element,
      dirty: true,
    });
  }

  editConstraint(index, e) {
    const { element } = this.state;
    element.validationRules[index].constraint = e.target.value;
    this.setState({
      element,
      dirty: true,
    });
  }

  updateRule() {
    const { element } = this.state;
    // to prevent ajax calls with no change
    if (this.state.dirty) {
      this.props.updateElement.call(this.props.preview, element);
      this.setState({ dirty: false });
    }
  }

  addRule(index) {
    const { element } = this.state;
    element.validationRules.splice(index + 1, 0, {
      rule: '0',
      key: ID.uuid(),
    });
    this.props.updateElement.call(this.props.preview, element);
  }

  removeRule(index) {
    const { element } = this.state;
    element.validationRules.splice(index, 1);
    this.props.updateElement.call(this.props.preview, element);
  }

  ruleHasConstraint(index) {
    const rule = this.getRule(index);
    if (rule.length > 0) {
      return rule[0].hasOwnProperty('hasConstraint') && rule[0].hasConstraint;
    }
    return false;
  }

  getConstraint(index) {
    const rule = this.getRule(index);
    if (rule.length > 0 && rule[0].hasOwnProperty('constraint')) {
      return rule[0].constraint;
    }
    return 'text';
  }

  getRule(index) {
    const { element } = this.state;
    return this.state.availableRules.filter(x => x.key === element.validationRules[index].rule);
  }

  ruleHasDescription(index) {
    const rule = this.getRule(index);
    if (rule.length > 0) {
      return rule[0].hasOwnProperty('description');
    }
    return false;
  }

  getDescription(index) {
    const rule = this.getRule(index);
    if (rule.length > 0 && rule[0].hasOwnProperty('description')) {
      return rule[0].description;
    }
    return '';
  }

  ruleIsNotSelected(r) {
    const { element } = this.state;
    let isSelected = false;
    element.validationRules.map(item => {
      if (item.rule === r) {
        isSelected = true;
      }
      return true;
    });
    return !isSelected;
  }

  ruleIsCurrentlySelected(r, index) {
    const { element } = this.state;
    return element.validationRules[index].rule === r;
  }

  ruleIsAvailable(r) {
    return !(r.hasOwnProperty('onlyOn') && r.onlyOn !== this.state.element.element);
  }

  render() {
    if (this.state.dirty) {
      this.state.element.dirty = true;
    }
    const { validationRules } = this.props.element;
    return !this.state.element.static ? (
      <div className="dynamic-option-list">
        <h6>Validation Rules</h6>
        <ul>
          {
            validationRules.map((rule, index) => {
              const key = `edit_${rule.key}`;
              return (
                <li className="clearfix" key={key}>
                  <div className="row">
                    <div className="col-sm-4">
                      <select tabIndex={index + 1}
                              className="form-control"
                              style={{ width: '100%' }}
                              name={`rule_${index}`}
                              value={rule.rule}
                              placeholder="Validation Rule"
                              onBlur={this.updateRule.bind(this)}
                              onChange={this.editRule.bind(this, index)}>
                        <option value="0" disabled>Select rule</option>
                        {
                          this.state.availableRules.map((r) => {
                            if (this.ruleIsAvailable(r)) {
                              if (this.ruleIsCurrentlySelected(r.key, index) || this.ruleIsNotSelected(r.key)) {
                                return <option value={r.key}>{r.title ? r.title : r.key.charAt(0).toUpperCase() + r.key.slice(1)}</option>;
                              }
                            }
                            return null;
                          })
                        }
                      </select>
                    </div>
                    {
                      this.ruleHasConstraint(index) &&
                      (
                        <div className="col-sm-5">
                          <input tabIndex={index + 1}
                                 className="form-control"
                                 style={{ width: '100%' }}
                                 type={this.getConstraint(index)}
                                 name={`rule_${index}`}
                                 value={rule.constraint ? rule.constraint : ''}
                                 placeholder="Constraint"
                                 onChange={this.editConstraint.bind(this, index)} />
                        </div>
                      )
                    }
                    <div className="col-sm-3">
                      <div className="dynamic-options-actions-buttons">
                        <button onClick={this.addRule.bind(this, index)}
                                className="btn btn-success"><i
                          className="fas fa-plus-circle"/></button>
                        {index > 0
                        && <button onClick={this.removeRule.bind(this, index)}
                                   className="btn btn-danger"><i
                          className="fas fa-minus-circle"/></button>
                        }
                      </div>
                    </div>
                  </div>
                  {
                    this.ruleHasDescription(index) &&
                    (
                      <div className="row" style={{ marginTop: '5px' }}>
                        <div className="col-sm-12">
                          <span>{this.getDescription(index)}</span>
                        </div>
                      </div>
                    )
                  }
                </li>
              );
            })
          }
        </ul>
      </div>
    ) : null;
  }
}
