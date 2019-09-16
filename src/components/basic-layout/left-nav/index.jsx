import React, {Component} from 'react'
import {Icon, Menu} from "antd";
import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { setTitle } from '@redux/action-creators';
import menus from '@config/menus'

const {SubMenu} = Menu;

@connect(
    null,
    { setTitle }
)

@withRouter
class LeftNav extends Component {
    createItem = (menu)=>{
        return <Menu.Item key={menu.key}>
            <Link to={menu.key}>
                <Icon type={menu.icon}/>
                <span> {menu.title} </span>
            </Link>
        </Menu.Item>
    }

    createMenu = () => {
       return menus.map((menu) => {
            if (menu.children) {
                //二菜单
               return <SubMenu
                    key={menu.key}
                    title={
                        <span>
                            <Icon type={menu.icon}/>
                            <span>{menu.title}</span>
                        </span>
                    }
                >
                    {
                        menu.children.map((cmenu)=>{
                            return this.createItem(cmenu)
                        })
                    }
                </SubMenu>
            } else {
                //一级菜单
                return this.createItem(menu)
            }


        })
    }


    findOpenKeys=(pathname)=>{
        for (let i=0; i<menus.length;i++){
            const  menu =menus[i];
            if(menu.children){
                for (let j = 0; j < menu.children.length; j++) {
                    const  cMenu = menu.children[j];
                    if(cMenu.key === pathname){
                        return menu.key
                    }
                }
            }
        }
    }
    findTitle = (pathname)=>{
        for (let i=0; i<menus.length;i++){
            const  menu =menus[i];
            if(menu.children){
                for (let j = 0; j < menu.children.length; j++) {
                    const  cMenu = menu.children[j];
                    if(cMenu.key === pathname){
                        return cMenu.title;
                    }
                }
            }else{
                if (menu.key === pathname) {
                    return menu.title;
                }
            }
        }
    }

    select = ({key})=>{
           const title = this.findTitle(key);
           this.props.setTitle(title);
    }

    componentDidMount() {
        const { location : {pathname} } = this.props;
        const title = this.findTitle(pathname);
        this.props.setTitle(title);
    }


    render() {

        const { pathname } =this.props.location;
        const menus = this.createMenu();
        const  openKeys = this.findOpenKeys(pathname);

        return <Menu
            theme="dark"
            defaultSelectedKeys={[ pathname ]}
            defaultOpenKeys={[openKeys]}
            mode="inline"
            onSelect={this.select}
        >
            {
                menus
            }
        </Menu>
    }
}

export default LeftNav