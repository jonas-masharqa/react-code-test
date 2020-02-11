import React from 'react';
import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = () => {
  return (
    <div className='sweet-loading'>
      <BounceLoader css={override} size={70} color={'#64E048'} loading={true} />
    </div>
  );
};

export default Loader;
