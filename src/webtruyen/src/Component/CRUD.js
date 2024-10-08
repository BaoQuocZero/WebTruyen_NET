// src/api.js

import axios from "axios";

//Tác giả
const getAllArist = () => {
  return axios.get("https://localhost:7003/api/TacGia");
};

const postNewArtist = (tentacgia, gioitinh, quocgia) => {
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


//Truyện tranhpo==
const getAllComic = () => {
  return axios.get("https://localhost:7003/api/TruyenTranh");
};

// const postNewComis = (tentacgia, gioitinh, quocgia) => {
//   const data = new FormData();
//   const newData = [];
//   data.append('teN_TAC_GIA', tentacgia);
//   data.append('gioI_TINH_TAC_GIA', gioitinh);
//   data.append('quoC_GIA_TAC_GIA', quocgia);
//   newData.push({
//     teN_TAC_GIA: tentacgia,
//     gioI_TINH_TAC_GIA: gioitinh,
//     quoC_GIA_TAC_GIA: quocgia
//   });
//   console.log("check data: ", newData[0]);

//   return axios.post("https://localhost:7003/api/TacGia", newData[0]);
// }

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
}

export {
  getAllArist,
  postNewArtist,
  getAllComic,
  getAllGenres,
  postNewGenres,
  updateAuthorById,
};

//Hàm thêm tác giả
// const addTacGia = async (tacGia) => {
//     try {
//         const response = await axios.post(`https://localhost:7003/TacGia`, tacGia);
//         return response.data;
//     } catch (error) {
//         console.error("Error adding Tac Gia:", error);
//         throw error;
//     }
// };

// // Hàm cập nhật tác giả
// export const updateTacGia = async (id, tacGia) => {
//     try {
//         const response = await axios.put(`https://localhost:7003/TacGia/${id}`, tacGia);
//         return response.data;
//     } catch (error) {
//         console.error("Error updating Tac Gia:", error);
//         throw error;
//     }
// };

// // Hàm xóa tác giả
// export const deleteTacGia = async (id) => {
//     try {
//         await axios.delete(`https://localhost:7003/TacGia/${id}`);
//     } catch (error) {
//         console.error("Error deleting Tac Gia:", error);
//         throw error;
//     }
// };

// // Hàm lấy tác giả theo ID
// export const fetchTacGiaById = async (id) => {
//     try {
//         const response = await axios.get(`https://localhost:7003/TacGia/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching Tac Gia by ID:", error);
//         throw error;
//     }
// };
