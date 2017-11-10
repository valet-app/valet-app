import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../valet-logo.png";
import {
  Header,
  Button,
  Grid,
  Image,
  Sidebar,
  Icon,
  Menu
} from "semantic-ui-react";

class CompanyPage extends Component {
  state = { visible: false };
  toggleVisibility = () => this.setState({ visible: !this.state.visible });
  render() {
    const { visible } = this.state;
    return (
      <div>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            width="thin"
            visible={visible}
            icon="labeled"
            direction="left"
            vertical
          >
            <div className="menu-icon">
              <Icon color="grey" size="large" name="close" />
            </div>

            <Menu.Item
              onClick={() => {
                this.toggleVisibility();
                this.props.history.push("/home");
              }}
              name="Home"
            >
              <Icon color="yellow" name="home" />
              Home
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                this.toggleVisibility();
                this.props.history.push("/companyPage");
              }}
              name="Admin"
            >
              <Icon color="yellow" name="archive" />
              Admin
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                this.toggleVisibility();
                this.props.history.push("/valetSignIn");
              }}
              name="Valet Sign-In/Out"
            >
              <Icon color="yellow" name="users" />
              Valet Sign-In/Out
            </Menu.Item>
            <Menu.Item onClick={this.handleLogout} name="Garage Log Out">
              <Icon color="yellow" name="external" />
              Garage Log Out
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher style={{ minHeight: "100vh" }}>
          <Grid.Row centered onClick={this.toggleVisibility}>
              <Icon
                color="grey"
                size="large"
                name="sidebar"
                className="menu-icon"
              />
            </Grid.Row>
            <Grid centered stretched verticalAlign="middle" padded='veritcally'>
              <Grid.Row centered>
                <Image src={logo} style={{ width: "75px", height: "75px" }} />
                <Header size="huge" color="grey">
                 Company Settings
                </Header>
              </Grid.Row>
              <Grid.Row columns={2} stretched centered>
                <p className='defaultText'>Choose an Option</p>
                <Grid.Column width={12} verticalAlign="middle" stretched>
                  <Link to="/companyPage">
                    <Button fluid color="yellow" size="massive">
                      Employees
                    </Button>
                  </Link>
                  <br />
                  <Link to="/analytics">
                    <Button fluid color="yellow" size="massive">
                      Analytics
                    </Button>
                  </Link>
                  <br />
                  <Link to="/garageSignUp">
                    <Button fluid color="yellow" size="massive">
                      New Garage
                    </Button>
                  </Link>
                  <br/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
export default CompanyPage;
