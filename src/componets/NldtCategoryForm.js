import React, { useEffect, useState } from 'react'
import axios from "../api/NldtApi";

export default function NldtCategoryForm({ oncloseForm, onCategorySubmit, renderNldtCategory }) {
    //state 
    const [NldtId, setNldtId] = useState(0);
    const [NldtCategoryName, setNldtCategoryName] = useState("");
    const [NldtCategoryStatus, setNldtCategoryStatus] = useState(true);

    useEffect(() => {
        setNldtId(renderNldtCategory.NldtId);
        setNldtCategoryName(renderNldtCategory.NldtCategoryName);
        setNldtId(renderNldtCategory.NldtCategoryStatus);
    });
    const NldtHandleClose = () => {
        oncloseForm(false);
    }
    const NldtHandleSubmit = async (event) => {
        event.preventDefault();
        if (NldtId === 0) { //thêm
            let NldtCategory = {
                NldtId: 0,
                NldtCategoryName: NldtCategoryName,
                NldtCategoryStatus: NldtCategoryStatus
            }
            await axios.post("NldtCategory", NldtCategory);
            onCategorySubmit(NldtCategory);
        } else {//sửa
            let NldtCategory = {
                NldtId: NldtId,
                NldtCategoryName: NldtCategoryName,
                NldtCategoryStatus: NldtCategoryStatus
            }
            await axios.put("NldtCategory", NldtCategory);
            onCategorySubmit(NldtCategory);
        }
    }
    return (
        <div>
            <form>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Category Name</span>
                    <input type="text" class="form-control" name='NldtCategoryName'
                        value={NldtCategoryName}
                        onChange={(ev) => setNldtCategoryName(ev.target.value)}
                        placeholder="Category Name"
                        aria-label="Category Name" aria-describedby="basic-addon1" />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Category Status</span>
                    <select className='form-control'
                        name='NldtCategoryStatus'
                        value={NldtCategoryStatus}
                        onChange={(ev) => setNldtCategoryStatus(ev.target.value)}>
                        <option value={true}>Hiển Thị</option>
                        <option value={false}>Tạm Khóa</option>
                    </select>
                </div>
                <button className='btn btn-success' onClick={NldtHandleSubmit}>Ghi Lại</button>
                <button className='btn btn-danger' onClick={NldtHandleClose}>Đóng</button>
            </form>
        </div>
    )
}