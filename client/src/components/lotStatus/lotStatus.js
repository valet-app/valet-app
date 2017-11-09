import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { getLotStatusAction, setNavTitleAction } from "../../reducers";
import { connect } from "react-redux";
import NavBar from "../navBar/navBar";

class LotStatus extends Component {
  constructor(props) {
    super(props);
    this.props.getLotStatusAction();
    this.state = { activeIndex: 0 };
    this.props.setNavTitleAction("Dashboard", () =>
      this.props.history.push("/home")
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ lotStatus: nextProps.lotStatus });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    console.log(index, activeIndex, newIndex);
    this.setState({ activeIndex: newIndex });
  };
  render() {
    const spaces = {};
    return (
      <div>
        <NavBar />
        <Grid centered>
          <Grid.Row>
        <h1>Lot Status</h1>
        </Grid.Row>
        <p>10/30 Spaces Available</p>
        </Grid>
        <div className='lotStatus'>
          <div className='locations'>
            <div className='locationBox'>Floor 1</div>
            <div className='locationBox'>Floor 2</div>
          </div>
          <div>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
            <p>Section A Over Yonder Space 34</p>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  getLotStatusAction,
  setNavTitleAction
})(LotStatus);
