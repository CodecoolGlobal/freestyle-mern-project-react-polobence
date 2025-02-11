import "./NavButtons.css";

function NavButtons({ onStepPrev, onStepNext, page }) {
  return (
    <div className="nav-buttons">
      <button onClick={() => onStepPrev(page)}>Previous</button>
      <button onClick={() => onStepNext(page)}>Next</button>
      <div>Current page: {page}</div>
    </div>
  );
}

export default NavButtons;
