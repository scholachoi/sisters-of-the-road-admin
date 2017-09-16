import React, { Component } from 'react';



class SearchPage extends Component {
    constructor () {
        super();
        this.state = {
            accounts: [],
            searchQuery: ''
        };
    }

    onSearchChange (value) {
        this.setState({searchQuery: value});
    }

    searchAccounts () {
        axios.get('/account/search?q=' + this.state.searchQuery).then((response) => {
            let accounts = [];
            response.data.forEach((account, index) => {
                accounts.push({
                    name: account.name,
                    id: account.account_id,
                    lastCredit: account.last_add,
                    lastMeal: account.last_subtract,
                    currentCredit: Number(account.balance)
                });
            });
            this.setState({accounts: accounts});
        });
    }

    render () {
        const {
            accounts,
            searchQuery
        } = this.state;
        return (
            <div className="SearchPage">
                <header>
                    <h1 className="text-center">Sisters of the Road Cafe</h1>
                </header>
                <div id="seachbar">
                    <input className="input-lg center-block"
                           type="text"
                           placeholder="Search for patron"
                           onChange={(event) => this.onSearchChange(event.target.value)}/>
                    
                </div>
                <div className="row">
                    <button className="btn btn-info col-sm-offset-5 center-block"
                            onClick={() => this.searchAccounts(searchQuery)}>
                        Search
                    </button>
                </div>
                <div className="row">
                {accounts.map((account) =>
                    <div id="result" className="jumbotron row text-center center-block"
                         onClick={() => this.props.switchView('accountpage', account)}
                         key={account.id}>
                        <p>
                            {account.name}
                            <span>Last credit: {account.lastCredit}</span>
                            <span>Last purchase: {account.lastMeal}</span>
                        </p>
                    </div>
                )}
                </div>
            </div>
         );
    }
}

export default SearchPage;
