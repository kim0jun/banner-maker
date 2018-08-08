declare global {
  interface Window { require: any; }
}

import * as React from 'react';
import Header from '../../Component/Header';
import InputCard from '../../Component/InputCard';
import MakingCard from '../../Component/MakingCard';

// style
import './App.css';

interface AppState {
  dirPath?: string;
}

class App extends React.Component<any, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      dirPath: '/Users/jun/Downloads/sequence_0731'
    };
  }

  public changeDirectory = (path: string) => {
    this.setState(() => ({
      dirPath: path
    }));
  }

  public render() {
    return (
      <div className="App">
        <Header/>
        <section className="App-body">
          <InputCard changeDirectory={this.changeDirectory} />
          {
            this.state.dirPath ? 
              <MakingCard sqDirPath={this.state.dirPath} /> :
              undefined
          }
        </section>
      </div>
    );
  }
}

export default App;
