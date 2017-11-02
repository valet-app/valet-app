import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../valet-logo.png";
import { getVehiclesAction, getEmployeesAction } from "../../reducers";
import { Header, Button, Grid, Image, Sidebar, Icon, Segment, Menu } from "semantic-ui-react";

class ValetOptions extends Component {
 

  componentDidMount() {
    this.props.getVehiclesAction();
    this.props.getEmployeesAction();
  }
  state = { visible: false }
  
    toggleVisibility = () => this.setState({ visible: !this.state.visible })
  render() {
    const { visible } = this.state
    return (
      <div>
        <Grid.Row centered onClick={this.toggleVisibility}><Icon color='grey' size='large' name='sidebar' className="menubutton"/></Grid.Row>
        <br/>
        <Sidebar.Pushable as={Grid}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical stretched>
            <Link to='/home'>< Menu.Item onClick={this.toggleVisibility} name='Home' >
              <Icon color='yellow' name='home' />
              Home
            </Menu.Item></Link>
            <Link to='/home'>
            <Menu.Item onClick={this.toggleVisibility} name='Valet Sign-In/Out'>
              <Icon  color='yellow' name='users' />
              Valet Sign-In/Out
            </Menu.Item></Link>
            <Link to='/login'>
            <Menu.Item onClick={this.toggleVisibility} name='Garage Log Out'>
              <Icon color='yellow' name='external' />
              Garage Log Out
            </Menu.Item></Link>
          </Sidebar>
          <Sidebar.Pusher>
        <Grid centered verticalAlign="middle">
          <Grid.Row centered>
            <Image src={logo} style={{ width: "75px", height: "75px" }} />
            <Header size="huge" color="grey">
              Garage Name
            </Header>
          </Grid.Row>
          <Grid.Row columns={2} stretched centered>
            <p>Choose an Option</p>
            <Grid.Column width={12} verticalAlign="middle" stretched>
              <Link to="/park/chooseValet">
                <Button fluid color="yellow" size="massive">
                  Park a Car
                </Button>
              </Link>
              <br />
              <Link to="/get/chooseValet">
                <Button fluid color="yellow" size="massive">
                  Retrieve a Car
                </Button>
              </Link>
              <br />
              <Link to='/inProgress'>
              <Button fluid color="yellow" size="massive">
                In Progress
              </Button>
              </Link>
              <br />
              <Button fluid color="yellow" size="massive">
                Lot Status
              </Button>
              <br />
            </Grid.Column>
          </Grid.Row>
        </Grid>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  getVehiclesAction,
  getEmployeesAction
})(ValetOptions);
