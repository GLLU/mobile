import withAnalytics from '../../common/analytics/WithAnalytics'
import { connect } from "react-redux";
import { reportAbuse } from "../../../actions/looks";
import MenuView from "./MenuView";
import { blockUser } from "../../../actions/user";

type Props={
  lookId:number,
  userId:number
}

const mapDispatchToProps = (dispatch, props:Props) => {
  const {lookId, userId} = props;
  return {
    reportAbuse: () => dispatch(reportAbuse(lookId)),
    blockUser: () => dispatch(blockUser(userId)),
  };
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withAnalytics(MenuView));