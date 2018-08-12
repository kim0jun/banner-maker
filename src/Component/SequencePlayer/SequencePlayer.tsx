import * as React from 'react';

import './style.css';

export interface SequencePlayerProps {
  imgSrc: string;
  length: number;
  width: number;
  height: number;
}

export interface SequencePlayerState {
  idx: number;
}

export default class SequencePlayer extends React.Component<SequencePlayerProps, any> {
  isPlaying: boolean = false;

  constructor(props: SequencePlayerProps) {
    super(props);

    this.state = {
      idx: 0
    };
  }

  private onLoadImg = () => {
    this.startSequencing();
  }

  private startSequencing = () => {
    this.setState(() => ({
      idx: 0
    }));

    if (!this.isPlaying) setTimeout( this.updateFrame, 50);
    this.isPlaying = true;
  }

  private updateFrame = () => {
    this.setState((prevState: SequencePlayerState) => ({
      idx: (prevState.idx + 1) % this.props.length
    }));

    setTimeout( this.updateFrame, 50);
  }

  render() {
    const {width, height, imgSrc} = this.props;
    const {idx} = this.state;
    return (
      <div className="squence-player" style={{width: `${width}px`, height: `${height}px`}}>
        <img className="squecne-img" style={{top: `${-idx * height}px`}} onLoad={this.onLoadImg} src={imgSrc}/>
      </div>
    );
  }
}
