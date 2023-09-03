import * as React from "react";
import { BANNER, IMG_CDN_URL } from "../constants";
import { Carousel, Card, Stack, Button } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";

const OffersCarousel = (props) => {
  const [index, setIndex] = useState(0);
  const [isSlide, setIsSlide] = useState(true);
  const firstFlag = useRef(true);
  console.log(props);
  useEffect(() => {
    firstFlag.current = true;
    if (props.cards) {
      test("");
    }
  }, [props.cards]);

  const test = (event) => {
    console.log(index + 2, props.cards?.info.length);
    if (!firstFlag) {
      setIndex((index) => index + 3);
    } else {
      firstFlag.current = false;
    }
    if (index + 2 >= props.cards?.info.length) {
      setIsSlide(() => false);
    }
  };

  if (!props) return loadingHeader;

  const loadingHeader = (
    <>
      <h1>Loading...</h1>
    </>
  );

  const carouselHeader = (
    <>
      {props.cards && props.id === BANNER && (
        <Carousel
          style={{ height: 245, backgroundColor: "coral" }}
          indicators={false}
          interval={null}
          onSelect={test}
          controls={isSlide}
        >
          {props.cards.info.map((card) => (
            <Carousel.Item style={{ height: 500 }} key={card.id}>
              {console.log(index)}
              <Stack
                direction="horizontal"
                className="h-50 justify-content-center align-items-center"
                gap={3}
              >
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <img
                      src={IMG_CDN_URL + props.cards?.info[index].imageId}
                      className="d-block w-100"
                      alt={props.cards?.info[index].accessibility.altText}
                    />
                  </Card.Body>
                </Card>

                {index + 1 < props.cards?.info.length && (
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <img
                        src={IMG_CDN_URL + props.cards?.info[index + 1].imageId}
                        className="d-block w-100"
                        alt={props.cards?.info[index + 1].accessibility.altText}
                      />
                    </Card.Body>
                  </Card>
                )}

                {index + 2 < props.cards?.info.length && (
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <img
                        src={IMG_CDN_URL + props.cards?.info[index + 2].imageId}
                        className="d-block w-100"
                        alt={props.cards?.info[index + 2].accessibility.altText}
                      />
                    </Card.Body>
                  </Card>
                )}
              </Stack>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );

  return carouselHeader;
};

export default OffersCarousel;
