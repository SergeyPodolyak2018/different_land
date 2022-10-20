import React, { Component } from 'react';

import styles from './Galery.module.css';



class Galery extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.state = {
            active: 0
        };

    }
    next() {
        let newActiv;
        if (this.state.active===this.props.photoList.length-1){
            newActiv=0;
        }else{
            newActiv=this.state.active+1;
        }
        this.setState(
            {active: newActiv}
        );
    }
    previous() {
        let newActiv;
        if (this.state.active===0){
            newActiv=this.props.photoList.length-1;
        }else{
            newActiv=this.state.active-1;
        }
        this.setState(
             {active: newActiv}
        );
    }
    getNewArrey(){
        let firstindex=this.state.active===this.props.photoList.length-1? 0: this.state.active+1;
        let lastIndex=firstindex+2;
        if(firstindex === this.props.photoList.length-1){
            firstindex=0;
            lastIndex = firstindex+2;
        }
        return this.props.photoList.slice(firstindex,lastIndex).reverse()
    }
    content(item,key){
        let opacity=0;
        if(key===this.state.active){
            opacity=1;
        }
        return <div key={key} className={styles.big_picture} style={{backgroundImage: `url(${item.img})`,opacity:opacity}} ></div>
    }

    contentSmall(item,key){
        return <div key={key} className={styles.small_picture} style={{backgroundImage: `url(${item.img})`}} ></div>
    }

    render() {
        let smalSlider = this.getNewArrey();
        return (
            <div className={styles.slider_container}>
                <div className={styles.slider_wrapper}>
                    {this.props.photoList.map((item,key)=>
                    { return this.content(item,key);

                    })}
                </div>
                <div className={styles.arrows_container}>
                    <div className={styles.arrows_container_counter}>
                        {this.state.active+1}/{this.props.photoList.length}
                    </div>
                    <div className={styles.arrows_container_buttons}>
                        <svg width="96" height="33" viewBox="0 0 96 33" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={this.previous}>
                            <path d="M95.7197 16.9559H0.719727M0.719727 16.9559L16.7952 1M0.719727 16.9559L16.7952 32" stroke="black" strokeOpacity="0.6"/>
                        </svg>

                        <svg width="96" height="33" viewBox="0 0 96 33" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={this.next}>
                            <path d="M0.712891 16.9559H94.7129M94.7129 16.9559L78.3926 1M94.7129 16.9559L78.3926 32" stroke="black" strokeOpacity="0.6"/>
                        </svg>
                    </div>
                </div>
                <div className={styles.explanation_container}>
                    <div className={styles.explanation_container_content}>{this.props.photoList[this.state.active].explain}</div>
                </div>

                <div className={styles.slider_wrapper_small}>
                    {smalSlider.map((item,key)=>
                    { return this.contentSmall(item,key);

                    })}
                </div>



            </div>
        );
    }
}
export default Galery;
