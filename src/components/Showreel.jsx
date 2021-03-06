import React, { Component } from "react";
import { connect } from "react-redux";
import { Player, BigPlayButton, ControlBar } from "video-react";

import { hideShowreel } from "../actions/showreelActions";

import { CloseButton } from "./";

class Showreel extends Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
    this.handleCloseShowreel = this.handleCloseShowreel.bind(this);
  }

  handleCloseShowreel(e) {
    e.preventDefault();
    this.props.hideShowreel();
  }

  componentDidUpdate(prevProps) {
    if (this.props.showreelOn !== prevProps.showreelOn) {
      if (!this.props.showreelOn) {
        this.player.current.load();
      }
    }
  }

  render() {
    return (
      <div className={`Showreel${this.props.showreelOn ? " is-active" : ""}`}>
        <div className="CloseButton-container">
          <CloseButton
            className="CloseButton--showreel"
            action={this.handleCloseShowreel}
          />
        </div>
        <div className="ShowreelVideo">
          <Player
            fluid={false}
            height="100%"
            width="100%"
            playsInline
            ref={this.player}
            src={this.props.showreel_url}
            videoId="showreel"
          >
            <BigPlayButton position="center" />
            <ControlBar autoHideTime={1500} />
          </Player>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  showreelOn: state.showreel.showreelOn,
  showreel_url: state.aboutPage.aboutInfo.showreel_url,
});

const mapDispatchToProps = (dispatch) => ({
  hideShowreel: () => {
    return dispatch(hideShowreel());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Showreel);
