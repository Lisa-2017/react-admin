import React, {Component} from 'react'
import {Form, Input} from 'antd';
import PropTypes from 'prop-types';

@Form.create()
class UpdateCategoryForm extends Component {
    static propTypes = {
        categoryName: PropTypes.string.isRequired
    };

    validator = (rule, value, callback) => {
        if (!value) {
            callback('请输入要修改的分类名称~');
        } else if (value === this.props.categoryName) {
            callback('请输入要修改的有效分类名称~');
        } else {
            callback();
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const { categoryName } = this.props;

        return <Form>
            <Form.Item label="分类名称">
                {
                    getFieldDecorator(
                        'categoryName', {
                            rules: [
                                { validator: this.validator }
                            ],
                            initialValue: categoryName // 初始化值，只有在没有值时才生效
                        }
                    )( <Input placeholder="请输入分类名称"/> )
                }

            </Form.Item>
        </Form>
    }
}

export default UpdateCategoryForm