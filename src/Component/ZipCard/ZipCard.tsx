import * as React from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

// const fs = window.require('fs');

import ImageInfoView from '../ImageInfoView/ImageInfoView';
import SequencePlayer from '../SequencePlayer';

import './style.css';

interface ZipCardProps {
	compressedImg?: {
		path: string;
    width: number;
		height: number;
		size: number;
		frameLength: number;
		
	};
}

interface ZipCardState {
	zipData: {
		path: string;

	};
}

class ZipCard extends React.Component<ZipCardProps, ZipCardState> {
	compImg: any;

	constructor(props: ZipCardProps) {
		super(props);
	}

	exportImage = () => {
		var link = document.createElement('a');
		link.download = 'result.jpg';
		link.href = `file://${this.props.compressedImg!.path}`;
		link.click();
	}

	render() {
		const  { compressedImg } = this.props;

		return (
			<Card className="card zip-card">
				<CardHeader
					title="3. 압축"
					subtitle={compressedImg ? '압축 완료' : '압축중 입니다.'}
					actAsExpander={true}
					showExpandableButton={false}
				/>

				{
					compressedImg ?
						<div className="banner-wrapper">
							<SequencePlayer imgSrc={`file://${compressedImg.path}`} width={compressedImg.width} height={compressedImg.height} length={compressedImg.frameLength}/>
							<ImageInfoView sqLength={compressedImg.frameLength} imageSize={compressedImg.size} />
							<RaisedButton label="EXPORT" primary={true} fullWidth={true} onClick={this.exportImage}  />
						</div> :
						<div className="loading">
											<CircularProgress size={80} thickness={5} />
						</div>
				}
			</Card>
		);
	}
}

export default ZipCard;
