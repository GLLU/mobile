import {connect} from 'react-redux';
import {getWhatsHotFeed} from '../../actions/feed';
import {
  addSearchTermHistoryToLooks,
  addSearchTermHistoryToPeople,
  getUsers,
  clearPeopleSearchResults,
  getUsersSuggestions,
} from '../../actions/search';
import asScreen from '../common/containers/Screen';
import SearchScreen from './SearchScreen';

function bindAction(dispatch) {
  return {
    getFeed: (query) => {
      dispatch(getWhatsHotFeed(query));
      dispatch(addSearchTermHistoryToLooks(query.term));
    },
    clearPeopleSearchResults: query => dispatch(clearPeopleSearchResults(query)),
    getUsers: (query) => {
      dispatch(getUsers(query));
      dispatch(addSearchTermHistoryToPeople(query));
    },
    getUsersSuggestions: () => dispatch(getUsersSuggestions()),
  };
}

const mapStateToProps = state => ({
  peopleSearchResults: state.search.people.data.users,
});

export default asScreen(connect(mapStateToProps, bindAction)(asScreen(SearchScreen)));
