import '../Style.css';
import { FaRegPlusSquare } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { getAllAuthor, deleteAuthorById } from '../../CRUD';
import '../Style.css';
import ModelUpdateAuthor from './ModelUpdateAuthor';
import ModelCreateAuthor from './ModelCreateAuthor';


const Author = (props) => {
  const [showModalCreateAuthor, setShowModalCreateAuthor] = useState(false);
  const [showModalUpdateAuthor, setShowModalUpdateAuthor] = useState(false);

  const [TacGia, setTacGia] = useState(
    {
      mA_TAC_GIA: '',
      teN_TAC_GIA: '',
      sanG_TACs: '',
      gioI_TINH_TAC_GIA: '',
      quoC_GIA_TAC_GIA: ''
    }
  );

  const handleClickUpdate = (item) => {
    setTacGia({
      mA_TAC_GIA: item.mA_TAC_GIA,
      teN_TAC_GIA: item.teN_TAC_GIA,
      sanG_TACs: item.sanG_TACs,
      gioI_TINH_TAC_GIA: item.gioI_TINH_TAC_GIA,
      quoC_GIA_TAC_GIA: item.quoC_GIA_TAC_GIA,
    });
  };

  const handleDeleteAuthor = async (id) => {
    if (window.confirm("Are you sure you want to delete this author?")) {
      console.log("id=", id)
      await deleteAuthorById(id);
      await fetchListAuthor();
    }
  };

  const [listAuthor, setListAuthor] = useState([]);

  useEffect(() => {
    fetchListAuthor();
  }, []);

  const fetchListAuthor = async () => {
    let res = await getAllAuthor();
    console.log("res=", res.data);
    setListAuthor(res.data);
  };

  return (
    <>
      <div className='author-container'>
        <div className='btn btn-primary'>
          <button className="btn btn-primary"
            onClick={() =>
              setShowModalCreateAuthor(true)}>
            <FaRegPlusSquare /> Add new author
          </button>
        </div>
        <ModelCreateAuthor
          show={showModalCreateAuthor}
          setShow={setShowModalCreateAuthor}
          fetchListAuthor={fetchListAuthor}
        />
        <div className='author-content'>
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <td scope="col">Mã tác giả</td>
                <td scope="col">Tên tác giả</td>
                <td scope="col">Sáng tác</td>
                <td scope="col">Giới tính</td>
                <td scope="col">Quốc gia</td>
                <td scope="col">Action</td>
              </tr>
            </thead>
            <tbody>
              {listAuthor &&
                listAuthor.length > 0 &&
                listAuthor.map((item, index) => {
                  return (
                    <tr key={`table-user-${index}`}>
                      <td>{item.mA_TAC_GIA}</td>
                      <td>{item.teN_TAC_GIA}</td>
                      <td>{item.sanG_TACs}</td>
                      <td>{item.gioI_TINH_TAC_GIA}</td>
                      <td>{item.quoC_GIA_TAC_GIA}</td>
                      <td>
                        <button
                          className="btn_update btn btn-warning mx-2"
                          onClick={() => {
                            handleClickUpdate(item);
                            setShowModalUpdateAuthor(true); // Hiển thị modal cập nhật
                          }}
                        >
                          Update
                        </button>
                        <ModelUpdateAuthor
                          showUpdate={showModalUpdateAuthor}
                          setShowUpdate={setShowModalUpdateAuthor}
                          selectedAuthorId={TacGia} // Truyền ID vào modal
                          fetchListAuthor={fetchListAuthor}
                        />
                        <button className="btn_delete btn btn-danger mx-2" onClick={() => { handleDeleteAuthor(item.mA_TAC_GIA) }}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              {listAuthor && listAuthor.length === 0 && (
                <tr>
                  <td colSpan={"5"} style={{ textAlign: "center" }}>
                    Not found data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Author;
