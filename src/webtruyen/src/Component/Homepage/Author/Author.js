import '../Style.css';
import { FaRegPlusSquare } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { getAllAuthor, getAllComicByAuthor, getAllComic } from '../../CRUD';
import ModelUpdateAuthor from './ModelUpdateAuthor';
import ModelCreateAuthor from './ModelCreateAuthor';
import Modal_Delete_Author from './Modal_Delete_Author';
import { toast } from 'react-toastify'; // Nếu bạn sử dụng react-toastify để hiển thị thông báo

const Author = (props) => {
  const [showModalCreateAuthor, setShowModalCreateAuthor] = useState(false);
  const [showModalUpdateAuthor, setShowModalUpdateAuthor] = useState(false);
  const [showModal_Delete_Author, setshowModal_Delete_Author] = useState(false);

  const [TacGia, setTacGia] = useState(null); // Khởi tạo TacGia là null
  const [listAuthor, setListAuthor] = useState([]);
  const [listComic, setListComic] = useState([]);

  const handleClickUpdate = (item) => {
    setTacGia({
      mA_TAC_GIA: item.mA_TAC_GIA,
      teN_TAC_GIA: item.teN_TAC_GIA,
      sanG_TACs: item.sanG_TACs,
      gioI_TINH_TAC_GIA: item.gioI_TINH_TAC_GIA,
      quoC_GIA_TAC_GIA: item.quoC_GIA_TAC_GIA,
    });
    setShowModalUpdateAuthor(true); // Hiển thị Modal Update
  };

  const handleDeleteAuthor = (item) => {
    setTacGia({
      MA_TAC_GIA: item.mA_TAC_GIA,
      TEN_TAC_GIA: item.teN_TAC_GIA,
      SANG_TAC: item.sanG_TACs,
      GIOI_TINH_TAC_GIA: item.gioI_TINH_TAC_GIA,
      QUOC_GIA_TAC_GIA: item.quoC_GIA_TAC_GIA,
    });
    fetchListComicByAuthor(item);
    setshowModal_Delete_Author(true); // Hiển thị Modal Delete
  };

  useEffect(() => {
    fetchListAuthor();
  }, []);

  const fetchListComicByAuthor = async (item) => {
    try {
      let TruyenTranh = await getAllComicByAuthor(item.mA_TAC_GIA);
      if (TruyenTranh.status === 200) {
        setListComic(TruyenTranh.data);
      }
      console.log("TruyenTranh =", TruyenTranh.data);
    } catch (error) {
      console.error("Fetch list comic error:", error);
      toast.error("Không lấy được danh sách truyện tranh!");
    }
  };

  const fetchListAuthor = async () => {
    try {
      let res = await getAllAuthor();
      console.log("res=", res.data);
      setListAuthor(res.data);
    } catch (error) {
      console.error("Fetch list author error:", error);
      toast.error("Không lấy được danh sách tác giả!");
    }
  };

  return (
    <>
      <div className='author-container'>
        <div className='btn btn-primary'>
          <button className="btn btn-primary"
            onClick={() =>
              setShowModalCreateAuthor(true)}>
            <FaRegPlusSquare /> NEW
          </button>

        </div>
        <div className='author-content'>
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">Mã tác giả</th>
                <th scope="col">Tên tác giả</th>
                {/* <th scope="col">Sáng tác</th> */}
                <th scope="col">Giới tính</th>
                <th scope="col">Quốc gia</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {listAuthor && listAuthor.length > 0 ? (
                listAuthor.map((item, index) => (
                  <tr key={`table-user-${index}`}>
                    <td>{item.mA_TAC_GIA}</td>
                    <td>{item.teN_TAC_GIA}</td>
                    {/* <td>{item.sanG_TACs}</td> */}
                    <td>{item.gioI_TINH_TAC_GIA}</td>
                    <td>{item.quoC_GIA_TAC_GIA}</td>
                    <td>
                      <button
                        className="btn_update btn btn-warning mx-2"
                        onClick={() => handleClickUpdate(item)}
                      >
                        Update
                      </button>

                      <button
                        className="btn_delete btn btn-danger mx-2"
                        onClick={() => handleDeleteAuthor(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={"5"} style={{ textAlign: "center" }}>
                    Not found data
                  </td>
                </tr>
              )}
            </tbody>
            <ModelCreateAuthor
              show={showModalCreateAuthor}
              setShow={setShowModalCreateAuthor}
              fetchListAuthor={fetchListAuthor}
            />

            {/* Modal Update Author */}
            {TacGia && (
              <ModelUpdateAuthor
                showUpdate={showModalUpdateAuthor}
                setShowUpdate={setShowModalUpdateAuthor}
                selectedAuthorId={TacGia} // Truyền ID vào modal
                fetchListAuthor={fetchListAuthor}
              />
            )}

            {/* Modal Delete Author */}
            {TacGia && (
              <Modal_Delete_Author
                show={showModal_Delete_Author}
                setShow={setshowModal_Delete_Author}
                TacGia={TacGia}
                listComic={listComic}
                fetchListAuthor={fetchListAuthor}
              />
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default Author;