// src/components/TacGiaComponent.js
import '../Style.css';
import { FaRegPlusSquare } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { getAllGenres } from '../../CRUD';
import Nav from '../../Nav/Nav';
import '../Style.css';
import ModelCreateGenres from './ModelCreateGenre';
import ModelUpdateGenres from './ModelUpdateGenre';

const Genre = (props) => {
    const [showModalCreateGenres, setShowModalCreateGenres] = useState(false);
    const [showModalUpdateGenres, setShowModalUpdateGenres] = useState(false);

    const [TheLoai, setTheLoai] = useState(
        {
            mA_THE_LOAI: '',
            teN_THE_LOAI: '',
            chO_GIOI_TINH: '',
            thuoCs: '',
        }
    );

    const handleClickUpdate = (item) => {
        setTheLoai({
            mA_THE_LOAI: item.mA_THE_LOAI,
            teN_THE_LOAI: item.teN_THE_LOAI,
            chO_GIOI_TINH: item.chO_GIOI_TINH,
            thuoCs: item.thuoCs,
        });
    }

    const [listGenres, setListGenres] = useState([]);

    useEffect(() => {
        fetchListGenre();
    }, []);

    const fetchListGenre = async () => {
        let res = await getAllGenres();
        console.log("res=", res.data);

        setListGenres(res.data);
    };

    return (
        <>
            <Nav />
            <div className='genres-container'>
                <div className='btn btn-primary'>
                    <button className="btn btn-primary "
                        onClick={() =>
                            setShowModalCreateGenres(true)
                        }>
                        <FaRegPlusSquare /> Add new Genres
                    </button>
                </div>
                <ModelCreateGenres
                    showGenre={showModalCreateGenres}
                    setShowGenre={setShowModalCreateGenres}
                    fetchListGenre={fetchListGenre}
                />
                <div className='genres-content'>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <td scope="col">Mã thể loại</td>
                                <td scope="col">Tên thể loại</td>
                                <td scope="col">Cho giới tính</td>
                                <td scope="col">Thuộc</td>
                                <td scope="col">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {listGenres &&
                                listGenres.length > 0 &&
                                listGenres.map((item, index) => {
                                    return (
                                        <tr key={`table-user-${index}`}>
                                            <td>{item.mA_THE_LOAI}</td>
                                            <td>{item.teN_THE_LOAI}</td>
                                            <td>{item.chO_GIOI_TINH}</td>
                                            <td>{item.thuoCs}</td>
                                            <td>
                                                <button className="btn btn-warning mx-3"
                                                    onClick={() => {
                                                        handleClickUpdate(item);
                                                        setShowModalUpdateGenres(true)
                                                    }}>
                                                    Update
                                                </button>
                                                <ModelUpdateGenres
                                                    showUpdate={showModalUpdateGenres}
                                                    setShowUpdate={setShowModalUpdateGenres}
                                                    selectedGenreId={TheLoai}
                                                    fetchListGenre={fetchListGenre}
                                                />
                                                <button className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            {listGenres && listGenres.length === 0 && (
                                <tr>
                                    <td colSpan={"4"} style={{ textAlign: "center" }}>
                                        Not found data
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    );
};

export default Genre;
