import React from 'react';
// import MyButton from './components/MyButton';
import FeaturedProduct from './FeaturedProduct';
import Button from './Button';

function App({product}) {
    
    return (
        <div>
            <FeaturedProduct product={product} />
            {/* <Button product={product} /> */}
        </div>
    );
}

export default App;
