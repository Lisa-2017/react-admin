import React, { Component } from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

const Item = Form.Item;

@Form.create()
class AddRoleForm extends Component {
  static propTypes = {
    roles: PropTypes.array.isRequired
  };

  validator = (rule,value,callback)=> {
    if (!value) {
      return callback('请输入角色名称')
    }
    const result = this.props.roles.find((role)=>{
      return role.name === value;
    })
    if(result){
      return callback('用户名已存在，请更换其他名称！')
    }

    callback(); // 上面条件都不满足

  };




  render () {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <Form>
        <Item label='角色名称' labelCol={{span: 6}}  wrapperCol={{span: 15}}>
          {
            getFieldDecorator(
              'name',
              {
                rules:[
                  { validator:this.validator }
                ]
              }
            )(
              <Input placeholder='请输入角色名称'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default AddRoleForm;