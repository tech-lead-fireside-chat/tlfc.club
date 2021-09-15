import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup.js";
import { changeActiveSidebarItem } from "../../actions/navigation.js";
import { logoutUser } from "../../actions/auth.js";
import SofiaLogo from "../Icons/SidebarIcons/TLFCLogo.js";

class Sidebar extends React.Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    activeItem: "",
  }

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  componentDidMount() {
    this.element.addEventListener('transitionend', () => {
      if (this.props.sidebarOpened) {
        this.element.classList.add(s.sidebarOpen);
      }
    }, false);
  }

  componentDidUpdate(prevProps) {

    if (this.props.sidebarOpened !== prevProps.sidebarOpened) {
      if (this.props.sidebarOpened) {
        this.element.style.height = `276px`;
      } else {
        this.element.classList.remove(s.sidebarOpen);
        setTimeout(() => {
          this.element.style.height = '';
        }, 0);
      }
    }
  }


  doLogout(id) {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
      <nav className={s.root}
           ref={(nav) => {
             this.element = nav;
           }}
      >
        <header className={s.logo}>
          <SofiaLogo/>
          <span className={s.title}>SOFIA</span>
        </header>
        <ul className={s.nav}>
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Dashboard"
            isHeader
            iconName={<i className={'eva eva-home-outline'}/>}
            link="/app/dashboard"
            index="dashboard"
            badge="9"
          />
          <h5 className={s.navTitle}>TEMPLATE</h5>
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Typography"
            isHeader
            iconName={<i className={'eva eva-text-outline'}/>}
            link="/app/typography"
            index="typography"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Tables"
            isHeader
            iconName={<i className={'eva eva-grid-outline'}/>}
            link="/app/tables"
            index="tables"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Notifications"
            isHeader
            iconName={<i className={'eva eva-bell-outline'}/>}
            link="/app/notifications"
            index="notifications"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="UI Elements"
            isHeader
            iconName={<i className={'eva eva-cube-outline'}/>}
            link="/app/uielements"
            index="uielements"
            childrenLinks={[
              {
                header: 'Charts', link: '/app/ui-elements/charts',
              },
              {
                header: 'Icons', link: '/app/ui-elements/icons',
              },
              {
                header: 'Google Maps', link: '/app/ui-elements/maps',
              },
            ]}
          />
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
