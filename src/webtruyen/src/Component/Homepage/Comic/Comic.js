// src/components/TacGiaComponent.js
import '../Style.css';
import { FaRegPlusSquare } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { getAllComic, deleteComicById } from '../../CRUD';
import '../Style.css';
import ModelCreateComic from './ModelCreateComic';
import ModelUpdateComic from './ModelUpdateComic';

const Comic = () => {
    const [showModalCreateComic, setShowModalCreateComic] = useState(false);
    const [showModalUpdateAuthor, setShowModalUpdateAuthor] = useState(false);

    const [truyentranh, setTruyenTranh] = useState([''])

    const [listComic, setListComic] = useState([]);

    useEffect(() => {
        fetchListComic();
    }, []);

    const fetchListComic = async () => {
        let res = await getAllComic();
        console.log("res=", res.data);
        if (res.status === 200) {
            setListComic(res.data);
        } else {

        }

    };

    const handleClickUpdate = (item) => {
        console.log("item=", item)
        setTruyenTranh({
            mA_TRUYEN: item.mA_TRUYEN,
            teN_TRUYEN: item.teN_TRUYEN,
            anH_BIA: item.anH_BIA,
            noI_DUNG_TRUYEN: item.noI_DUNG,
            tinH_TRANG: item.tinH_TRANG,
            mO_TA_TRUYEN: item.mO_TA_TRUYEN,
            ghI_CHU_TRUYEN: item.ghI_CHU_TRUYEN,
            mA_TAC_GIA: item.mA_TAC_GIA,
            mA_THE_LOAI: item.mA_THE_LOAI,
        });
    };

    const handleDeleteComic = async (id) => {
        if (window.confirm("Are you sure you want to delete this comic?")) {
            console.log("id=", id)
            await deleteComicById(id);
            // Cập nhật lại danh sách sau khi xóa
            await fetchListComic();
        }
    };


    return (
        <>
            <div className='comic-container'>
                <div className='btn btn-primary'>
                    <button className="btn btn-primary"
                        onClick={() =>
                            setShowModalCreateComic(true)}>
                        <FaRegPlusSquare /> NEW
                    </button>
                </div>
                <ModelCreateComic
                    show={showModalCreateComic}
                    setShow={setShowModalCreateComic}
                    fetchListComic={fetchListComic}
                />

                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <td scope="col">Mã truyện</td>
                            <td scope="col">Tên truyện</td>
                            {/* <td scope="col">Ảnh bìa</td> */}
                            <td scope="col">Mô tả</td>
                            <td scope="col">Ghi chú</td>
                            {/* <td scope="col" hidden>Mã thể loại</td>
                            <td scope="col" hidden>Mã tác giả</td> */}
                            <td scope="col">Nội dung</td>
                            <td scope="col">Tình trạng</td>
                            <td scope="col">Thể loại</td>
                            <td scope="col">Cho giới tính</td>
                            <td scope="col">Tác giả</td>
                            <td scope="col">Quốc gia tác giả</td>
                            <td scope="col">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listComic &&
                            listComic.length > 0 &&
                            listComic.map((item, index) => {
                                return (
                                    <tr key={`table-user-${index}`}>
                                        <td>{item.mA_TRUYEN}</td>
                                        <td>{item.teN_TRUYEN}</td>
                                        {/* <td>{item.anH_BIA}</td> */}
                                        <td>{item.mO_TA_TRUYEN}</td>
                                        <td>{item.ghI_CHU_TRUYEN}</td>
                                        {/* <td>{item.mA_THE_LOAI}</td>
                                        <td>{item.mA_TAC_GIA}</td> */}
                                        <td>{item.noI_DUNG}</td>
                                        <td>{item.tinH_TRANG}</td>
                                        <td>{Array.isArray(item.thE_LOAI) ? item.thE_LOAI.join(', ') : item.thE_LOAI}</td>
                                        <td>{Array.isArray(item.chO_GIOI_TINH) ? item.chO_GIOI_TINH.join(', ') : item.chO_GIOI_TINH}</td>
                                        <td>{Array.isArray(item.teN_TAC_GIA) ? item.teN_TAC_GIA.join(', ') : item.teN_TAC_GIA}</td>
                                        <td>{Array.isArray(item.quoC_GIA_TAC_GIA) ? item.quoC_GIA_TAC_GIA.join(', ') : item.quoC_GIA_TAC_GIA}</td>
                                        <td>
                                            <button
                                                className="btn_update btn btn-warning mx-2 my-1"
                                                onClick={() => {
                                                    handleClickUpdate(item);
                                                    setShowModalUpdateAuthor(true); // Hiển thị modal cập nhật
                                                }}
                                            >
                                                Update
                                            </button>

                                            <button className="btn_delete btn btn-danger mx-2 my-1"
                                                onClick={() => { handleDeleteComic(item.mA_TRUYEN) }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        {listComic && listComic.length === 0 && (
                            <tr>
                                <td colSpan={"12"} style={{ textAlign: "center" }}>
                                    Not found data
                                </td>
                            </tr>
                        )}
                        <ModelUpdateComic
                            showUpdate={showModalUpdateAuthor}
                            setShowUpdate={setShowModalUpdateAuthor}
                            selectedComicId={truyentranh} // Truyền ID vào modal
                            fetchListComic={fetchListComic}
                        />
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Comic;
