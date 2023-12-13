import './advertisemenet.css';

function Advertisement() {

  const backgroundImageStyle = {
    backgroundImage: 'url("apple-adve.jpg")',
  }

  return (
    <div className='adv-container' style={backgroundImageStyle}>
      <h2 className='title'>Premium Apple Reseller</h2>
    </div>
  );
}

export default Advertisement;