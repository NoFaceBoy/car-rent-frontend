import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function AmountInput({ state, range }) {
    const [amount, setAmount] = state;
    const [amountStr, setAmountStr] = useState(amount);

    const [error, setError] = useState(false);

    const checkOnRange = (num) => {

        if(num === range[0]){
            
        }

        return (num <= range[1] && num >= range[0]);
    }

    const callback = (e) => {
        let str = e;
        setAmountStr(str);

        let num = amount;
        if (str.length === 0) {
            setError(true);
        } else {
            let snum = Number.parseInt(str);
            if (Number.isNaN(snum) || !checkOnRange(snum)) {
                setError(true);
            }
            else {
                num = snum;
                setError(false);
            }
        }
        setAmount(num);
    };


    return (
        <div className="d-inline-flex">
            <Button variant="outline-primary" style={{ width: "2.5rem" }} onClick={() => callback(amount - 1)} disabled={amount === range[0]}>-</Button>
            <Form.Control className="mx-2" value={amountStr} style={{ width: "5rem" }} isInvalid={error} onChange={(e) => callback(e.target.value)} />
            <Button variant="outline-primary" style={{ width: "2.5rem" }} onClick={() => callback(amount + 1)} disabled={amount === range[1]}>+</Button>
        </div>
    );
}