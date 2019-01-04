import React from 'react';
import { TextField } from 'material-ui';

import { unifyString } from '../utils/unifyString';
import back from '../images/back.svg';
import next from '../images/next.svg';
import '../styles/listView.css';

const NUMBER_OF_USERS_TO_BE_FETCHED = 50;

class ListView extends React.Component {
    state = {
        data: [],
        currentPage: Number(this.props.match.params.userId) || 1,
        dataPerPage: 5,
        searchedText: ''
    }

    componentDidMount() {
        fetch(`https://randomuser.me/api?results=${NUMBER_OF_USERS_TO_BE_FETCHED}`)
            .then(response => response.json())
            .then(data => this.setState({
                data: data.results
            }))
    }

    onSearchedTextChangeHandler = (event) => {
        this.setState({ searchedText: event.target.value });
        this.setState({ currentPage: 1 })
    }

    prevPageClickHandler = () => {
        if (this.state.currentPage >= 2) {
            this.props.history.push(`/list/${this.state.currentPage - 1}`);
            this.setState({ currentPage: this.state.currentPage - 1 });
        }
    }
    nextPageClickHandler = (filteredDataArraySize) => {
        if (this.state.currentPage < Math.ceil(filteredDataArraySize / this.state.dataPerPage)) {
            this.props.history.push(`/list/${this.state.currentPage + 1}`);
            this.setState({ currentPage: this.state.currentPage + 1 });
        }
    }

    filterData = () => (
        this.state.data
            .filter(user =>
                unifyString(user.name.last)
                    .includes(unifyString(this.state.searchedText))
                ||
                unifyString(user.name.first)
                    .includes(unifyString(this.state.searchedText)))
    )

    render() {

        let filteredDataArraySize = 0;
        const filteredDataArray = this.filterData();
        filteredDataArraySize = filteredDataArray.length;

        return (
            <div className='main-container'
            >
                <div
                    className='main-container__nav-button'
                    onClick={this.prevPageClickHandler}
                >
                    <img className='main-container__nav-icon' src={back} alt='back' />
                </div>
                {
                    <div className='inner-data-container'>
                        <div
                            className='inner-data-container__currentPage-header'
                        >
                            {this.state.data.length === 0 ?
                                `Loading data ...` :
                                (
                                    filteredDataArraySize === 0 ?
                                        `No matching records` :
                                        `Page: ${this.state.currentPage} of ${Math.ceil(filteredDataArraySize / this.state.dataPerPage)}`
                                )
                            }
                        </div>
                        <TextField
                            floatingLabelText="Search by first or last name"
                            onChange={this.onSearchedTextChangeHandler}
                            fullWidth={true}
                        />
                        <br></br>
                        {
                            filteredDataArray
                                .filter((u, index) => (
                                    (this.state.currentPage * this.state.dataPerPage) - this.state.dataPerPage <= index &&
                                    index < (this.state.currentPage * this.state.dataPerPage)
                                ))
                                .map(user => (
                                    <div
                                        className='single-user-container'
                                        key={user.email}
                                    >
                                        <img className='user-container__image' src={user.picture.large} alt='user' />
                                        <div>{`${user.name.last} ${user.name.first}  Age: ${user.dob.age}`}</div>
                                        <a className='user-container__email' href={user.email}>{user.email}</a>
                                        <div>{`Address: `}</div>
                                        <div>{`${user.location.street}, ${user.location.city} `} </div>
                                        <div>{`Phone: ${user.phone}`}</div>
                                    </div>
                                ))
                        }
                    </div>
                }
                <div
                    className='main-container__nav-button'
                    onClick={() => this.nextPageClickHandler(filteredDataArraySize)}
                >
                    <img className='main-container__nav-icon' src={next} alt='back' />
                </div>
            </div>
        )
    }
}
export default ListView;