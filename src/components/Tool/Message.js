import Svg, { RELOAD } from "../Svg/index.js";
import { code } from "./parametres.js";

function Message({ message, recommencer }) {
    const { text, color } = message;
    const partieFinie = message.code === code.FIN_REUSSITE;
    const messageExiste = message.code !== code.MUET;
    function handleClick(e) {
        e.preventDefault();
        recommencer();
    }
    function Rejouer() {
        return (
            <button className="ms-4 btn btn-primary" onClick={handleClick}>
                Rejouer <Svg src={RELOAD} />
            </button>
        );
    }

    return messageExiste ? (
        <div className={"message h2 my-3 text-center alert " + color}>
            {text}
            {partieFinie && <Rejouer />}
        </div>
    ) : (
        <div className="message"> </div>
    );
}

export default Message;
