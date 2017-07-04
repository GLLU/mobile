import React,{Component} from "react";
import * as Cache from '../../../lib/cache/FSVideoCache'

const cacheComponent=uriProvider=>WrappedComponent=>{

  return class CachedComponentWrapper extends Component {

    constructor(props) {
      super(props);
      this.cacheOrReturnCachedPath=this.cacheOrReturnCachedPath.bind(this);
      this.onCached=this.onCached.bind(this);
      this.forceCache=this.forceCache.bind(this);
      this.state={
        isCaching:true,
        localUri:''
      }
    }

    componentDidMount() {
      this._isMounted=true;
      const uri=uriProvider(this.props);
      if(uri.search("file://") > -1){
        this.setState({isCaching: false, localUri: uri})
      } else {
        this.cacheOrReturnCachedPath(uri);
        //this.setState({isCaching: false, localUri: uri})
      }

    }

    componentWillUnmount(){
      this._isMounted=false;
    }

    forceCache(){
      this.setState({isCaching: true, localUri: ''},() => {
        this.cacheOrReturnCachedPath(uriProvider(this.props),true);
      });
    }

    cacheOrReturnCachedPath(uri,force=false){
      Cache.get(uri).then(cachedPath => {
        if (!force && cachedPath) {
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
      if(this._isMounted){
        this.setState({isCaching: false, localUri: localUri})
      }
    }

    componentWillReceiveProps(nextProps){
      const nextUri=uriProvider(nextProps);
      const currentUri=uriProvider(this.props);
      if(nextUri!==currentUri){
        this.setState({isCaching: true, localUri: ''},() => {
          this.cacheOrReturnCachedPath(nextUri);
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} isCaching={this.state.isCaching} localUri={this.state.localUri} forceCache={this.forceCache}/>
    }
  }
};

export default cacheComponent;