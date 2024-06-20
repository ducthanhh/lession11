import { useEffect, useState } from 'react';
import './App.css';
import NldtCategorylist from './Component/NldtCategorylist';
import axios from "./API/NldtAPI";
import NldtCategoryForm from './Component/NldtCategoryForm';


function NldtApp() {
  // lấy dữ liệu từ api
  const [NldtCategories, setNldtCategories] = useState([]);

  const getCategories = async () => {
    try {
      const NldtCateResponse = await axios.get("NldtCategory");
      setNldtCategories(NldtCateResponse.data);
    } catch (error) {
      console.log("lỗi:", error);
    }
  }

  useEffect(() => {
    getCategories();
    console.log("NldtCategories:", NldtCategories);
  }, [])

  //trạng thái form
  const [NldtCategoryIsForm, setNldtCategoryIsForm] = useState(false);
  //dữ liệu form : Add/Edit
  let NldtCategoryInit = {
    NldtId: 0,
    NldtCategoryName: "",
    NldtCategoryStatus: true,
}
  const [NldtCategoryEdit, setNldtCategoryEdit] = useState(NldtCategoryInit);
  const NldtHandleAddNew = (param) => {
    setNldtCategoryIsForm(param);
  }
  const NldtHandleCategoryCloseForm = (param) => {
    setNldtCategoryIsForm(param);
  }
  const NldtHandleCategorySubmit = (param) => {
    let id = NldtCategories[NldtCategories.length - 1].NldtId;
    console.log("Mã:", id);
    param.NldtId = id + 1;
    NldtCategories.push(param);
    setNldtCategories((prev) => {
      return [...prev];
    })
    setNldtCategoryIsForm(false);
  }
  //hàm xử lý sự kiện xóa
  const NldthandleDelete = (NldtId)=>{
    console.log("App-Delete-NldtId:",NldtId);
    // const NldtResponse = axios.delete(`https://666c2e2e49dbc5d7145cfd4f.mockapi.io/Nldtapi/Nldtv1/NldtCategory/${NldtId}`);
    const NldtResponse = axios.delete(`NldtCategory/${NldtId}`);
    console.log("NldtResponse-Delete",NldtResponse);
    let Nldtdelete = NldtCategories.filter(x=>x.NldtId !== NldtId);
    setNldtCategories(Nldtdelete);
    console.log("Deleted:",Nldtdelete);
  }
  const NldthandleEdit =(NldtCategory)=>{
    setNldtCategoryEdit(NldtCategory);
    setNldtCategoryIsForm(true);
  }
  return (
    <div className="container border my-3">
      <h1> nguyen le duc thanh- Call API</h1>

      <NldtCategory renderNldtCategories={NldtCategories}
        onAddNew={NldtHandleAddNew}
        onNldtDelete={NldthandleDelete} 
        onNldtEdit={NldthandleEdit}/>
      <hr />
      {
        NldtCategoryIsForm === true ? <NldtCategoryForm
          renderNldtCategory = {NldtCategoryEdit}
          oncloseForm={NldtHandleCategoryCloseForm}
          onCategorySubmit={NldtHandleCategorySubmit} /> : ""
      }

    </div>
  );
}
export default NldtApp;