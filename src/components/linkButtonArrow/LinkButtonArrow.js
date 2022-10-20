import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { Link,withRouter } from "react-router-dom";
import getLng from "../../utils/getLanguage";
import "./ArrowAnim.scss";

class LinkButtonArrow extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Link
        className={`animated_arrow ${this.props.wrapperStyle || ''}`}
        // style={{this.props.wrapperStyle}}
         to={''}
        onClick={(e) => {
          e.preventDefault();
          setTimeout(() => {
            this.props.history.push(this.props.t(this.props.link)+'?lng='+getLng());
          }, 500);
        }}
      >
        <span className="the-arrow -left">
          <span className="shaft"></span>
        </span>
        <span className="main">
          <span className={"text"}>{this.props.t(this.props.linkText)}</span>
          <span className="the-arrow -right">
            <span className="shaft"></span>
          </span>
        </span>
      </Link>
    );
  }
}

export default withRouter(withNamespaces()(LinkButtonArrow));
