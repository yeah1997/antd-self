import React from 'react';

import './styles/index.scss'
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem'

function App() {

  return (
    <div className="App">
      <h1>learn react</h1>
      <Button autoFocus>hello</Button>
      <Button btnType='primary' size='lg'>hello</Button>
      <Button btnType='default' size='sm'>Default</Button>
      
      <hr />

      <Menu defaultIndex={0} mode='vertical' onSelect={(index)=> {console.log(index)}} >
        <MenuItem index={0} disabled={true}>
          123
        </MenuItem>
        <MenuItem index={1}>
          456
        </MenuItem>
        <MenuItem index={3}>
          456
        </MenuItem>
      </Menu>
    </div>
  );
}

export default App;
