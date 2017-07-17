import withAnalytics from '../../common/analytics/WithAnalytics'
import { connect } from "react-redux";
import { reportAbuse } from "../../../actions/looks";
import MenuView from "./MenuView";

const mapDispatchToProps = (dispatch) => {
  return {
    reportAbuse: (id) => dispatch(reportAbuse(id)),
  };
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withAnalytics(MenuView));