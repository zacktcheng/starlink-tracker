import React from 'react';
import { Layout } from 'antd';
import Title from "antd/lib/typography/Title";
import satelliteLogo from './images/satellite-1.svg';
import Main from './components/Main';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <>
      <Header 
        style={{ 
          minHeight: 50,
          background: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img className="header-logo" src={satelliteLogo} alt="logo"></img>
        <Title level={4} style={{ textAlign: 'center', color: '#eefbfb', position: 'relative', top: '0.25rem' }}>Track Satellites in &#119987; Minutes</Title>
        <img id="header-logo-right" className="header-logo" src={satelliteLogo} alt="logo"></img>
      </Header>
      <Content>
        <Main />
      </Content>
      <Footer 
        style={{ 
          minHeight: 50,
          display: 'flex',
          justifyContent: 'center',
          background: 'none'
        }}
      >
        <span className="gmail"><i className="fa fa-envelope"></i> zacktcheng@gmail.com</span>
        <a href="https://github.com/zacktcheng" target="_blank" rel="noreferrer"><i className="fa fa-github"></i></a>
        <a href="https://www.linkedin.com/in/zack-cheng-3684506b" target="_blank" rel="noreferrer"><i className="fa fa-linkedin"></i></a>
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><i className="fa fa-facebook"></i></a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><i className="fa fa-instagram"></i></a>
      </Footer>
    </>
  );
}

export default App;
