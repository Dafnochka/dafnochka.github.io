import React, {Component} from 'react';

class ChangeData extends Component {
    render() {
        return (
            <div
            >
                    <div className="radio">
                        <label>
                            <input type="radio"
                                   name="optionsRadios"
                                   id="optionsRadios1"
                                   value="option1"
                                   defaultChecked = {true}
                                   onChange={this.props.onDataChange}
                                   ></input>
                            <b>Маленький объем данных</b>
                        </label>
                    </div>
                    <div className="radio disabled">
                        <label>
                            <input type="radio"
                                   name="optionsRadios"
                                   id="optionsRadios2"
                                   value="option2"
                                   onChange={this.props.onDataChange}
                                   ></input>
                            <b>Большой объем данных</b>

                        </label>
                    </div>
            </div>
        )
    }
}

export {ChangeData};