import withAnalytics from '../../common/analytics/WithAnalytics'
import { connect } from "react-redux";
import { reportAbuse } from "../../../actions/looks";
import MenuView from "./MenuView";
import { blockUser } from "../../../actions/user";

const mapDispatchToProps = (dispatch, props) => {
  const {lookId, userId} = props;
  return {
    reportAbuse: (id) => dispatch(reportAbuse(id)),
  };
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withAnalytics(MenuView));