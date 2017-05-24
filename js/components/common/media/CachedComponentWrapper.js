import * as React from "react";
import * as Cache from '../../../lib/cache/FSVideoCache'

const cacheComponent=LoaderComponent=>uriProvider=>WrappedComponent=>{

  return class CachedComponentWrapper extends React.Component {

    constructor(props) {
      super(props);
      this.cacheOrReturnCachedPath=this.cacheOrReturnCachedPath.bind(this);
      this.onCached=this.onCached.bind(this);
      this.state={
        isLoading:true,
        localUri:''
      }
    }

    componentDidMount() {
      const uri=uriProvider(this.props);
      this.cacheOrReturnCachedPath(uri);
    }

    cacheOrReturnCachedPath(uri){
      Cache.get(uri).then(cachedPath => {
        if (cachedPath) {
          this.onCached(cachedPath);
        }
        else {
          Cache.add(uri).then(localPath => {
            this.onCached(localPath);
          }).catch(err => console.log(`error with caching file ${err}`));
        }
      }).catch(err => console.log(`error with getting file ${err}`));
    }

    onCached(localUri) {
      this.setState({isLoading: false, localUri: localUri})
    }

    componentWillReceiveProps(nextProps){
      const nextUri=uriProvider(nextProps);
      const currentUri=uriProvider(this.props);
      if(nextUri!==currentUri){
        this.setState({isLoading: true, localUri: ''});
        this.cacheOrReturnCachedPath(nextUri);
      }
    }

    renderWrappedComponent=(props,state)=><WrappedComponent {...props} localUri={state.localUri}/>

    renderLoader=(props)=><LoaderComponent {...props}/>;

    render() {
      if (this.state.isLoading) {
        return this.renderLoader(this.props)
      }
      return this.renderWrappedComponent(this.props,this.state)
    }
  }
};

export default cacheComponent;