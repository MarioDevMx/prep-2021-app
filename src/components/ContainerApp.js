import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import * as globalStyles from '../config/styles';

class ContainerApp extends Component {
  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: globalStyles.GENERAL_BACKGROUND_COLOR,
          }}>
          {this.props.children}
        </Content>
      </Container>
    );
  }
}
export default ContainerApp;
