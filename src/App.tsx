import React from 'react';

import './styles/index.scss'
// import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/SubMenu';
import Icon from './components/Icon/icon';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

// 加载所有的标签
library.add(fas)

function App() {

  return (
    <div className="App">
      <h1>learn react</h1>
      <Icon icon="coffee" theme='danger' size='10x'></Icon>
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
