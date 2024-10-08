
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegPlusSquare } from "react-icons/fa";
import { toast } from 'react-toastify';
import { updateAuthorById } from '../../CRUD';

const ModelUpdateGenres = (props) => {

    const { showUpdate, setShowUpdate } = props;

    const handleClose = () => {
        setShowUpdate(false);
        setNewTheLoai("");
        setNewGioiTinh("Nam");
    };

    const [tentacgia, setNewTheLoai] = useState("");
    const [gioitinh, setNewGioiTinh] = useState("Nam");

    const handleSubmitUpdateAuthor = async () => {

        let data = await updateAuthorById(tentacgia, gioitinh)
        console.log("Component res = ", data)
        toast.success("Update succeed!!!");
        handleClose();
        window.location.reload();
    };

    return (
        <>
            <Modal
                show={showUpdate}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='model-add-user'
            >
                <h1 style={{ textAlign: 'center' }}>Update</h1>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">THỂ LOẠI MỚI</label>
                            <input
                                type="text"
                                className="form-control"
                                value={tentacgia}
                                onChange={(event) => setNewTheLoai(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">GIỚI TÍNH MỚI</label>
                            <select className="form-select" onChange={(event) => setNewGioiTinh(event.target.value)}>
                                <option value="nam">NAM</option>
                                <option value="nu">NỮ</option>
                                <option value="khac">KHÁC</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateAuthor()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelUpdateGenres;