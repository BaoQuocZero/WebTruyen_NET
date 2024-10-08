// src/components/TacGiaComponent.js
import '../Style.css';
import { FaRegPlusSquare } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { getAllComic } from '../../CRUD';
import Nav from '../../Nav/Nav';
import '../Style.css';

const Comic = (props) => {

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
            <Nav />
            <div className='comic-container'>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <td scope="col">Tên truyện</td>
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
                                        <td>{item.teN_TRUYEN}</td>
                                        <td>{item.noI_DUNG}</td>
                                        <td>{item.tinH_TRANG}</td>
                                        <td>{item.thE_LOAI}</td>
                                        <td>{item.chO_GIOI_TINH}</td>
                                        <td>{item.taC_GIA}</td>
                                        <td>{item.quoC_GIA_TAC_GIA}</td>
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
