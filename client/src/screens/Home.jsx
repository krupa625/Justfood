import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';
import '../../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      const response = await axios.post('https://fooddeliverapp.onrender.com', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = response.data;
      setFoodItem(responseData[0]);
      setFoodCat(responseData[1]);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner" id="crousel" style={{ maxHeight: "50vh" }}>
          <div className='carousel-caption' style={{ zIndex: "10" }}>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" aria-label="Search" />
            </form>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900x400/?burger" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "cover", maxHeight: "100%", maxWidth: "100%" }} alt="Burger" />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x400/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "cover", maxHeight: "100%", maxWidth: "100%" }} alt="Pizza" />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x400/?pasta" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "cover", maxHeight: "100%", maxWidth: "100%" }} alt="Pasta" />
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

      <div className="container">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && foodCat.length !== 0 ? (
          foodCat.map((category) => (
            <div className="row m-3" key={category._id}>
              <div className="fs-4 m-3">
                {category.CategoryName}
                <hr />
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                  {foodItem.length !== 0 ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === category.CategoryName &&
                          item.name?.toLowerCase().includes(search?.toLocaleLowerCase())
                      )
                      .map((filteredItem) => (
                        <div key={filteredItem._id} className="col mb-4">
                          <Card
                            foodItem={filteredItem}
                            options={filteredItem.options[0]}
                          />
                        </div>
                      ))
                  ) : (
                    <div>No data </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;
