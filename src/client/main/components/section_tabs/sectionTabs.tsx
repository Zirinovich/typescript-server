import * as React from 'react';
import {Grid, Row, Col, Tabs, Tab, Button, PanelGroup, Panel} from 'react-bootstrap';
import {Icon} from '../../../_common/components/icon/icon';

const style = require('./sectionTabs.scss');

interface IProps {

}

interface IState {

}

export class SectionTabs extends React.Component<IProps, IState> {
    render() {
        return (
            <div className={style.section}>
                <Grid>
                    <Row>
                        <Col md={4}>
                            <Tabs id="tabs" defaultActiveKey={1} className={style.tabs}>
                                <Tab eventKey={1} title="What's Included?">
                                    <ul>
                                        <li><Icon name="check"/> Unlimited disk space</li>
                                        <li><Icon name="check"/> Unlimited bandwidth</li>
                                        <li><Icon name="check"/> Host unlimited domains</li>
                                        <li><Icon name="check"/> Free domain registration</li>
                                        <li><Icon name="check"/> Free SiteLock security suite (a $120 value)</li>
                                        <li><Icon name="check"/> Unlimited bandwidth</li>
                                    </ul>
                                    <br/>
                                    <Button bsStyle="primary">Sign Up Now</Button>
                                </Tab>
                                <Tab eventKey={2} title="Transfer Your Site">
                                    <ul>
                                        <li><Icon name="check"/> 1</li>
                                        <li><Icon name="check"/> 2</li>
                                        <li><Icon name="check"/> 3</li>
                                        <li><Icon name="check"/> 4</li>
                                        <li><Icon name="check"/> 5</li>
                                    </ul>
                                    <br/>
                                    <Button bsStyle="primary">Sign Up Now</Button>
                                </Tab>
                            </Tabs>
                        </Col>

                        <Col md={4}>
                            <h4 className={style.title}>Affiliate Program</h4>
                            <div className={style.block}>
                                <div className={style.icon}>
                                    <Icon name="user"/>
                                </div>
                                <div className={style.text}>
                                    <h6 className={style.block_title}>Sign Up</h6>
                                    <p>Lorem ipsum dolor sit amet sit et justo consectetuer adipiscing elit. </p>
                                </div>
                            </div>

                            <div className={style.block}>
                                <div className={style.icon}>
                                    <Icon name="user"/>
                                </div>
                                <div className={style.text}>
                                    <h6 className={style.block_title}>Refer Customers</h6>
                                    <p>Lorem ipsum dolor sit amet sit et justo consectetuer adipiscing elit. </p>
                                </div>
                            </div>

                            <div className={style.block}>
                                <div className={style.icon}>
                                    <Icon name="user"/>
                                </div>
                                <div className={style.text}>
                                    <h6 className={style.block_title}>Earn Money</h6>
                                    <p>Lorem ipsum dolor sit amet sit et justo consectetuer adipiscing elit. </p>
                                </div>
                            </div>
                        </Col>

                        <Col md={4}>
                            <PanelGroup defaultActiveKey={1} accordion className={style.accordion}>
                                <Panel header="Panel 1" eventKey={1} className={style.panel_heading}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commyolk augue. Aliquam ornare hendrerit augue. Cras tellus. In pulvinar lectus a est. Curabitur eget orci. Cras laoreet ligula. Etiam sit amet dolor. Lorem ipsum dolor
                                </Panel>
                                <Panel header="Panel 2" eventKey={2} className={style.panel_heading}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commyolk augue. Aliquam ornare hendrerit augue. Cras tellus. In pulvinar lectus a est. Curabitur eget orci. Cras laoreet ligula. Etiam sit amet dolor. Lorem ipsum dolor
                                </Panel>
                                <Panel header="Panel 3" eventKey={3} className={style.panel_heading}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commyolk augue. Aliquam ornare hendrerit augue. Cras tellus. In pulvinar lectus a est. Curabitur eget orci. Cras laoreet ligula. Etiam sit amet dolor. Lorem ipsum dolor
                                </Panel>
                            </PanelGroup>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}