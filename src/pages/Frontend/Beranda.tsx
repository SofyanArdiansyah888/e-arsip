import {useEffect} from "react";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Layout from "./Layouts";


export default function Beranda() {
    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];
        body.style.padding = "0";
        body.style.background = "white";
        return () => {
            body.style.background = "#0f172a";
            body.style.padding = "16px";
        };
    }, []);

    return (
        <>
            <Layout>
                <>
                    <Navbar/>
                    <Hero/>
                </>
            </Layout>
        </>
    );
}
