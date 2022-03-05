import Svg, { RELOAD } from "../Svg/index.js";

function RejouerButton({ rejouer }) {
    function handleClick(e) {
        e.preventDefault();
        rejouer();
    }
    return (
        <div className="d-flex justify-content-center">
            <button className="btn btn-lg btn-success" onClick={handleClick}>
                Rejouer <Svg src={RELOAD} />
            </button>
        </div>
    );
}

export default RejouerButton;
