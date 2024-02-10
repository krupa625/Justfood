import React from 'react';

const Crouser = () => {
    return (
        <>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner" id="crousel" style={{ maxHeight: "50vh" }}>
                    <div className='carousel-caption' style={{ zIndex: "10" }}>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success text-white" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x400/?burger" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "cover", maxHeight: "100%", maxWidth: "100%" }}  />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x400/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "cover", maxHeight: "100%", maxWidth: "100%" }}  />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x400/?pasta" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "cover", maxHeight: "100%", maxWidth: "100%" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Crouser;
