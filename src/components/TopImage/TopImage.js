import React, { Component } from 'react';
import './TopImage.css';
import { Parallax } from '../../../node_modules/react-scroll-parallax';

//generates a parallax image for the top of the page. pass a photo in as props.
class TopImage extends Component {

  render() {
    return (
      <Parallax 
      className="parallax"
      offsetYMax={0}
      offsetYMin={-100}
      slowerScrollRate
      tag="figure"
      >
        <img src={this.props.image} alt="" className="parallaxImage"/>
      </Parallax>
    );
  }
}

export default TopImage;
