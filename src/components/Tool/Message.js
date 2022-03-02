import Svg, { RELOAD } from "../Svg/index.js";
import { code } from "./parametres.js";

function Message({ message, recommencer }) {
    const { text, color } = message;

    function handleClick(e) {
        e.preventDefault();
        recommencer();
    }

    return message.code === code.MUET ? null : (
        <div className={"h1 my-3 text-center alert " + color}>
            {text}
            {message.code === code.FIN_REUSSITE && (
                <button className="ms-4 btn btn-primary" onClick={handleClick}>
                    Recommencer <Svg src={RELOAD} />
                </button>
            )}
        </div>
    );
}

export default Message;
