import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliries/Auxiliary';
import classes from './Layout.css';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SlideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

   state = {
     showSideDrawer: false
   } 

   sideDrawerClosedHandler = () => {
     this.setState({showSideDrawer: false});
   }

   drawerToggleHandler = () => {
    this.setState((prevState) => {
                 return {showSideDrawer: !prevState.showSideDrawer}
                });
   }

  render() {
    return (
    <Auxiliary>
       <ToolBar drawerToggleClicked={this.drawerToggleHandler}/>
       <SlideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
       <main className={classes.Content}>
           {this.props.children}
       </main>
     </Auxiliary>
   );
  }
} 

export default Layout;    