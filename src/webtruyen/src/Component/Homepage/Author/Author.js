import '../Style.css';
import { FaRegPlusSquare } from "react-icons/fa";
import { useState } from 'react';
import ModelUpdateAuthor from './ModelUpdateAuthor';
import ModelCreateAuthor from './ModelCreateAuthor';

const Author = (props) => {
  const [showModalCreateAuthor, setShowModalCreateAuthor] = useState(false);
  const [showModalUpdateAuthor, setShowModalUpdateAuthor] = useState(false);

  // State để lưu trữ ID tác giả đang được chọn để cập nhật
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
  }

  const { listArtist, fetchListArtist } = props;


  return (
    <>
      <div className='btn btn-primary'>
        <button className="btn btn-primary" onClick={() => setShowModalCreateAuthor(true)}>
          <FaRegPlusSquare /> Add new author
        </button>
      </div>
      <ModelCreateAuthor
        show={showModalCreateAuthor}
        setShow={setShowModalCreateAuthor}
        fetchListArtist={fetchListArtist}
      />
      <table className="table-author table table-hover table-bordered">
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
          {listArtist &&
            listArtist.length > 0 &&
            listArtist.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{item.mA_TAC_GIA}</td>
                  <td>{item.teN_TAC_GIA}</td>
                  <td>{item.sanG_TACs}</td>
                  <td>{item.gioI_TINH_TAC_GIA}</td>
                  <td>{item.quoC_GIA_TAC_GIA}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
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
                    />
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          {listArtist && listArtist.length === 0 && (
            <tr>
              <td colSpan={"5"} style={{ textAlign: "center" }}>
                Not found data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Author;