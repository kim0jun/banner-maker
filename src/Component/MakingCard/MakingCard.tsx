import * as React from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const fs = window.require('fs');
const Jimp = window.require('jimp');

import './style.css';
import ImageInfoView from '../ImageInfoView/ImageInfoView';
import SequencePlayer from '../SequencePlayer';

const APP_PATH = window.require('electron').remote.app.getAppPath();

fs.readdir(`${APP_PATH}/temp`, (fsErr: any, files: any) => {
  if (fsErr) throw fsErr;

  for (const file of files) {
    fs.unlink((`${APP_PATH}/temp/${file}`), (err: any) => {
      if (err) throw err;
    });
  }
});

interface MakingCardProps {
  sqDirPath: string;
  startZip: () => void;
  completeZip: (zipData: any) => void;
}

interface MakingCardState {
  isBanner: boolean;
  imageLength: number;
  imageWidth: number;
  imageHeight: number;
  size: number;
  zipValue: number;
}

class MakingCard extends React.Component<MakingCardProps, MakingCardState> {
  compImg: any;

  constructor(props: MakingCardProps) {
    super(props);
    this.state = {
      isBanner: false,
      imageLength : 0,
      imageWidth: 0,
      imageHeight: 0,
      size: 0,
      zipValue: 100
    };
  }

  componentDidMount() {
    this.makeBanner();
  }

  makeBanner = async () => {
    let imgArr = await this.getImgsFromDir(this.props.sqDirPath) as String[];
    this.makeImg(imgArr);
  }

  getImgsFromDir = (dirPath: string) => 
    new Promise((resolve, reject) => {
      fs.readdir( dirPath, (err: any, dir: string[]) => {
        if (err) reject();
        const imageArr = dir.filter(v => v.search(/\.jpg|\.png/gi) !== -1).filter(v => v !== 'result.jpg').map(v => dirPath + '/' + v);
        resolve(imageArr);
      });
    })

  makeImg = (imgArr: any) => {
    Jimp.read(imgArr[0], (err: any, image: any) => {
      if (err) console.error(err);
      let { width, height} = image.bitmap;
      this.setState({
        imageLength: imgArr.length,
        imageWidth: width,
        imageHeight: height
      });
      // tslint:disable-next-line:no-unused-expression
      new Jimp(width, height * imgArr.length, (makeArr: any, compImg: any) => {
        if (makeArr) console.error(makeArr);
        this.appendImg(compImg, imgArr, 0);
      });
    });
  }

  appendImg = (compImg: any , arr: string, i: number) => {
    Jimp.read(arr[i]).then(((img: any) => {
        compImg.composite(img, 0, i * img.bitmap.height);
        if (i < arr.length - 1)
            this.appendImg(compImg, arr, i + 1);
        else {
            let tempDir = `${APP_PATH}/temp/`;
            this.compImg = compImg;
            this.compImg
              .quality(100)
              .write(`${tempDir}result.jpg`, this.showBanner);
        }
    }));
  }

  showBanner = () => {
    fs.stat(`${APP_PATH}/temp/result.jpg`, (err: any, data: any) => {
      if (err) throw err;
      this.setState({
        isBanner: true,
        size: Math.floor(data.size / 1000)
      });
      console.log(data);
    });
  }

  handleSlide = (event: any, value: number) => {
    this.setState({zipValue: Math.round(value)});
  }

  handleTextField = (event: any, value: string) => {
    let newValue = Math.min(100, Math.max(0, Number(value.replace(/\D/gi, ''))));

    this.setState({zipValue: newValue });
  }

  startZip = () => {
    let {zipValue} = this.state;
    this.props.startZip();
    this.compImg
        .quality(zipValue)
        .write(`${APP_PATH}/temp/result_${zipValue}.jpg`, this.completeCompress);
  }

  completeCompress = () => {
    let {zipValue, imageWidth, imageHeight, imageLength} = this.state;
    fs.stat(`${APP_PATH}/temp/result_${zipValue}.jpg`, (err: any, data: any) => {
      if (err) throw err;
      this.props.completeZip({
        path: `${APP_PATH}/temp/result_${zipValue}.jpg`,
        width: imageWidth,
        height: imageHeight,
        size: Math.floor(data.size / 1000),
        frameLength: imageLength
      });
    });
  }

  render() {
    const {isBanner, imageLength, imageHeight, imageWidth, size} = this.state;

    return (
      <Card className="card making-card">
        <CardHeader
          title="2. 배너 제작"
          subtitle={isBanner ? '제작 완료' : '배너제작중 입니다.'}
          actAsExpander={true}
          showExpandableButton={false}
        />
        
        {
          isBanner ?
            <div className="banner-wrapper">
              <SequencePlayer imgSrc={`file://${APP_PATH}/temp/result.jpg`} width={imageWidth} height={imageHeight} length={imageLength}/> 
              <ImageInfoView sqLength={imageLength} imageSize={size} />
              <CardHeader
                subtitle="이미지 압축"
                actAsExpander={true}
                showExpandableButton={false}
                style={{paddingLeft: 0}}
              />
              <div className="slider-wrapper">
                <Slider value={this.state.zipValue} min={0} max={100} onChange={this.handleSlide} style={{width: 300}}/>
              </div>
              <TextField
                className="text-field"
                style={{width: '150px', verticalAlign: 'top'}}
                textareaStyle={{textAlign: 'center'}}
                value={this.state.zipValue}
                onChange={this.handleTextField}
              />
              <RaisedButton label="⌵ 압축하기" onClick={this.startZip} primary={true} fullWidth={false}  />
              
            </div> :
            <div className="loading">
                      <CircularProgress size={80} thickness={5} />
            </div>
        }
      </Card>
    );
  }
}

export default MakingCard;
