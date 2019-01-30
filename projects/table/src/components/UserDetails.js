import React, {Component} from 'react';

class UserDetails extends Component {
    render() {
        const user = this.props.user;

        return (
            <div>
                <p>Выбран пользователь <b>{user.firstName} {user.lastName} </b></p>
                <p>Описание:
                    <br/>
                    <div >{user.description}</div>
                </p>
                <p>Адрес проживания: <b>{user.address.streetAddress}</b></p>
                <p>Город <b>{user.address.city} </b></p>
                <p>Провинция/штат <b>{user.address.state} </b></p>
                <p>Индекс <b>{user.address.zip} </b></p>
            </div>
        )
    }
}

export {UserDetails};

