import img from "../images/luna.jpg";

const JANK_DELAY = 100;

export default function DisplayImage({ filterStyle }) {
  const expensiveRender = () => {
    const start = performance.now();
    // while there is a diff from the start less than that delay
    while (performance.now() - start < JANK_DELAY) {}
    return null;
  };

  return (
    <>
      {expensiveRender()}
      <img src={img} alt="Luna" style={{ filter: filterStyle }} />
      <p>Last render: {Date.now()}</p>
    </>
  );
}
