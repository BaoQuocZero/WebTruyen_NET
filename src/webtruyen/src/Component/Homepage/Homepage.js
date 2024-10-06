import { getAllArist } from "../CRUD";
import TacGiaComponent from "./tacgia";
import { useState, useEffect } from "react";
import './Style.css';

const Homepage = (props) => {
    const [listArtist, setListArtist] = useState([]);

    useEffect(() => {
        fetchListArtist();
    }, []);

    const fetchListArtist = async () => {
        let res = await getAllArist();
        console.log("res=", res.data);

        setListArtist(res.data);
    };
    return (
        <div className="tacgia_container">
            <TacGiaComponent listArtist={listArtist} />
        </div>
    )
}
export default Homepage;