import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { getAllAuthor, getAllGenres, updateComicById } from "../../CRUD";

const ModelUpdateComic = (props) => {
  const { showUpdate, setShowUpdate, selectedComicId, fetchListComic } = props; // Nhận thêm prop `authorId`

  const [tentruyen, setNewTenTruyen] = useState("");
  const [anhbia, setNewAnhBia] = useState("");
  const [noidung, setNewNoiDung] = useState("");
  const [tinhtrang, setNewTinhTrang] = useState("");
  const [mota, setNewMoTa] = useState("");
  const [ghichu, setNewGhiChu] = useState("");
  const [theloai, setNewTheLoai] = useState("");
  const [tentacgia, setNewTacGia] = useState("");

  const handleClose = () => {
    setShowUpdate(false);
    setNewTenTruyen("");
    setNewAnhBia("");
    setNewNoiDung("");
    setNewTinhTrang("");
    setNewMoTa("");
    setNewGhiChu("");
    setNewTheLoai("");
    setNewTacGia("");
  };

  const [listAuthor, setListAuthor] = useState([]);
  const [listGenres, setListGenres] = useState([]);

  useEffect(() => {
    fetchListAuthor();
    fetchListGenre();
  }, [showUpdate]);

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

  useEffect(() => {
    if (selectedComicId) {
      setNewTenTruyen(selectedComicId.teN_TRUYEN);
      setNewAnhBia(selectedComicId.anH_BIA);
      setNewNoiDung(selectedComicId.noI_DUNG_TRUYEN);
      setNewTinhTrang(selectedComicId.tinH_TRANG);
      setNewMoTa(selectedComicId.mO_TA_TRUYEN);
      setNewGhiChu(selectedComicId.ghI_CHU_TRUYEN);
      setNewTheLoai(selectedComicId.mA_THE_LOAI);
      setNewTacGia(selectedComicId.mA_TAC_GIA);
    }
  }, [selectedComicId]);

  const handleSubmitUpdateComic = async () => {
    try {
      const updatedComic = {
        teN_TRUYEN: tentruyen,
        anH_BIA: anhbia,
        noI_DUNG_TRUYEN: noidung,
        tinH_TRANG: tinhtrang,
        mO_TA_TRUYEN: mota,
        ghI_CHU_TRUYEN: ghichu,
        olD_MA_THE_LOAI: selectedComicId.mA_THE_LOAI[0],
        olD_MA_TAC_GIA: selectedComicId.mA_TAC_GIA[0],
        mA_THE_LOAI: parseInt(theloai[0]),
        mA_TAC_GIA: parseInt(tentacgia[0]),
      };

      console.log("Comic ID to update:", selectedComicId.mA_TRUYEN);
      if (!selectedComicId) {
        toast.error("Comic ID is missing or invalid!");
        return;
      }

      // Call the update API
      let data = await updateComicById(selectedComicId.mA_TRUYEN, updatedComic);
      console.log("Update response:", data);

      // Fetch the updated comic list
      await fetchListComic();

      // Show a success message
      toast.success("Update successful!");
      console.log("Updating comic...");
      // Reload the page
      window.location.reload();
    } catch (error) {
      toast.error("Update failed! Check the console for more details.");
      console.error("Update error:", error);
    }
  };
  console.log("check", selectedComicId);
  // showValueUpdate();
  return (
    <>
      <Modal
        show={showUpdate}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="model-add-user"
      >
        <h1 style={{ textAlign: "center" }}>Update Comic</h1>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">TÊN TRUYỆN</label>
              <input
                type="text"
                className="form-control"
                value={tentruyen}
                onChange={(event) => setNewTenTruyen(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">ẢNH BÌA</label>
              <input
                type="text"
                className="form-control"
                value={anhbia}
                onChange={(event) => setNewAnhBia(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">NỘI DUNG</label>
              <input
                type="text"
                className="form-control"
                value={noidung}
                onChange={(event) => setNewNoiDung(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">TÌNH TRẠNG</label>
              <input
                type="text"
                className="form-control"
                value={tinhtrang}
                onChange={(event) => setNewTinhTrang(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">MÔ TẢ</label>
              <input
                type="text"
                className="form-control"
                value={mota}
                onChange={(event) => setNewMoTa(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">GHI CHÚ</label>
              <input
                type="text"
                className="form-control"
                value={ghichu}
                onChange={(event) => setNewGhiChu(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">THỂ LOẠI</label>
              <select
                className="form-select"
                value={theloai}
                onChange={(event) => setNewTheLoai(event.target.value)}
              >
                {listGenres.map((item, index) => (
                  <option value={item.mA_THE_LOAI}>{item.teN_THE_LOAI}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">TÁC GIẢ</label>
              <select
                className="form-select"
                value={tentacgia}
                onChange={(event) => setNewTacGia(event.target.value)}
              >
                {listAuthor.map((item, index) => (
                  <option key={index} value={item.mA_TAC_GIA}>
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
          <Button variant="primary" onClick={() => handleSubmitUpdateComic()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelUpdateComic;
