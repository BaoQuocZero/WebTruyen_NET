
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegPlusSquare } from "react-icons/fa";
import { toast } from 'react-toastify';
import { updateGenreById } from '../../CRUD';

const ModelUpdateGenres = (props) => {

    const { showUpdate, setShowUpdate, selectedGenreId, fetchListGenre } = props;

    const [tentheloai, setNewTheLoai] = useState("");
    const [gioitinhtheloai, setNewGioiTinh] = useState("Nam");

    const handleClose = () => {
        setShowUpdate(false);
        setNewTheLoai("");
        setNewGioiTinh("Nam");
    };

    useEffect(() => {
        if (selectedGenreId) {
            setNewTheLoai(selectedGenreId.teN_THE_LOAI);
            setNewGioiTinh(selectedGenreId.chO_GIOI_TINH);
        }
    }, [selectedGenreId])

    const handleSubmitUpdateGenres = async () => {
        try {
            const updatedGenre = {
                teN_THE_LOAI: tentheloai,
                chO_GIOI_TINH: gioitinhtheloai,
            };

            console.log("Author ID to update:", selectedGenreId.mA_THE_LOAI);
            if (!selectedGenreId) {
                toast.error("Author ID is missing or invalid!");
                return;
            }

            let data = await updateGenreById(selectedGenreId.mA_THE_LOAI, updatedGenre);
            console.log("Update response:", data);
            handleClose();
            fetchListGenre();

        } catch (error) {
            toast.error("Update failed! Check the console for more details.");
            console.error("Update error:", error);
        }
    };
    console.log("check", selectedGenreId);
    // showValueUpdate(); 

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
                                value={tentheloai}
                                onChange={(event) => setNewTheLoai(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">GIỚI TÍNH MỚI</label>
                            <select
                                className="form-select"
                                onChange={(event) => setNewGioiTinh(event.target.value)}
                                value={gioitinhtheloai}
                            >
                                <option value="Nam">NAM</option>
                                <option value="Nữ">NỮ</option>
                                <option value="Khác">KHÁC</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateGenres()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelUpdateGenres;