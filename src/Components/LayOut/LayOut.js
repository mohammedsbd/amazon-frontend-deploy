import React from 'react'
import Header from '../Header/Header'
import AmazonFooter from '../Footer/Footer'

function LayOut({children}) {
  return (
    <div>
      <Header />

      {children}
      <AmazonFooter />
    </div>
  );
}

export default LayOut
