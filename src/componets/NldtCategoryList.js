import React from 'react'

export default function NldtCategory({ renderNldtCategories, onAddNew, onNldtDelete, onNldtEdit }) {
    console.log("renderNldtCategories: ", renderNldtCategories);
    let NldtCategoriesElement = renderNldtCategories.map((NldtCategory, index) => {
        return (
            <tr key={index}>
                <th>{index + 1}</th>
                <td>{NldtCategory.NldtId}</td>
                <td>{NldtCategory.NldtCategoryName}</td>
                <td>{NldtCategory.NldtCategoryStatus === true ? "Hiển Thị" : "Tạm Khóa"}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => NldthandleDelete(NldtCategory.NldtId)}>Delete</button>
                    <button className='btn btn-success' onClick={() => NldthandleEdit(NldtCategory)}>Edit</button>
                </td>
            </tr>
        )
    })
    const NldthandleDelete = (NldtId) => {
        if (window.confirm('Bạn Có Muốn Xóa ['+NldtId+'] Không?')) {
            console.log("Delete:", NldtId);
            onNldtDelete(NldtId);
        } else {

        }
    }
    const NldthandleEdit = (NldtCategory)=>{
        onNldtEdit(NldtCategory);
    }

    const NldtHandleAdd = () => {
        onAddNew(true);
    }
    return (
        <div className='container m-2'>
            <h2>Danh Sách Loại Sản Phẩm</h2>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã Loại</th>
                        <th>Tên Loại</th>
                        <th>Trạng Thái</th>
                        <th>Chức Năng</th>
                    </tr>
                </thead>
                <tbody>
                    {NldtCategoriesElement}
                </tbody>
            </table>
            <button className='btn btn-primary' onClick={NldtHandleAdd}>Thêm Mới</button>
        </div>
    )
}