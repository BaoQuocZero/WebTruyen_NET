import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { updateAuthorById } from '../../CRUD';

const ModelUpdateAuthor = (props) => {
    const { showUpdate, setShowUpdate, selectedAuthorId } = props; // Nhận thêm prop `authorId`

    const [tentacgia, setNewTenTacGia] = useState("");
    const [gioitinh, setNewGioiTinh] = useState("Nam");
    const [quocgia, setNewQuocGia] = useState("");

    const showValueUpdate = () => {
        setNewTenTacGia(selectedAuthorId.mA_TAC_GIA);
        setNewGioiTinh(selectedAuthorId.gioI_TINH_TAC_GIA);
        setNewQuocGia(selectedAuthorId.quoC_GIA_TAC_GIA);
    }

    const handleClose = () => {
        setShowUpdate(false);
        setNewTenTacGia("");
        setNewGioiTinh("Nam");
        setNewQuocGia("");
    };


    useEffect(() => {
        if (selectedAuthorId) {
            setNewTenTacGia(selectedAuthorId.teN_TAC_GIA);
            setNewGioiTinh(selectedAuthorId.gioI_TINH_TAC_GIA);
            setNewQuocGia(selectedAuthorId.quoC_GIA_TAC_GIA);
        }
    }, [selectedAuthorId])
    const handleSubmitUpdateAuthor = async () => {
        try {
            const updatedAuthor = {
                teN_TAC_GIA: tentacgia,
                gioI_TINH_TAC_GIA: gioitinh,
                quoC_GIA_TAC_GIA: quocgia
            };

            console.log("Author ID to update:", selectedAuthorId.mA_TAC_GIA);
            if (!selectedAuthorId) {
                toast.error("Author ID is missing or invalid!");
                return;
            }

            let data = await updateAuthorById(selectedAuthorId.mA_TAC_GIA, updatedAuthor);
            console.log("Update response:", data);
            handleClose();
            toast.success("Update succeed!!!");
        } catch (error) {
            toast.error("Update failed! Check the console for more details.");
            console.error("Update error:", error);
        }
    };
    console.log("check", selectedAuthorId);
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
                            <label className="form-label">Tên Tác Giả</label>
                            <input
                                type="text"
                                className="form-control"
                                value={tentacgia}
                                onChange={(event) => setNewTenTacGia(event.target.value)}
                            />
                        </div>


                        <div className="col-md-4">
                            <label className="form-label">Giới Tính</label>
                            <select
                                className="form-select"
                                onChange={(event) => setNewGioiTinh(event.target.value)}
                                value={gioitinh}
                            >
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>

                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Quốc Gia</label>
                            <input
                                type="text"
                                className="form-control"
                                value={quocgia}
                                onChange={(event) => setNewQuocGia(event.target.value)}
                            />
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

export default ModelUpdateAuthor;
