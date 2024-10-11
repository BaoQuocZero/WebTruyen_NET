// src/components/TacGiaComponent.js
import '../Style.css';
import { FaRegPlusSquare } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { getAllAuthor, getAllComic, getAllGenres } from '../../CRUD';
import '../Style.css';
import ModelCreateComic from './ModelCreateComic';

const Comic = (props) => {
    const [showModalCreateComic, setShowModalCreateComic] = useState(false);
    const [listComic, setListComic] = useState([]);

    useEffect(() => {
        fetchListComic();
    }, []);

    const fetchListComic = async () => {
        let res = await getAllComic();
        console.log("res=", res.data);

        setListComic(res.data);
    };

    return (
        <>
            <div className='comic-container'>
                <div className='btn btn-primary'>
                    <button className="btn btn-primary"
                        onClick={() =>
                            setShowModalCreateComic(true)}>
                        <FaRegPlusSquare /> Add new author
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
                            <td scope="col">Tên truyện</td>
                            <td scope="col">Nội dung</td>
                            <td scope="col">Tình trạng</td>
                            {/* <td scope="col">Mô tả</td>
                            <td scope="col">Ghi chú</td> */}
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
                                        <td>{item.teN_TRUYEN}</td>
                                        <td>{item.noI_DUNG}</td>
                                        <td>{item.tinH_TRANG}</td>
                                        {/* <td>{item.mO_TA_TRUYEN}</td>
                                        <td>{item.ghI_CHU_TRUYEN}</td> */}
                                        <td>{Array.isArray(item.thE_LOAI) ? item.thE_LOAI.join(', ') : item.thE_LOAI}</td>
                                        <td>{Array.isArray(item.chO_GIOI_TINH) ? item.chO_GIOI_TINH.join(', ') : item.chO_GIOI_TINH}</td>
                                        <td>{Array.isArray(item.taC_GIA) ? item.taC_GIA.join(', ') : item.taC_GIA}</td>
                                        <td>{Array.isArray(item.quoC_GIA_TAC_GIA) ? item.quoC_GIA_TAC_GIA.join(', ') : item.quoC_GIA_TAC_GIA}</td>
                                        <td>
                                            <button className="btn btn-warning mx-3">Update</button>
                                            <button className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        {listComic && listComic.length === 0 && (
                            <tr>
                                <td colSpan={"4"} style={{ textAlign: "center" }}>
                                    Not found data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Comic;
