import React from 'react';

import './styles/index.scss'
// import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem'

import SubMenu from './components/Menu/SubMenu';

function App() {

  return (
    <div className="App">
      <h1>learn react</h1>

      <Menu defaultIndex={'0'} mode="vertical" onSelect={(index) => {alert(index)}}>
        <MenuItem disabled={true}>
          123
        </MenuItem>

        <SubMenu title='dropdown'>
          <MenuItem>
            456
          </MenuItem>
          <MenuItem>
            789
          </MenuItem>
        </SubMenu>
        
        <MenuItem>
          111
        </MenuItem>
      </Menu>
    </div>
  );
}

export default App;
