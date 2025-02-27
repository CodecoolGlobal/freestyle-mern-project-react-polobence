import "./NavButtons.css";

function NavButtons({ onStepPrev, onStepNext, page, totalPage }) {
  return (
    <div className="nav-buttons">
      <button onClick={() => onStepPrev(page)}>Previous</button>
      <button onClick={() => onStepNext(page)}>Next</button>
      <div>Current page: {page}/{totalPage}</div>
    </div>
  );
}

export default NavButtons;
