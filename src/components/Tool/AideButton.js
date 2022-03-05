import Svg, { AIDE } from "../Svg/index.js";

function AideButton({ showAide }) {
    function handleClick(e) {
        e.preventDefault();
        showAide();
    }

    return (
        <div className="d-flex justify-content-end">
            <button
                className="btn btn-primary"
                onClick={handleClick}
                title="Comment utiliser cette application web ?"
            >
                <Svg src={AIDE} />
            </button>
        </div>
    );
}

export default AideButton;
