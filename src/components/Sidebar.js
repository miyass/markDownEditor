import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'

import { viewContent } from '../store/actions/contentActions'

import ContentList from './ContentList'
const { Sider } = Layout;

class Sidebar extends React.Component {
  constructor(props) {
    console.log("constructor");
    super(props);
  }

  componentDidMount() {
    //初期のcontent用。
    let lastNum = this.props.contents.length;
    this.props.viewContent(this.props.contents[lastNum - 1]);
  }

  addContent(e) {
    console.log(e);
  }

  viewContent(e) {
    this.props.viewContent(e)
  }

  render() {
    return (
      <Sider width={100} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <Menu theme="dark" defaultSelectedKeys={[this.props.contents.length.toString()]}>
          <Menu.Item key="icon">
            <Icon type="user" />
          </Menu.Item>
          <Menu.Item key="plus" onClick={this.addContent}>
            <Icon type="plus-circle" theme="outlined" />
          </Menu.Item>
          { this.props.contents.map(con =>
            <Menu.Item key={con.id} onClick={this.viewContent.bind(this, con)}>
              <ContentList title={con.title} />
            </Menu.Item>
          )}
        </Menu>
      </Sider>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps");
  return {
    contents: state.content.contents
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    viewContent: (perContent) => dispatch(viewContent(perContent))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
