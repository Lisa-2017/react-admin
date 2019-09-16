import React, {Component} from 'react'
import {Card,Button,Icon,Table} from "antd";

import './index.less'
class Category extends Component {
    render() {
        const columns=[
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
        const data=[
            {
                key:1,
                name:'王一博'
            },
            {
                key:2,
                name:'蓝忘机'
            },
            {
                key:3,
                name:'肖战'
            },
            {
                key:4,
                name:'魏无羡'
            },
        ]

        return (
            <Card title="分类列表" extra={<Button type="primary"><Icon type="plus"/>分类列表</Button>}>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={{
                        showQuickJumper:true,
                        showSizeChanger:true,
                        pageSizeOptions:['3','6','9','12'],
                        defaultPageSize:3
                    }}
                />
            </Card>
        )
    }
}

export default Category