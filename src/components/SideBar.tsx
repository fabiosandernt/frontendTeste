import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { SettingOutlined, ToolOutlined, AppstoreOutlined } from '@ant-design/icons';

const SideBar: React.FC = () => {
  return (
    <Menu
      mode="inline"
      //style={{ width: 256, height: '100vh', backgroundColor: '#1C3A57', color: 'white', position: 'fixed' }}
      theme="dark"
    >
      <Menu.SubMenu key="admin" icon={<ToolOutlined />} title="Administração">
        <Menu.Item key="log-auditoria">
          <Link to="/extracao-log-auditoria">Extração Log Auditoria</Link>
        </Menu.Item>
        <Menu.Item key="log-notificacao">
          <Link to="/log-notificacao">Log Notificação</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="config" icon={<SettingOutlined />} title="Configuração">
        <Menu.Item key="insumos">
          <Link to="/insumos">Insumos</Link>
        </Menu.Item>
        <Menu.Item key="gabarito">
          <Link to="/gabarito">Gabarito</Link>
        </Menu.Item>
        <Menu.Item key="pmo">
          <Link to="/pmo">PMO</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="estudo" icon={<AppstoreOutlined />} title="Estudo">
        <Menu.Item key="informar-dados">
          <Link to="/informar-dados">Informar Dados</Link>
        </Menu.Item>
        <Menu.Item key="monitorar-estudo">
          <Link to="/monitorar-estudo">Monitorar Estudo</Link>
        </Menu.Item>
        <Menu.Item key="convergir-pld">
          <Link to="/convergir-pld">Convergir PLD</Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default SideBar;
