// src/api.js

import axios from 'axios';

const getAllArist = () => {
    return axios.get("https://localhost:7003/api/TacGia");
}

export {
    getAllArist
}

// Hàm thêm tác giả
// export const addTacGia = async (tacGia) => {
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
