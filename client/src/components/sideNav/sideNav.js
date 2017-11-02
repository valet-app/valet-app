import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Grid, Segment, Divider,Menu, Icon, Sidebar} from 'semantic-ui-react';

class SideNav extends Component{
    state = { visible: false }
    
      toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render(){
      console.log(this.props)
        return (
            <div>
          <Button onClick={this.toggleVisibility}><Icon name='sidebar'/></Button>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical>
            <Menu.Item name='Home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='Valet Sign-In/Out'>
              <Icon name='users' />
              Games
            </Menu.Item>
            <Menu.Item name='Garage Log Out'>
              <Icon name='external' />
              Channels
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
          </div>
        )
    }
}
const mapStateToProps = state => state;
export default SideNav;