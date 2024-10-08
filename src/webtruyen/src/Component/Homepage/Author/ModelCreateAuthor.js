
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegPlusSquare } from "react-icons/fa";
import { toast } from 'react-toastify';
import { postNewArtist } from '../../CRUD';

const ModelCreateAuthor = (props) => {

    const { show, setShow, fetchListArtist } = props;

    const handleClose = () => {
        setShow(false);
        setTenTacGia("");
        setGioiTinh("Nam");
        setQuocGia("");
    };

    const [tentacgia, setTenTacGia] = useState("");
    const [gioitinh, setGioiTinh] = useState("Nam");
    const [quocgia, setQuocGia] = useState("");

    const handleSubmitCreateAuthor = async () => {

        let data = await postNewArtist(tentacgia, gioitinh, quocgia)
        console.log("Component res = ", data)
        toast.success("Thêm thành công");
        handleClose();
        await props.fetchListArtist()
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
                <h1 style={{ textAlign: 'center' }}>Create</h1>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">TÁC GIẢ</label>
                            <input
                                type="text"
                                className="form-control"
                                value={tentacgia}
                                onChange={(event) => setTenTacGia(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">GIỚI TÍNH</label>
                            <select className="form-select" onChange={(event) => setGioiTinh(event.target.value)}>
                                <option value="nam">NAM</option>
                                <option value="nu">NỮ</option>
                                <option value="khac">KHÁC</option>
                            </select>
                        </div>
                        <div className="col-md-6">
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
                    <Button variant="primary" onClick={() => handleSubmitCreateAuthor()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelCreateAuthor;