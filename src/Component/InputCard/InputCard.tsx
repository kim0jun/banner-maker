import * as React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { red400 } from 'material-ui/styles/colors';

export interface InputCardProps {
  changeDirectory: (path: string) => void;
}

class InputCard extends React.Component<InputCardProps, any> {
  dirInput: HTMLInputElement;

  componentDidMount() {
    this.dirInput.setAttribute('directory', '');
    this.dirInput.setAttribute('webkitdirectory', '');
  }

  trigInput = () => {
    this.dirInput.click();
  }

  onChangeDir = () => {
    if (this.dirInput.files && this.dirInput.files[0])
      this.props.changeDirectory(this.dirInput.files[0].path);
  }

  render() {
    return (
      <Card className="card">
        <input 
          type="file" 
          multiple={true} 
          ref={ref => this.dirInput = ref!} 
          onChange={this.onChangeDir}
          style={{display: 'none'}}
        />
        <CardHeader
          title="1. 폴더 선택"
          subtitle="시퀀스가 들어있는 폴더를 선택 해 주세요."
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions >
          <RaisedButton label="폴더 선택하기" primary={true} fullWidth={true} onClick={this.trigInput} />
        </CardActions>
        <CardText expandable={true} color={red400}>
          * 이미지 확장자는 jpg 또는 png만 인식 가능합니다.
        </CardText>
      </Card>
    );
  }
}

export default InputCard;
