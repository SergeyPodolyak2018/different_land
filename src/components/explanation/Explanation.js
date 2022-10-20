import React, { Component } from 'react';
import styles from './Explanation.module.css';
import { withNamespaces } from 'react-i18next';

class Explanation extends Component {
    constructor(props) {
        super(props);
        this.state = {};


    }

    componentDidMount() {

    }

    componentWillUnmount(){

    }

    getTextForBlock(blockNumber){
        if(blockNumber===1){
            switch (this.props.mode) {
                case 'desktop':
                    return<span className={styles.mainText1}>
                        {this.props.t(this.props.content['block'+blockNumber].mainText)+' '+ this.props.t(this.props.content['block'+blockNumber].subtext)}
                    </span>;
                default:
                    return<>
                        <span className={styles.mainText1}>{this.props.t(this.props.content['block'+blockNumber].mainText)}</span>
                        <span className={styles.subText1}>{this.props.t(this.props.content['block'+blockNumber].subtext)}</span>
                    </>
            }
        }
        if(blockNumber===2){
            return<>
                    <span className={styles.mainText2}>{this.props.t(this.props.content['block'+blockNumber].mainText)}</span>
                    <span className={styles.subText2}>{this.props.t(this.props.content['block'+blockNumber].subtext)}</span>
                </>


        }
    }

    getPictureForBlock(blockNumber){
        // alt={this.props.t(img.alt)}
        const alt = this.props.content['block'+blockNumber].img.alt;

        if(blockNumber===1){
            switch (this.props.mode) {
                case 'desktop':
                    return <img className={styles.picture1} src={this.props.content['block'+blockNumber].img[this.props.mode]} alt={this.props.t(alt)}/>
                default:
                    return<>
                        <img className={styles.picture1} src={this.props.content['block'+blockNumber].img[this.props.mode]} alt={this.props.t(alt)}/>
                    </>;
            }
        }
        if(blockNumber===2){
            return<>
                <img className={styles.picture2} src={this.props.content['block'+blockNumber].img[this.props.mode]} alt={this.props.t(alt)}/>
            </>


        }
    }



    render(){

        return <div className={styles.wrapper}>
            <div className={styles.block1}>
                <div className={styles.block1_wrapper}>
                    {this.getTextForBlock(1)}
                    {this.getPictureForBlock(1)}
                </div>

            </div>
            <div className={styles.block2}>
                <div className={styles.block2_wrapper}>
                    {this.getTextForBlock(2)}
                    {this.getPictureForBlock(2)}
                </div>

            </div>
        </div>
    }
}

export default withNamespaces()(Explanation);
