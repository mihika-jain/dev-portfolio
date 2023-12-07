import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

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
                  <Col style={styles.introTextContainer}>
                    <img
                      src={data?.imageSource2}
                      alt="profile"
                      style={{
                        borderRadius: '10px',
                        width: '500px',
                        height: '360px',
                        marginTop: '20px',
                        marginRight: '40px',
                      }}
                    />
                    <img
                      src={data?.imageSource3}
                      alt="profile"
                      style={{
                        borderRadius: '10px',
                        width: '280px',
                        height: '360px',
                        marginTop: '20px',
                        marginRight: '40px',
                      }}
                    />
                    <img
                      src={data?.imageSource4}
                      alt="profile"
                      style={{
                        borderRadius: '10px',
                        width: '280px',
                        marginTop: '20px',
                        height: '360px',
                      }}
                    />
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
