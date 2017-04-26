import * as React from 'react';
import {Link} from 'react-router';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {IUser} from "../../../shared/ajaxDto/authentication/IUser";
const style = require('./superHeader.scss');

interface IProps {
  user: IUser;
  logout: ()=>void;
}

interface IState {

}

export class Header extends React.Component<IProps, IState> {
  render() {
    return (
      <header className={style.header}>

        <div className={style.trueHeader}>
          <div className="wrapper">
            <div className="container">

              <div className={style.logo}>
                <Link to="/"/>
              </div>

              <div className={style.menu_main}>
                <div className="navbar yamm">
                  <div className="container">
                    <div className="navbar-header">
                      <div className="navbar-toggle .navbar-collapse .pull-right " data-toggle="collapse"
                           data-target="#navbar-collapse-1"><span>Menu</span>
                        <button type="button"><i className="fa fa-bars"></i></button>
                      </div>
                    </div>
                    <div id="navbar-collapse-1" className="navbar-collapse collapse pull-right">
                      <nav>
                        <ul className="nav navbar-nav">
                          <li className="dropdown yamm-fw"><a href="message-boxes.html" className="dropdown-toggle">Elements</a>
                            <ul className="dropdown-menu">
                              <li>
                                <div className="yamm-content">
                                  <div className="row">
                                    <ul className="col-sm-6 col-md-3 list-unstyled ">
                                      <li>
                                        <p> Elements 1 </p>
                                      </li>
                                      <li><a href="accordions.html"><i className="fa fa-plus-circle"></i>
                                        &nbsp; Accordions</a></li>
                                      <li><a href="image-hover.html"><i className="fa fa-picture-o"></i>
                                        &nbsp; Image Hovers</a></li>
                                      <li><a href="buttons.html"><i className="fa fa-bars"></i> &nbsp; Button Styles</a>
                                      </li>
                                      <li><a href="call-to-action.html"><i className="fa fa-external-link-square"></i>
                                        &nbsp; Call to Action</a></li>
                                      <li><a href="carousel-sliders.html"><i className="fa fa-eye"></i>
                                        &nbsp; Carousel Sliders</a></li>
                                    </ul>
                                    <ul className="col-sm-6 col-md-3 list-unstyled ">
                                      <li>
                                        <p> Elements 2 </p>
                                      </li>
                                      <li><a href="columns.html"><i className="fa fa-leaf"></i> &nbsp; Columns</a></li>
                                      <li><a href="lists.html"><i className="fa fa-list"></i> &nbsp; lists Styles</a>
                                      </li>
                                      <li><a href="message-boxes.html"><i className="fa fa-tags"></i>
                                        &nbsp; Message Boxes</a></li>
                                      <li><a href="parallax-backgrounds.html"><i className="fa fa-cloud"></i>
                                        &nbsp; Parallax Backgrounds</a></li>
                                      <li><a href="pricing-tables.html"><i className="fa fa-rocket"></i>
                                        &nbsp; Pricing Tables</a></li>
                                    </ul>
                                    <ul className="col-sm-6 col-md-3 list-unstyled ">
                                      <li>
                                        <p> Elements 3 </p>
                                      </li>
                                      <li><a href="tabs.html"><i className="fa fa-qrcode"></i> &nbsp; Tabs</a></li>
                                      <li><a href="typography.html"><i className="fa fa-font"></i> &nbsp; Typography</a>
                                      </li>
                                      <li><a href="content-boxes.html"><i className="fa fa-flag"></i>
                                        &nbsp; Content Boxes</a></li>
                                      <li><a href="data-tables.html"><i className="fa fa-table"></i> &nbsp; Data Tables</a>
                                      </li>
                                      <li><a href="social-icons.html"><i className="fa fa-twitter"></i>
                                        &nbsp; Social Icons</a></li>
                                    </ul>
                                    <ul className="col-sm-6 col-md-3 list-unstyled ">
                                      <li>
                                        <p> Elements 4 </p>
                                      </li>
                                      <li><a href="icon-boxes.html"><i className="fa fa-pencil-square"></i>
                                        &nbsp; Icon Boxes</a></li>
                                      <li><a href="team-member.html"><i className="fa fa-user"></i>
                                        &nbsp; Team member</a></li>
                                      <li><a href="latest-posts.html"><i className="fa fa-thumbs-up"></i>
                                        &nbsp; Latest Posts</a></li>
                                      <li><a href="dividers.html"><i className="fa fa-file-text"></i>
                                        &nbsp; Dividers</a></li>
                                      <li><a href="widgets.html"><i className="fa fa-external-link"></i>
                                        &nbsp; Widget Styles</a></li>
                                    </ul>
                                    <Nav pullRight>
                                      { this.props.user ?
                                        <NavItem onClick={this.props.logout}>Выйти</NavItem>
                                        :
                                        <LinkContainer to='/login'>
                                          <NavItem>Вход</NavItem>
                                        </LinkContainer>
                                      }
                                    </Nav>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </li>

                          <li className="dropdown"><a href="about.html" className="dropdown-toggle">Pages</a>
                            <ul className="dropdown-menu multilevel" role="menu">
                              <li><a href="about.html">About Page</a></li>
                              <li><a href="website_builder.html">Website Builder</a></li>
                              <li><a href="affiliates.html">Affiliates</a></li>
                              <li><a href="services.html">Services Page</a></li>
                              <li><a href="team.html">Our Team</a></li>
                              <li><a href="whois.html">search whois</a></li>
                              <li><a href="awards.html">Awards</a></li>
                              <li><a href="support.html">Support</a></li>
                              <li><a href="full-width.html">Full Width Page</a></li>
                              <li><a href="left-sidebar.html">Left Sidebar Page</a></li>
                              <li><a href="right-sidebar.html">Right Sidebar Page</a></li>
                              <li><a href="left-nav.html">Left Navigation</a></li>
                              <li><a href="right-nav.html">Right Navigation</a></li>
                              <li><a href="login.html">Login Form</a></li>
                              <li><a href="register.html">Registration Form</a></li>
                              <li><a href="404.html">404 Error Page</a></li>
                            </ul>
                          </li>

                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>
    )
  }
}