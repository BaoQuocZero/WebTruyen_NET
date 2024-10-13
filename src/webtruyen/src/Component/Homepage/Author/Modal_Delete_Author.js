import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteAuthorById, getAllComicByAuthor } from '../../CRUD';

const Modal_Delete_Author = (props) => {

    const { show, setShow, TacGia, listComic, fetchListAuthor } = props;

    const handleClose = () => {
        setShow(false);
    };

    const Xac_nhan_xoa_TacGia = async (TacGia) => {
        console.log("TacGia", TacGia)
        await deleteAuthorById(TacGia.MA_TAC_GIA);
        handleClose();
        await fetchListAuthor();
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
                <h1 style={{ textAlign: 'center' }}>Các tác phẩm của {TacGia.TEN_TAC_GIA} sẽ mất tác giả ?</h1>
                <Modal.Body>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                {/* <td scope="col">Mã truyện</td> */}
                                <td scope="col">Tên truyện</td>
                                {/* <td scope="col">Ảnh bìa</td> */}
                                <td scope="col">Mô tả</td>
                                <td scope="col">Ghi chú</td>
                                {/* <td scope="col" hidden>Mã thể loại</td>
                            <td scope="col" hidden>Mã tác giả</td> */}
                                <td scope="col">Nội dung</td>
                                <td scope="col">Tình trạng</td>
                                <td scope="col">Thể loại</td>
                                <td scope="col">Cho giới tính</td>
                            </tr>
                        </thead>
                        <tbody>
                            {listComic &&
                                listComic.length > 0 &&
                                listComic.map((item, index) => {
                                    return (
                                        <tr key={`table-user-${index}`}>
                                            <td>{item.teN_TRUYEN}</td>
                                            <td>{item.mO_TA_TRUYEN}</td>
                                            <td>{item.ghI_CHU_TRUYEN}</td>
                                            <td>{item.noI_DUNG_TRUYEN}</td>
                                            <td>{item.tinH_TRANG}</td>
                                            <td>{Array.isArray(item.thE_LOAI) ? item.thE_LOAI.join(', ') : item.thE_LOAI}</td>
                                            <td>{Array.isArray(item.chO_GIOI_TINH) ? item.chO_GIOI_TINH.join(', ') : item.chO_GIOI_TINH}</td>
                                        </tr>
                                    );
                                })}
                            {listComic && listComic.length === 0 && (
                                <tr>
                                    <td colSpan={"12"} style={{ textAlign: "center" }}>
                                        Not found data
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="btn btn-danger mx-2" onClick={() => Xac_nhan_xoa_TacGia(TacGia)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Modal_Delete_Author;