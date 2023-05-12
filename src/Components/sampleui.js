import React, { useState, useEffect } from "react";
import "./sampleui.css";
import axios from "axios";

const Sampleui = () => {
  const [data, setData] = useState([]);
  const [searchdata, setSearchData] = useState(data);
  useEffect(
    function () {
      axios
        .get("https://jsonblob.com/api/jsonBlob/1106442376251195392")
        .then((res) => {
          console.log(res.data);
          setData(res.data.products);
        });
    },
    [data, searchdata]
  );
  const searchBrand = (e) => {
    const filterBySearch = data.filter((item) => {
      if (item.brand.toLowerCase().includes(e.target.value.toLowerCase())) {
        return item;
      }
    });
    setSearchData(filterBySearch);
  };

  const sortPrice = (i) => {
    const sortedData = data.sort((a, b) => {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    });
    setData(sortedData);
    setSearchData(sortedData);
    console.log("sortedData", data);
  };

  const sortPriceReverse = () => {
    const sortedData = data.sort((a, b) => {
      if (a.price > b.price) {
        return -1;
      }
      if (a.price < b.price) {
        return 1;
      }
      return 0;
    });
    setData(sortedData);
    setSearchData(sortedData);
    console.log("sortPriceReverse", data);
  };
  const minMaxSorting = () => {
    const filteredShoes = data.filter((shoe) => shoe.price > 800);
    setData(filteredShoes);
    setSearchData(filteredShoes);
  };

  return (
    <div className="full-page">
      <div className="left-section">
        <h2>Filters</h2>
        <h5>PRICE</h5>
        <div>
          <select onChange={minMaxSorting}>
            <option>Min</option>
            <option>100</option>
          </select>
          <select onChange={minMaxSorting}>
            <option>Max</option>
            <option>10000</option>
          </select>
        </div>
        <div>
          <h5>BRAND</h5>
          <input
            type="text"
            placeholder="Search brand"
            onChange={(e) => searchBrand(e)}
          />
        </div>
      </div>
      <div className="right-section">
        <h2>Showing 66 results for "shoes"</h2>
        <div className="sort">
          <p>Sort By</p>
          <p>Relevance</p>
          <p onClick={sortPrice} style={{ cursor: "pointer" }}>
            Price-Low to High
          </p>
          <p onClick={sortPriceReverse} style={{ cursor: "pointer" }}>
            Price-High to Low
          </p>
        </div>
        <div className="searched-iteam">
          {searchdata.length > 0
            ? searchdata.map((info) => (
                <div key={info.id} style={{ margin: "10px" }}>
                  <img className="data-img" src={info.thumbnail} alt="no_img" />
                  <p style={{ margin: "8px" }}>{info.title}</p>
                  <p className="rate">{info.rating.toFixed(1)}</p>
                  <div className="all-price">
                    <p>&#8377;{info.price}</p>
                    <del className="old-price">&#8377;{info.originalPrice}</del>
                    <p style={{ color: "green" }}>
                      {info.discountPercentage}% Off
                    </p>
                  </div>
                </div>
              ))
            : data.map((info) => (
                <div key={info.id} style={{ margin: "10px" }}>
                  <img className="data-img" src={info.thumbnail} alt="no_img" />
                  <p style={{ margin: "8px" }}>{info.title}</p>
                  <p className="rate">{info.rating.toFixed(1)}</p>
                  <div className="all-price">
                    <p>&#8377;{info.price}</p>
                    <del className="old-price">&#8377;{info.originalPrice}</del>
                    <p style={{ color: "green" }}>
                      {info.discountPercentage}% Off
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Sampleui;
