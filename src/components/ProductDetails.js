import React, {useEffect, useState} from 'react';

import './css/ProductDisplay.css';

function ProductDetails(props) {
  const {products} = props;

  let product = products.find((p) => p.name === props.match.params.name);

  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    for (let i = 0; i < product.photos.length; i++) {
      let imgToChange = document.getElementsByClassName('display-photos')[i];
      let dotToChange = document.getElementsByClassName('nav-dot')[i];
      if (i === currentImg) {
        imgToChange.style.display = 'block';
        dotToChange.style.backgroundColor = 'var(--black)';
      } else {
        imgToChange.style.display = 'none';
        dotToChange.style.backgroundColor = 'var(--dot-default)';
      }
    }

    console.log(currentImg);
  }, [currentImg]);

  return (
    <div id="product-info-display">
      <div id="product-info-card">
        {product ? (
          <>
            {' '}
            <h1>{product.name}</h1>
            {/* image slideshow container */}
            <div id="product-image-display">
              <div
                id="prev-btn"
                onClick={() =>
                  setCurrentImg(
                    currentImg === 0
                      ? product.photos.length - 1
                      : currentImg - 1
                  )
                }
              >
                <span>&#10094;</span>
              </div>
              {product.photos.map((img, i) => (
                <div id={`photo${i}`} className="display-photos">
                  <img src={img.photo_url}></img>
                </div>
              ))}
              {/* next and prev arrows */}
              <div
                id="next-btn"
                onClick={() =>
                  setCurrentImg(
                    currentImg === product.photos.length - 1
                      ? 0
                      : currentImg + 1
                  )
                }
              >
                <span>&#10095;</span>
              </div>
            </div>
            <div id="dots-div">
              {product.photos.map((_, i) => (
                <span
                  className="nav-dot"
                  // code for hovering over dots; I couldn't get this to work in the css file
                  onMouseOver={() =>
                    (document.getElementsByClassName('nav-dot')[
                      i
                    ].style.backgroundColor = 'var(--black)')
                  }
                  onMouseOut={() => {
                    if (currentImg !== i) {
                      document.getElementsByClassName('nav-dot')[
                        i
                      ].style.backgroundColor = 'var(--dot-default)';
                    }
                  }}
                  onClick={() => setCurrentImg(i)}
                ></span>
              ))}
            </div>{' '}
            <div id="product-info-display-description">
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <p>Location: {product.location}</p>
              <p>{product.datesOpen ? `Open ${product.datesOpen}` : ''}</p>
              <p>
                {product.hours ? `Hours of Operation: ${product.hours}` : ''}
              </p>
              <p>Owned by: {product.creator.displayname}</p>
              <p>
                For more information, contact {product.creator.displayname} at{' '}
                {product.creator.email}
              </p>
            </div>
          </>
        ) : (
          <h1>Please update search criteria</h1>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
