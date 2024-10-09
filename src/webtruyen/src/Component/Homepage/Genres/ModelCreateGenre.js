
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postNewGenres } from '../../CRUD';
import { toast } from 'react-toastify';

const ModelCreateGenres = (props) => {

    const { showGenre, setShowGenre, fetchListGenre } = props;

    const handleCloseGenre = () => {
        setShowGenre(false);
        setTheLoai("");
        setGioiTinh("Nam");
    };

    const [tentheloai, setTheLoai] = useState("");
    const [gioitinh, setGioiTinh] = useState("Nam");


    const handleCreateNewGenres = async () => {

        let data = await postNewGenres(tentheloai, gioitinh)
        //console.log("check res", res.data)
        console.log("Component res = ", data)
        toast.success("Thêm thành công");
        handleCloseGenre();
        fetchListGenre();
    };

    return (
        <>
            <Modal
                show={showGenre}
                onHide={handleCloseGenre}
                size="xl"
                backdrop="static"
                className='model-add-user'
            >
                <h1 style={{ textAlign: 'center' }}>Create</h1>
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
                            <select className="form-select" onChange={(event) => setGioiTinh(event.target.value)}>
                                <option value="Nam">NAM</option>
                                <option value="Nữ">NỮ</option>
                                <option value="Tất cả">TẤT CẢ</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseGenre}>
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