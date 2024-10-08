import { getAllArist } from "../CRUD";
import { useState, useEffect } from "react";
import './Style.css';
import Author from "./Author/Author";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
        </>
    )
}
export default Homepage;