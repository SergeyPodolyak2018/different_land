import React, { Component } from 'react';
import styles from './EventsCardContainer.module.css';
import { withNamespaces } from 'react-i18next';
import EventsCard from "../eventsCard/EventsCard.js";


class EventsCardContainer extends Component {
    componentDidMount() {

    }

    componentWillUnmount(){

    }

    getCards(item,key){
        return <React.Fragment key={key}><EventsCard  mode={this.props.mode} content={item}/>
        {key+1<this.props.content.length?<div className={styles.delimeter}></div>:''}
        </React.Fragment>
    }

    render(){
        return<div className={styles.wrapper}>
            {this.props.content.map((item,key)=> {
                return this.getCards(item,key);
            })}
        </div>;
    }
}

export default withNamespaces()(EventsCardContainer);
