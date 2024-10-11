// src/api.js

import axios from "axios";

//Tác giả
const getAllAuthor = () => {
  return axios.get("https://localhost:7003/api/TacGia");
};

const postNewAuthor = (tentacgia, gioitinh, quocgia) => {
  const data = new FormData();
  const newData = [];
  data.append('teN_TAC_GIA', tentacgia);
  data.append('gioI_TINH_TAC_GIA', gioitinh);
  data.append('quoC_GIA_TAC_GIA', quocgia);
  newData.push({
    teN_TAC_GIA: tentacgia,
    gioI_TINH_TAC_GIA: gioitinh,
    quoC_GIA_TAC_GIA: quocgia
  });
  console.log("check data: ", newData[0]);

  return axios.post("https://localhost:7003/api/TacGia", newData[0]);
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




//Truyện tranh
const getAllComic = () => {
  return axios.get("https://localhost:7003/api/TruyenTranh");
};

const postNewComis = (tentruyen, anhbia, noidung, tinhtrang, mota, ghichu, theloai, tentacgia) => {
  const data = new FormData();
  const newData = [];
  data.append('teN_TRUYEN', tentruyen);
  data.append('anH_BIA', anhbia);
  data.append('noI_DUNG_TRUYEN', noidung);
  data.append('tinH_TRANG', tinhtrang);
  //data.append('chO_GIOI_TINH', gioitinh);
  data.append('mO_TA_TRUYEN', mota);
  data.append('ghI_CHU_TRUYEN', ghichu);
  data.append('mA_THE_LOAI', theloai);
  data.append('mA_TAC_GIA', tentacgia);
  newData.push({
    teN_TRUYEN: tentruyen,
    anH_BIA: anhbia,
    noI_DUNG_TRUYEN: noidung,
    tinH_TRANG: tinhtrang,
    //chO_GIOI_TINH: gioitinh,
    mO_TA_TRUYEN: mota,
    ghI_CHU_TRUYEN: ghichu,
    mA_THE_LOAI: theloai,
    mA_TAC_GIA: tentacgia
  });
  console.log("check data: ", newData[0]);

  return axios.post("https://localhost:7003/api/TruyenTranh", newData[0]);
}

//Thể loại
const getAllGenres = () => {
  return axios.get("https://localhost:7003/api/TheLoai");
};

const postNewGenres = (tentheloai, gioitinh) => {
  const data = new FormData();
  const newData = [];
  data.append('teN_THE_LOAI', tentheloai);
  data.append('chO_GIOI_TINH', gioitinh);
  newData.push({
    teN_THE_LOAI: tentheloai,
    chO_GIOI_TINH: gioitinh,
  });
  console.log("check data: ", newData[0]);

  return axios.post("https://localhost:7003/api/TheLoai", newData[0]);
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

  //Theloai
  getAllGenres,
  postNewGenres,
  updateGenreById,
  deleteGenresById,
};