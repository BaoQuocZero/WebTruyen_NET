
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postNewGenres } from '../../CRUD';
import { toast } from 'react-toastify';

const ModelCreateGenres = (props) => {

    const { showGenre, setShowGenre, fetchListGenre } = props;

    const handleClose = () => {
        setShowGenre(false);
        setTheLoai("");
        setChoGioiTinh("Nam");
    };

    const [tentheloai, setTheLoai] = useState("");
    const [gioitinh, setChoGioiTinh] = useState("Nam");


    const handleCreateNewGenres = async () => {
        let data = await postNewGenres(tentheloai, gioitinh)
        console.log("Component res = ", data)
        handleClose();
        await fetchListGenre();
    };

    return (
        <>
            <Modal
                show={showGenre}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='model-add-user'
            >
                <h1 style={{ textAlign: 'center' }}>Create Genre</h1>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">TÊN THỂ LOẠI</label>
                            <input
                                type="text"
                                className="form-control"
                                value={tentheloai}
                                onChange={(event) => setTheLoai(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">CHO GIỚI TÍNH</label>
                            <select className="form-select"
                                onChange={(event) => setChoGioiTinh(event.target.value)}>
                                <option value="Nam">NAM</option>
                                <option value="Nữ">NỮ</option>
                                <option value="Tất cả">TẤT CẢ</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleCreateNewGenres()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelCreateGenres;