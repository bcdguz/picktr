import React from 'react';

import PhotoIndexItem from './photo_index_item';


class PhotoIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false, reduced: [] };
        this.loadedList = 0;
        this.handleLoading = this.handleLoading.bind(this);
        this.interval;
    }

    componentDidMount() {
        this.props.fetchAllUsers();
        this.props.fetchAllPhotos()
            .then(res => {
                this.setState({reduced: this.props.photos.slice(0,5)})
            })
        // let loadedCheck = () => {
        //     if (this.props.photos.length <= this.loadedList) {
        //         this.setState({ loaded: true });
        //         clearInterval(this.interval);
        //     }
        // };
        const check = this.loadedCheck.bind(this);
        this.interval = setInterval(() => { check() }, 1000);
    }

    componentWillUnmount() {
        //Fixes bug where user navigates away from page before setInterval
        //has been cleared
        clearInterval(this.interval);
    }
    
    handleLoading() {
        this.loadedList++;
    }

    loadedCheck () {
        if (5 <= this.loadedList) {
            this.setState({ loaded: true });
            clearInterval(this.interval);
        }
        setTimeout(() => {
            this.setState({reduced: this.props.photos})
        }, 3000)
    }

    render() {
        let content;
        const photos = this.state.reduced;
        const propLength = this.props.photos.length;
        const loadAmount = propLength < 5 ? propLength : 5;
        if (loadAmount <= this.loadedList) {
            
            content = photos.map((photo) => {
                return (
                    <PhotoIndexItem
                        key={photo.id}
                        photo={photo}
                        user={this.props.users[photo.userId]}
                        loading={this.handleLoading}/>
                )
            })
        } else {
            
            content = <div className="loader" >
                        <div className="secret-load">
                            {photos.map((photo) => {
                                return (
                                    <PhotoIndexItem
                                        key={photo.id}
                                        photo={photo}
                                        user={this.props.users[photo.userId]}
                                        loading={this.handleLoading} />
                                )
                            })}
                        </div>
                    </div>
        }
        
        return(
            <>
                <ul className="photo-index">
                    {content}
                </ul>
            </>
        )
    }
}

export default PhotoIndex;