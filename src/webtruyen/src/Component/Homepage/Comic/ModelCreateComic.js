
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegPlusSquare } from "react-icons/fa";
import { toast } from 'react-toastify';
import { postNewAuthor, getAllAuthor, getAllGenres } from '../../CRUD';

const ModelCreateComic = (props) => {

    const { show, setShow } = props;

    const [listAuthor, setListAuthor] = useState([]);
    const [listGenres, setListGenres] = useState([]);

    useEffect(() => {
        fetchListAuthor();
        fetchListGenre();
    }, []);

    const fetchListAuthor = async () => {
        let res = await getAllAuthor();
        console.log("res=", res.data);
        setListAuthor(res.data);
    };

    const fetchListGenre = async () => {
        let res = await getAllGenres();
        console.log("res=", res.data);
        setListGenres(res.data);
    };

    const handleClose = () => {
        setShow(false);
        setTenTruyen("");
        setNoiDung("");
        setTinhTrang("");
        setTheLoai("");
        setGioiTinh("");
        setTenTacGia("");
        setQuocGia("");
    };

    const [tentruyen, setTenTruyen] = useState("");
    const [noidung, setNoiDung] = useState("");
    const [tinhtrang, setTinhTrang] = useState("");
    const [theloai, setTheLoai] = useState("");
    const [gioitinh, setGioiTinh] = useState("");
    const [tentacgia, setTenTacGia] = useState("");
    const [quocgia, setQuocGia] = useState("");

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='model-add-user'
            >
                <h1 style={{ textAlign: 'center' }}>Create</h1>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">TÊN TRUYỆN</label>
                            <input
                                type="text"
                                className="form-control"
                                value={tentruyen}
                                onChange={(event) => setTenTruyen(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">NỘI DUNG</label>
                            <input
                                type="text"
                                className="form-control"
                                value={noidung}
                                onChange={(event) => setNoiDung(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">TÌNH TRẠNG</label>
                            <input
                                type="text"
                                className="form-control"
                                value={tinhtrang}
                                onChange={(event) => setTinhTrang(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">THỂ LOẠI</label>
                            <select
                                className="form-select"
                                value={theloai}
                                onChange={(event) => setTheLoai(event.target.value)}
                            >
                                <option value=""></option>
                                {listGenres.map((item, index) => (
                                    <option value={item.teN_THE_LOAI}>
                                        {item.teN_THE_LOAI}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">GIỚI TÍNH</label>
                            <select className="form-select" onChange={(event) => setGioiTinh(event.target.value)}>
                                <option value="Nam">NAM</option>
                                <option value="Nữ">NỮ</option>
                                <option value="Khác">TẤT CẢ</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">TÁC GIẢ</label>
                            <select
                                className="form-select"
                                value={tentacgia}
                                onChange={(event) => setTenTacGia(event.target.value)}
                            >
                                <option value=""></option>
                                {listAuthor.map((item, index) => (
                                    <option value={item.teN_TAC_GIA}>
                                        {item.teN_TAC_GIA}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">QUỐC GIA</label>
                            <input
                                type="text"
                                className="form-control"
                                value={quocgia}
                                onChange={(event) => setQuocGia(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" /*onClick={() => handleSubmitCreateAuthor()}*/>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelCreateComic;