import React, {Component} from 'react'
import {Card,Button,Icon,Table,Modal} from "antd";
import { connect } from 'react-redux';
import { getCategories,addCategory } from "@redux/action-creators";

import AddCategoryForm from './add-category-form';


import './index.less'

@connect(
    (state) => ({categories: state.categories}),
    { getCategories, addCategory }
)
class Category extends Component {
    state = {
        isShowAddCategoryModal:false,
    };

    addCategoryForm = React.createRef();
    columns=[
        {
            title:'品类名称', // 表头名称
            dataIndex:'name',// 是唯一的key，（决定显示的内容）
        },
        {
            title:'操作',
            dataIndex:'operation',
            render:()=>{
                return <div>
                    <Button type="link">修改分类 </Button>
                    <Button type="link">删除分类 </Button>
                </div>
            }
        }
    ];

    componentDidMount() { // 发送请求，请求分类数据，更新redux状态
        this.props.getCategories()
    }

    toggleModal =(value)=>{
        return ()=>{
            this.setState({
                isShowAddCategoryModal:value
            })
        }
    }

    addCategory = ()=>{
        const  form=this.addCategoryForm.current;
        //检验表单
        form.validateFields((err,values)=>{
            if(!err){
                // 表单验证通过
                this.props.addCategory(values.categoryName)
                // 清空表单
                form.resetFields();

                //隐藏对话框
                this.setState({
                    isShowAddCategoryModal:false
                })
            }

        })
    }


    render() {
        const  { categories }= this.props;
        const  { isShowAddCategoryModal} =this.state;

        return (
            <Card
                title="分类列表"
                extra={<Button type="primary"
                onClick={this.toggleModal(true)}
                >
                <Icon type="plus"/>分类列表</Button>}>

                <Table
                    columns={this.columns}
                    dataSource={categories}
                    bordered
                    rowKey="_id"
                    pagination={{
                        showQuickJumper:true,
                        showSizeChanger:true,
                        pageSizeOptions:['3','6','9','12'],
                        defaultPageSize:3
                    }}
                />
                <Modal
                    visible={isShowAddCategoryModal}
                    title="添加分类"
                    onOk={this.addCategory}
                    okText="确定"
                    cancelText ="取消"
                    width={300}
                    onCancel={this.toggleModal(false)}
                >
                    <AddCategoryForm ref={this.addCategoryForm}/>
                </Modal>
            </Card>
        )
    }
}

export default Category