const Home = () => {
  const price = 1000;
  const item = 4;
  return (
    <div>
      <h1>Working with react</h1>
      <p>the cost of 1 product is ${price}</p>
      <p>
        the total price of ${item} is {item * price}
      </p>
    </div>
  );
};

export default Home;
