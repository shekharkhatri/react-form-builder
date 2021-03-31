import React from 'react';

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

  render() {
    console.log(this.state.condition);
    return (this.state.fields && this.state.fields.length > 0) ? (
      <div className="form-group">
        <label className="control-label"
               htmlFor="conditional-fields">Conditionals</label>
        <div className="row">
          <div className="col-sm-6">
            <label className="control-label"
                   htmlFor="conditional-fields">Field</label>
            <select className="form-control" onChange={this.setField.bind(this)}
                    aria-label="Default select example">
              <option selected disabled>Select</option>
              { this.state.fields && this.state.fields.map(item => (
                <option value={item.id}>{item.text} ({item.label})</option>
              ))}
            </select>
          </div>
          <div className="col-sm-2">
            <label className="control-label"
                   htmlFor="conditional-fields">Operator</label>
            <select className="form-control" onChange={this.setOperator.bind(this)}
                    aria-label="Default select example">
              <option selected disabled>Select</option>
              <option value="1">is equal</option>
              <option value="2">is not equal</option>
              <option value="3">is greater than</option>
              <option value="3">is less than</option>
            </select>
          </div>
          <div className="col-sm-4">
            <label className="control-label" htmlFor="value">Value</label>
            <input type="text" onChange={this.setValue.bind(this)} className="form-control"/>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default Conditionals;
