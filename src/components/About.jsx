import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/imageGallery.css';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const images = [
    {
      original: data?.imageSource8,
      thumbnail: data?.imageSource8,
    },
    {
      original: data?.imageSource2,
      thumbnail: data?.imageSource2,
    },
    {
      original: data?.imageSource3,
      thumbnail: data?.imageSource3,
    },
    {
      original: data?.imageSource4,
      thumbnail: data?.imageSource4,
    },
    {
      original: data?.imageSource5,
      thumbnail: data?.imageSource5,
    },
    {
      original: data?.imageSource6,
      thumbnail: data?.imageSource6,
    },
    {
      original: data?.imageSource7,
      thumbnail: data?.imageSource7,
    },
  ];

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row>
                  <Col style={styles.introTextContainer}>
                    {parseIntro(data.about)}
                  </Col>
                  <Col style={styles.introImageContainer}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={data?.imageSource}
                        alt="profile"
                        style={{
                          borderRadius: '10px',
                          width: '340px',
                          height: '360px',
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  {/* Replace images with the ImageGallery component */}
                  <Col style={styles.introTextContainer}>
                    <div className="custom-image-gallery">
                      <ImageGallery items={images} />
                    </div>
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
