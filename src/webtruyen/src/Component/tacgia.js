// src/components/TacGiaComponent.js

import React, { useEffect, useState } from "react";
import { getAllArist } from "./api";

const TacGiaComponent = (pros) => {
  const [listArtist, setListArtist] = useState([]);

  useEffect(() => {
    fetchListArtist();
  }, []);

  const fetchListArtist = async () => {
    let res = await getAllArist();
    console.log("res=", res);

    setListArtist(res.DT);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <td scope="col">MA_TAC_GIA</td>
            <td scope="col">TEN_TAC_GIA</td>
            <td scope="col">GIOI_TINH_TAC_GIA</td>
            <td scope="col">QUOC_GIA_TAC_GIA</td>
            <td scope="col">Action</td>
          </tr>
        </thead>
        <tbody>
          {listArtist &&
            listArtist.length > 0 &&
            listArtist.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <th>{item.MA_TAC_GIA}</th>
                  <td>{item.TEN_TAC_GIA}</td>
                  <td>{item.GIOI_TINH_TAC_GIA}</td>
                  <td>{item.QUOC_GIA_TAC_GIA}</td>
                  <td>
                    <button className="btn btn-primary">View</button>
                    <button className="btn btn-warning mx-3">Update</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          {listArtist && listArtist.length === 0 && (
            <tr>
              <td colSpan={"4"} style={{ textAlign: "center" }}>
                Not found data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TacGiaComponent;
