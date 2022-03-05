import Svg, { RELOAD } from "../Svg/index.js";
import { code } from "./parametres.js";

function Message({ message, recommencer }) {
    const { text, color } = message;
    const messageExiste = message.code !== code.MUET;

    return messageExiste ? (
        <div className={"message h2 my-3 text-center alert " + color}>
            {text}
        </div>
    ) : (
        <div className="message"> </div>
    );
}

export default Message;
