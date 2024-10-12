
import axios from "axios";



//------------------------Tác giả--------------------------
const getAllAuthor = () => {
  return axios.get("https://localhost:7003/api/TacGia");
};

const postNewAuthor = (tentacgia, gioitinh, quocgia) => {
  return axios.post("https://localhost:7003/api/TacGia", {
    teN_TAC_GIA: tentacgia,
    gioI_TINH_TAC_GIA: gioitinh,
    quoC_GIA_TAC_GIA: quocgia
  });
};

const updateAuthorById = async (id, updatedAuthor) => {
  try {
    // Đảm bảo ID đúng kiểu và URL chính xác
    console.log("id", updatedAuthor);
    const response = await axios.put(`https://localhost:7003/api/TacGia/id?id=${id}`, updatedAuthor);
    return response.data;
  } catch (error) {
    console.error("Error updating author:", error);
    throw error;
  }
};

const deleteAuthorById = async (id) => {
  try {
    // Đảm bảo ID đúng kiểu và URL chính xác
    const response = await axios.delete(`https://localhost:7003/api/TacGia/id?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error updating author:", error);
    throw error;
  }
};




//---------------Truyện tranh--------------
const getAllComic = () => {
  return axios.get("https://localhost:7003/api/TruyenTranh");
};

const postNewComis = (tentruyen, anhbia, noidung, tinhtrang, mota, ghichu, theloai, tentacgia) => {
  return axios.post("https://localhost:7003/api/TruyenTranh", {
    teN_TRUYEN: tentruyen,
    anH_BIA: anhbia,
    noI_DUNG_TRUYEN: noidung,
    tinH_TRANG: tinhtrang,
    mO_TA_TRUYEN: mota,
    ghI_CHU_TRUYEN: ghichu,
    mA_THE_LOAI: theloai,
    mA_TAC_GIA: tentacgia
  });
};

const updateComicById = async (id, updatedComic) => {
  try {
    // Đảm bảo ID đúng kiểu và URL chính xác
    console.log("update=", updatedComic);
    const response = await axios.put(`https://localhost:7003/api/TruyenTranh/id?id=${id}`, updatedComic);
    // teN_TRUYEN: tentruyen,
    // anH_BIA: anhbia,
    // noI_DUNG_TRUYEN: noidung,
    // tinH_TRANG: tinhtrang,
    // mO_TA_TRUYEN: mota,
    // ghI_CHU_TRUYEN: ghichu,
    // olD_MA_THE_LOAI: id_MATL,
    // olD_MA_TAC_GIA: id_MATG,
    // mA_THE_LOAI: theloai,
    // mA_TAC_GIA: tentacgia

    return response.data;
  } catch (error) {
    console.error("Error updating author:", error);
    throw error;
  }
};

const deleteComicById = async (id) => {
  try {
    // Đảm bảo ID đúng kiểu và URL chính xác
    const response = await axios.delete(`https://localhost:7003/api/TruyenTranh/id?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error updating author:", error);
    throw error;
  }
};



//---------------Thể loại--------------------
const getAllGenres = () => {
  return axios.get("https://localhost:7003/api/TheLoai");
};

const postNewGenres = (tentheloai, gioitinh) => {
  return axios.post("https://localhost:7003/api/TheLoai", {
    teN_THE_LOAI: tentheloai,
    chO_GIOI_TINH: gioitinh
  });
};

const updateGenreById = async (id, updatedGenre) => {
  try {
    // Đảm bảo ID đúng kiểu và URL chính xác
    console.log("id", updatedGenre);
    const response = await axios.put(`https://localhost:7003/api/TheLoai/id?id=${id}`, updatedGenre);
    return response.data;
  } catch (error) {
    console.error("Error updating author:", error);
    throw error;
  }
};

const deleteGenresById = async (id) => {
  try {
    // Đảm bảo ID đúng kiểu và URL chính xác
    const response = await axios.delete(`https://localhost:7003/api/TheLoai/id?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error updating author:", error);
    throw error;
  }
};

export {
  //Tacgia
  getAllAuthor,
  postNewAuthor,
  updateAuthorById,
  deleteAuthorById,

  //Truyentranh
  getAllComic,
  postNewComis,
  updateComicById,
  deleteComicById,

  //Theloai
  getAllGenres,
  postNewGenres,
  updateGenreById,
  deleteGenresById,
};