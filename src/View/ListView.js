import React from 'react'
import { Paper, Divider, RaisedButton } from 'material-ui'


const style = {
    paper: {
        margin: '10px',
        padding: '10px'
    },
    container: {
        maxWidth: '600px',
        textAlign: 'center',
        padding: '10px'
    },
    innerBox: {
        width: '100%',
        margin: 'auto'
    },
    image: {
        width: '50%'
    },
    button: {
        padding: '2px',
        margin: 'auto',
        width: '50%'
    }
}

class ListView extends React.Component {
    state = {
        data: '',
        currentPage: 1,
        dataPerPage: 5,
    }

    componentDidMount() {
        fetch('https://randomuser.me/api?results=16')
            .then(response => response.json())
            .then(data => this.setState({
                data: data.results
            }))
    }


    getCurrentPageData = () => {
        const { data, currentPage, dataPerPage } = this.state
        const indexOfLastDataSetOnThePage = currentPage * dataPerPage
        const indexOfFirstDataSetOnThePage = indexOfLastDataSetOnThePage - dataPerPage
        return data.slice(indexOfFirstDataSetOnThePage, indexOfLastDataSetOnThePage)
    }

    prevPageClickHandler = () => (
        this.state.currentPage >= 2 ?
            this.setState({ currentPage: this.state.currentPage - 1 }) :
            null
    )
    nextPageClickHandler = () => (
        this.state.currentPage < Math.ceil(this.state.data.length / this.state.dataPerPage) ?
            this.setState({ currentPage: this.state.currentPage + 1 }) :
            null
    )

    render() {

        return (
            <Paper
                style={style.paper}
            >
                {
                    this.getCurrentPageData() ?
                        this.getCurrentPageData().map ?
                            this.getCurrentPageData().map(user => (
                                <div
                                    style={style.container}
                                    key={user.email}>
                                    <div
                                        style={style.innerBox}
                                    >
                                        <img style={style.image} src={user.picture.large} alt='user' />
                                        <div>{`${user.name.first} ${user.name.last} Age: ${user.dob.age}`}</div>
                                        <a href={user.email}>{user.email}</a>
                                        <div>{`Address: `}</div>
                                        <div>{`${user.location.street}, ${user.location.city} `} </div>
                                        <div>{`Phone: ${user.phone}`}</div>
                                        <Divider />
                                    </div>
                                </div>
                            ))
                            : 'Something went wrong !'
                        : 'Loading data ...'

                }
                {<div >
                    <RaisedButton
                        style={style.button}
                        label='Prev'
                        primary={true}
                        onClick={this.prevPageClickHandler} />
                    <div>{this.state.currentPage}</div>
                    <RaisedButton
                        style={style.button}
                        label='Next'
                        primary={true}
                        onClick={this.nextPageClickHandler}
                    />
                </div>}
            </Paper>
        )
    }
}

export default ListView