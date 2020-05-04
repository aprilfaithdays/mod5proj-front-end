import React from 'react'
import Moment from 'react-moment';

const calendarStrings = {
    lastDay : '[Yesterday at] LT',
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    lastWeek : '[last] dddd [at] LT',
    nextWeek : 'dddd [at] LT',
    sameElse : 'L'
};

class Home extends React.Component {

    state = {
        logs: [],
        recent: {},
        workout: {},
    }

    componentDidMount() {
        fetch('http://localhost:3000/logs')
        .then(res => res.json())
        .then(list => this.setLogs(list))
    }

    setLogs = list => {
        const logs = list.filter( log => log.user_id === this.props.currentUser)
        const recent = logs[0]
        const workout = recent.workout
        this.setState({ logs, recent, workout})
    }

    pastWorkouts = () => {
        const list = this.state.logs.sort((a, b) => b.id - a.id)
        console.log(list)
        return list.map(log => {
            const dateToFormat = log.created_at
            return (
                <div>
                    <b>{log.workout.name}</b>
                    <br/> <Moment calendar={calendarStrings}>{dateToFormat}</Moment>
                    <br /> <br />
                </div>
            )
        })
    }
    
    render () {
        // console.log(this.state)
        const dateToFormat = this.state.recent.created_at
        return (
            <div>
                <div className="header">
                    <h2>Hi {this.props.userName}!</h2>
                </div>
                <div className="standard">
                    <p>
                        <br/>Completed Workouts: {this.state.logs.length}
                        <br/>Recently Completed: {this.state.workout.name}
                        <br/>On: <Moment calendar={calendarStrings}>{dateToFormat}</Moment>
                    </p>

                    <h3> <b>Previous Workouts</b>  </h3>
                    {this.pastWorkouts()}
                </div>

            </div>
        ) 
    }
}

export default Home