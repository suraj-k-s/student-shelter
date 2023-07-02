import "./featured.css";

const Featured = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src="https://wallpaperaccess.com/full/2690549.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Burj Al Arab Jumeirah</h1>
          <h2>Dubai</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://wallpapers.net/maldives-hotel-room-hd-wallpaper/download/5120x2160.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>The Plaza Hotel </h1>
          <h2>New York</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://images.trvl-media.com/lodging/10000000/9790000/9784600/9784580/0114879f_w.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>The Ritz-Carlton</h1>
          <h2>Tokyo</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
