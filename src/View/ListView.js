import React from 'react'
import '../styles/listView.css'
import { TextField } from 'material-ui'
import { unifyString } from '../utils/unifyString'

const NUMBER_OF_USERS_TO_BE_FETCHED = 50

class ListView extends React.Component {
    state = {
        data: '',
        currentPage: 1,
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
        this.setState({ searchedText: event.target.value })
    }

    getCurrentPageData = () => {
        
        const { data, currentPage, dataPerPage } = this.state
        const indexOfLastDataSetOnThePage = currentPage * dataPerPage
        const indexOfFirstDataSetOnThePage = indexOfLastDataSetOnThePage - dataPerPage

        const filteredData = data ?
            data.filter(user => (
                unifyString(user.name.last)
                    .includes(unifyString(this.state.searchedText))
            ))
            : data;
        return filteredData.slice(indexOfFirstDataSetOnThePage, indexOfLastDataSetOnThePage)
    }

    prevPageClickHandler = () => {
        if (this.state.currentPage >= 2) {
            this.props.history.push(`/list/${this.state.currentPage - 1}`)
            this.setState({ currentPage: this.state.currentPage - 1 })
        }
    }
    nextPageClickHandler = () => {
        if (this.state.currentPage < Math.ceil(this.state.data.length / this.state.dataPerPage)) {
            this.props.history.push(`/list/${this.state.currentPage + 1}`)
            this.setState({ currentPage: this.state.currentPage + 1 })
        }
    }

    render() {
        return (
            <div className='main-container'
            >
                <div
                    className='main-container__nav-button'
                    onClick={this.prevPageClickHandler}
                ></div>
                {
                    <div className='inner-data-container'>
                        <div
                            className='inner-data-container__currentPage-header'

                        >{`Page: ${this.state.currentPage}`}
                        </div>
                        <TextField
                            floatingLabelText="Search user by last name"
                            onChange={this.onSearchedTextChangeHandler}
                            fullWidth={true}
                        />
                        <br></br>
                        {
                            this.getCurrentPageData() ?
                                this.getCurrentPageData().map ?
                                    this.getCurrentPageData()
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
                                    :<strong style={{fontSize: '20px'}}>'Something went wrong !'</strong>
                                : <strong style={{fontSize: '20px'}}>'Loading data ...'</strong>
                        }
                    </div>
                }
                <div
                    className='main-container__nav-button'
                    onClick={this.nextPageClickHandler}
                ></div>
            </div>
        )
    }
}

export default ListView