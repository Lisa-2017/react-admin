import React, {Component} from 'react'
import {Card,Button,Icon,Table,Modal} from "antd";
import { connect } from 'react-redux';
import { getCategories,addCategory,updateCategory,deleteCategory } from "@redux/action-creators";

import AddCategoryForm from './add-category-form';
import UpdateCategoryForm from  './update-category-form'


import './index.less'

@connect(
    (state) => ({categories: state.categories}),
    { getCategories, addCategory ,updateCategory,deleteCategory}
)
class Category extends Component {
    state = {
        isShowAddCategoryModal:false,
        isShowUpdateCategoryModal:false,
        category:{},
    };

    addCategoryForm = React.createRef();
    updateCategoryForm = React.createRef();
    columns=[
        {
            title:'品类名称', // 表头名称
            dataIndex:'name',// 是唯一的key，（决定显示的内容）
            // render: text => <a>{text}</a>, // 默认是纯文本，如果要加上指定标签，就得render方法
        },
        {
            title:'操作',
            // dataIndex:'operation',
            render:(category)=>{

            /*
             如果有dataIndex，根据它的值来获取要渲染data的对应属性值，放在render方法作为参数传入
             如果没有dataIndex，就会将整个data数据，放在render方法作为参数传入
            */

                return <div>
                    <Button type="link" onClick={this.showUpdateCategoryModal(category)}>修改分类 </Button>
                    <Button type="link" onClick={ this.showdeleteCategoryModal(category) }>删除分类 </Button>
                </div>
            }
        }
    ];

    showUpdateCategoryModal = (category)=>{
        return ()=>{
            this.setState({
                isShowUpdateCategoryModal:true,
                category
            })
        }
    }

    componentDidMount() {
        if (this.props.categories.length) return;// 判断数据是否已存在，不存在则发送请求
        // 发送请求，请求分类数据，更新redux状态
        this.props.getCategories()
    }

    toggleModal =(key,value)=>{
        return ()=>{
            this.setState({
               [key] :value
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

    updateCategory = ()=>{
        const  form = this.updateCategoryForm.current;
        // console.log(this.state.category)   // 分类id和分类名对象  {_id: "5d7f7961c3261b386ccf14e1", name: "cc", __v: 0}

        //检验表单
        form.validateFields((err,values)=>{
            //console.log(values) // 分类名对象 {categoryName: "cc"}

            if(!err){
                // 表单验证通过
                this.props.updateCategory(this.state.category._id,values.categoryName)
                // 清空表单
                form.resetFields();

                //隐藏对话框
                this.setState({
                    isShowUpdateCategoryModal:false
                })
            }

        })
    }

    hiddenUpdateCategoryModal=()=>{
        this.setState({
            isShowUpdateCategoryModal:false
        })
        this.updateCategoryForm.current.resetFields() // 清空表单数据

    }

    showdeleteCategoryModal = (category)=>{
        return ()=>{
            Modal.confirm({
                title: '删除分类',
                okText:'确认',
                cancelText:'取消',
                onOk: () => { this.props.deleteCategory(category._id);},
            })
        }
    }

    render() {
        const  { categories }= this.props;
        const  { isShowAddCategoryModal, isShowUpdateCategoryModal, category } =this.state;

        return (
            <Card
                title="分类列表"
                extra={<Button type="primary"
                onClick={this.toggleModal('isShowAddCategoryModal',true)}
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

                <Modal
                    visible={isShowUpdateCategoryModal}
                    title="修改分类"
                    onOk={this.updateCategory}
                    okText="确定"
                    cancelText ="取消"
                    width={300}
                    onCancel={this.hiddenUpdateCategoryModal}
                >
                    <UpdateCategoryForm ref={this.updateCategoryForm} categoryName={ category.name}/>
                </Modal>

            </Card>
        )
    }
}

export default Category