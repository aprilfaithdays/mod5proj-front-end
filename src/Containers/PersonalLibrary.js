import React from 'react'
import ContentPage from '../Components/ContentPage'


class PersonalLibrary extends React.Component{

    displaymyWorkouts = () => {
        const myList = this.props.myWorkouts.filter(list => list.user_id === this.props.currentUser)
        return myList.map(personal => {
            if (this.props.removedWorkout.includes(personal.id)){
                return
            } else {
                return(
                    <div>
                        <ContentPage 
                            key={personal.id} 
                            personal={true} 
                            plid={personal.id} 
                            workout={personal.workout} 
                            handleRemove={this.props.handleRemove}
                        />
                    </div>
                ) 
            }
        })
    }

    filterFeatures = () => {
        return (
            <div className="filterFeatures">
                <form>
                    <input className="search" type="text" name="search" placeholder="Search.."/>
                </form>
                <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort By
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button className="dropdown-item" type="button">Duration</button>
                    <button className="dropdown-item" type="button">Recently Added</button>
                    <button className="dropdown-item" type="button">Frequently Used</button>
                </div>
                </div>
            </div>
        )
    }

    render() {
        // console.log("inside PersonalLibrary - myWorkouts", this.props.myWorkouts)
        return (
            <div className="card-body">
                <div className="standard">
                    <h2>My Workouts</h2>
                    {this.filterFeatures()}
                    {this.displaymyWorkouts()}
                </div>
            </div>
        )
    }
}

export default PersonalLibrary