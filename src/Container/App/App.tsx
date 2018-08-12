declare global {
  interface Window { require: any; }
}

import * as React from 'react';
const fs = window.require('fs');

import Header from '../../Component/Header';
import InputCard from '../../Component/InputCard';
import MakingCard from '../../Component/MakingCard';
import ZipCard from '../../Component/ZipCard/ZipCard';

// style
import './App.css';

interface AppState {
  stapIdx: number;
  dirPath?: string;
  compressedImg?: {
    path: string;
    width: number;
    height: number;
    size: number;
    frameLength: number;
  };
}

class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      stapIdx: 0,
      dirPath: undefined
    };
  }

  componentDidMount() {
    this.clearTempDir();
  }

  clearTempDir = () => {
    const APP_PATH = window.require('electron').remote.app.getAppPath();

    fs.readdir(`${APP_PATH}/temp`, (fsErr: any, files: any) => {
      if (fsErr) throw fsErr;

      for (const file of files) {
        fs.unlink((`${APP_PATH}/temp/${file}`), (err: any) => {
          if (err) throw err;
        });
      }
    });
  }

  public changeDirectory = (path: string) => {
    this.setState(() => ({
      stapIdx: 1,
      dirPath: path
    }));
  }

  public startZip = () => {
    this.setState(() => ({
      stapIdx: 2
    }));
  }

  public completeZip = (compressedImg: any) => {
    this.setState({
      compressedImg
    });
  }

  public render() {
    return (
      <div className="App">
        <Header/>
        <section className="App-body">
          <InputCard changeDirectory={this.changeDirectory} />
          {
            this.state.dirPath ? 
              <MakingCard sqDirPath={this.state.dirPath}  startZip={this.startZip} completeZip={this.completeZip}/> :
              undefined
          }
          {
            this.state.stapIdx >= 2 ? 
              <ZipCard compressedImg={this.state.compressedImg} /> :
              undefined
          }
        </section>
      </div>
    );
  }
}

export default App;
