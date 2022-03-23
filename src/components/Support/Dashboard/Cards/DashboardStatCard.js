import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselCaption,
    Badge
} from 'reactstrap';
import './DashboardStatCard.css';

const DashboardStatCard = ({ gradient, metrics }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === metrics.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? metrics.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }


    const slides = metrics.map((metric, index) => {
        return (
            <CarouselItem
                className={gradient}
                tag="div"
                key={index}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                <h5 className="float-right mt-1 mr-1"><Badge color="dark">{metric.time}</Badge></h5>

                <CarouselCaption className="content-styles" captionText={metric.stat} captionHeader={metric.count} />
            </CarouselItem>
        );
    });

    return (
        <div>
            <Carousel
                activeIndex={activeIndex}
                ride={'carousel'}
                next={next}
                previous={previous}
            >
                {slides}
            </Carousel>
        </div>
    );
}

export default DashboardStatCard;