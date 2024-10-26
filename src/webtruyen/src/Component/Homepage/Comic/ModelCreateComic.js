
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllAuthor, getAllGenres, postNewComis } from '../../CRUD';

const ModelCreateComic = (props) => {

    const { show, setShow, fetchListComic } = props;

    const [listAuthor, setListAuthor] = useState([]);
    const [listGenres, setListGenres] = useState([]);

    useEffect(() => {
        fetchListAuthor();
        fetchListGenre();
    }, []);

    const fetchListAuthor = async () => {
        let res = await getAllAuthor();
        console.log("tacgia=", res.data);
        setListAuthor(res.data);
    };

    const fetchListGenre = async () => {
        let res = await getAllGenres();
        console.log("theloai=", res.data);
        setListGenres(res.data);
    };

    const handleClose = () => {
        setShow(false);
        setTenTruyen("");
        setAnhBia("");
        setNoiDung("");
        setTinhTrang("");
        setMota("");
        setGhichu("");
        setTheLoai("");
        setTenTacGia("");
    };

    const [tentruyen, setTenTruyen] = useState("");
    const [anhbia, setAnhBia] = useState("");
    const [noidung, setNoiDung] = useState("");
    const [tinhtrang, setTinhTrang] = useState("");
    const [mota, setMota] = useState("");
    const [ghichu, setGhichu] = useState("");
    const [theloai, setTheLoai] = useState("");
    const [tentacgia, setTenTacGia] = useState("");

    const handleSubmitCreateComic = async () => {
        let data = await postNewComis(tentruyen, anhbia, noidung, tinhtrang, mota, ghichu, theloai, tentacgia);
        console.log("truyen=", data);
        handleClose();
        await fetchListComic();
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='model-add-user'
            >
                <h1 style={{ textAlign: 'center' }}>Create Comic</h1>
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
                            <label className="form-label">ẢNH BÌA</label>
                            <input
                                type="text"
                                className="form-control"
                                value={anhbia}
                                onChange={(event) => setAnhBia(event.target.value)}
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
                            <label className="form-label">MÔ TẢ</label>
                            <input
                                type="text"
                                className="form-control"
                                value={mota}
                                onChange={(event) => setMota(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">GHI CHÚ</label>
                            <input
                                type="text"
                                className="form-control"
                                value={ghichu}
                                onChange={(event) => setGhichu(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">THỂ LOẠI</label>
                            <select
                                className="form-select"
                                value={theloai}
                                onChange={(event) => setTheLoai(event.target.value)}
                            >
                                {listGenres.map((item) => (
                                    <option key={item.mA_THE_LOAI}>
                                        {item.teN_THE_LOAI}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">TÁC GIẢ</label>
                            <select
                                className="form-select"
                                value={tentacgia}
                                onChange={(event) => setTenTacGia(event.target.value)}
                            >
                                {listAuthor.map((item) => (
                                    <option key={item.mA_TAC_GIA}>
                                        {item.teN_TAC_GIA}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateComic()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelCreateComic;