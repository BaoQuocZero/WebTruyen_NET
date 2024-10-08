import { getAllArist } from "../CRUD";
import { useState, useEffect } from "react";
import './Style.css';
import Author from "./Author/Author";

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
        <>
            <div>
                <Author
                    listArtist={listArtist}
                    fetchListArtist={fetchListArtist}
                />
            </div>
        </>
    )
}
export default Homepage;