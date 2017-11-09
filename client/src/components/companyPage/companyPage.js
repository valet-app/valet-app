import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../valet-logo.png";
import {
  Header,
  Button,
  Grid,
  Image,
} from "semantic-ui-react";

class CompanyPage extends Component {

  render() {

    return (
      <div>
        <br />
            <Grid centered stretched verticalAlign="middle">
              <Grid.Row centered>
                <Image src={logo} style={{ width: "75px", height: "75px" }} />
                <Header size="huge" color="grey">
                  Company Name
                </Header>
              </Grid.Row>
              <Grid.Row columns={2} stretched centered>
                <p>Choose an Option</p>
                <Grid.Column width={12} verticalAlign="middle" stretched>
                  <Link to="/companyPage">
                    <Button fluid color="yellow" size="massive">
                      Garages
                    </Button>
                  </Link>
                  <br />
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
                  <Link to="/companyPage">
                    <Button fluid color="grey" size="massive">
                      Log Out
                    </Button>
                  </Link>
                  <br />
                </Grid.Column>
              </Grid.Row>
            </Grid>
      </div>
    );
  }
}
export default CompanyPage;
