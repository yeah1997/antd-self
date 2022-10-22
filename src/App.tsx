import React from 'react';
import './styles/index.scss'
import Button, { ButtonType, ButtonSize} from './components/Button/button';

function App() {

  return (
    <div className="App">
      <h1>learn react</h1>
      <Button autoFocus>hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>hello</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Large}>Default</Button>
    </div>
  );
}

export default App;
