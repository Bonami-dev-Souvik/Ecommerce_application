import { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import "./Carousel.scss";

type CarouselProps = {
    images: string[]; 
    interval?: number; 
};

const Home = ({ images, interval = 2000 }: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleShopClick = useCallback(() => {
        navigate('/products');
    }, [navigate]);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(slideInterval);
    }, [images.length, interval]);

    return (
        <div className="carousel">
            <div
                className="carousel-track"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {images.map((image, index) => (
                    <div key={index} className="carousel-slide">
                        <img src={image} alt={`Slide ${index + 1}`} />
                        <div className="carousel-overlay">
                            <button className="shop-now-btn" onClick={handleShopClick}>Shop Now</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="carousel-indicators">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentIndex ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;