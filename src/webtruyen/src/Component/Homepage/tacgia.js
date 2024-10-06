// src/components/TacGiaComponent.js
import './Style.css';

const TacGiaComponent = (props) => {

  const { listArtist } = props;

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <td scope="col">Tên tác giả</td>
            <td scope="col">Sáng tác</td>
            <td scope="col">Giới tính</td>
            <td scope="col">Quốc gia</td>
            <td scope="col">Action</td>
          </tr>
        </thead>
        <tbody>
          {listArtist &&
            listArtist.length > 0 &&
            listArtist.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{item.teN_TAC_GIA}</td>
                  <td>{item.sanG_TACs}</td>
                  <td>{item.gioI_TINH_TAC_GIA}</td>
                  <td>{item.quoC_GIA_TAC_GIA}</td>
                  <td>
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
