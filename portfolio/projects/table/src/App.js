import React, {Component} from 'react';
import memoize from 'memoize-one';
import {DataGrid} from './components/DataGrid.js';
import {UserDetails} from './components/UserDetails.js';
import {ChangeData} from "./components/ChangeData";
import load from './utils/load';


// импортируем данные для загрузки
const DATA_URL1 = 'http://www.filltext.com/?rows=32&id={number|10000000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
const DATA_URL2 = 'http://www.filltext.com/?rows=1000&id={number|100000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';


// Файлы для тестирование оффлайн
// const DATA_URL1 = './data/packageSmall.json';
// const DATA_URL2 = './data/packageBig.json';



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeUser: null,
            columns: [],
            url: DATA_URL1,
            users: [],
        };

        this.loadData();
    }


    loadData(url) {
        //Загружаем данные по ссылке
        if(!url){
            //Если ссылку не передали, берем ссылку из свойств
            url=this.state.url;
        }
        //Включаем индикатор загрузки
        document.querySelector("body").setAttribute('class','load');
        // Загружаем данные
        return load(url).then(response => {
            const users = JSON.parse(response);
            const columns = [
                {key: 'id', label: 'Id', formatter: row => row.id},
                {key: 'firstName', label: 'First name', formatter: row => row.firstName},
                {key: 'lastName', label: 'Last name', formatter: row => row.lastName},
                {key: 'email', label: 'E-mail', formatter: row => row.email},
                {key: 'phone', label: 'Phone', formatter: row => row.phone},
                {
                    key: 'address',
                    label: 'Address',
                    formatter: row => row.address.state + ', ' +
                        row.address.city + ', ' +
                        row.address.streetAddress + ', ' +
                        row.address.zip
                },
                {key: 'description', label: 'Description', formatter: row => row.description},
            ];

            this.setState({
                users: users,
                columns: columns,
            });
            // Выкоючаем индикатор загрузки
            document.querySelector("body").setAttribute('class','');

        });
    }

    _onSearchFieldInput(e) {
        //Устанавливаем искомую строку
        this.setState({
            searchString: e.currentTarget.value
        });
    }

    _onActiveUserChanged(newUser){
        //Устанавливаем выбранную строку
        this.setState({
            activeUser: newUser,
        });
    }

    _onDataChange(){
        //Выбираем другой набор данных и подгружаем его
        if (this.state.url===DATA_URL1){
            this.setState({
                url: DATA_URL2,
            });
            this.loadData(DATA_URL2);

        }else{
            this.setState({
                url: DATA_URL1,
            });
            this.loadData(DATA_URL1);

        }
    }

    render() {
        const userDetails = this.state.activeUser ?
            <UserDetails user={this.state.activeUser}/> :
            'Выберите пользователя';
        return (
            <div className="App">
                <p>Гукетлева Дарья. Таблица на React</p>
                <label>
                    Поиск
                    <input type="text" name='Поиск' onInput={e => this._onSearchFieldInput(e)}/>
                </label>
                <ChangeData onDataChange={e=> this._onDataChange(e)}></ChangeData>
                <DataGrid data={this.state.users}
                          searchString={this.state.searchString}
                          columns={this.state.columns}
                          onActiveRowChanged={user=>this._onActiveUserChanged(user)}/>
                {userDetails}
            </div>
        );
    }
}

export default App;
