import { useState } from 'react';

import image1 from '../../assets/img/cig_1.png'
import image2 from '../../assets/img/nuc_2.png'
import image3 from '../../assets/img/bot_3.png'

const imgs = [image1, image2, image3]

function Enemy({count, onClick}) {
  const min = 0;
  const max = imgs.length; 
  let rand = min + (Math.random() * (max-min));
  const [randomImage] = useState(imgs[]);
  return (
    <button onClick={onClick}>
      <Image src={randomImage} alt="Enemy Img"/>
    </button>
  );
}

