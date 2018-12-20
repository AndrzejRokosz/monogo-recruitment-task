import React from 'react'
import { Paper, Divider } from 'material-ui'


const style = {
    paper: {
        margin: '10px',
        padding: '20px'
    },
    container: {
        display: 'flex',
        textAlign: 'centre',
        padding: '10px'
    },
    innerBox: {
        width: '100%',
        margin: 'auto'
    },
    image: {
        width: '50%'
    }
}

class ListView extends React.Component {
    state = {
        data: '',
        activePage: 5
    }

    componentDidMount() {
        fetch('https://randomuser.me/api?results=50')
            .then(response => response.json())
            .then(data => this.setState({
                data: data.results
            }))
    }

    render() {
        return (
            <Paper
                style={style.paper}
            >
                {this.state.data ?
                    this.state.data.map ?
                        this.state.data.map(user => (
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
     
            </Paper>
        )
    }
}

export default ListView