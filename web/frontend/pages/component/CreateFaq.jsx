import { useNavigate } from "@shopify/app-bridge-react";
import { Modal, Spinner } from "@shopify/polaris";
import { useState } from "react";
import { mainurl } from "../url";
import CustomCard from "./CustomCard";

function CreateFaq() {
    const [faq, setFaq] = useState([{ q_id: 1, question: "", answer: "" }]);
    const [name, setName] = useState("");
    const [active, setActive] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleDelete = (id) => {
        const newarr = faq.filter((item) => {
            return item.q_id !== id;
        });
        console.log(newarr);
        setFaq(newarr);
    };

    const handleSubmit = () => {
        let stop = false;
        if (name.trim().length === 0) {
            alert("name can't be null");
            return null;
        }
        faq.forEach((element) => {
            let exit = false;
            if (exit) return null;
            if (
                element.question.trim().length === 0 ||
                element.answer.trim().length === 0
            ) {
                alert("No field should be left empty");
                exit = true;
                stop = true;
            }
        });
        if (stop) return null;
        setLoading(true);
        const senda = JSON.stringify({
            meta: {
                title: name,
                store_id: "nerd.store",
            },
            data: faq,
        });
        const requestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: senda,
        };
        fetch(mainurl + "/faq", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setActive(true);
                setLoading(false);
            });
    };

    return (
        <>
            <Modal
                open={active}
                onClose={() => {
                    setActive(false);
                }}
                title="FAQ have been successfully created."
                primaryAction={{
                    content: "Ok",
                    onAction: () => navigate("/"),
                }}
            ></Modal>
            <div className="row container m-auto mb-4">
                <div className="col-6">
                    <label>FAQ name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(value) => {
                            setName(value.target.value);
                        }}
                        placeholder="Name of faq"
                    />
                </div>
            </div>
            <div className="row container m-auto">
                <label>FAQ's:</label>

                {faq &&
                    faq.map((item, index) => {
                        return (
                            <CustomCard
                                question={item.question}
                                answer={item.answer}
                                q_id={item.q_id}
                                index={index}
                                faq={faq}
                                setFaq={setFaq}
                                handleDelete={handleDelete}
                            />
                        );
                    })}
                <div className="row">
                    <div>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            {isLoading && <Spinner size="small" />} Submit
                        </button>
                        <button
                            className="btn btn-success ms-3"
                            onClick={() => {
                                setFaq([
                                    ...faq,
                                    {
                                        q_id: faq[faq.length - 1].q_id + 1,
                                        question: "",
                                        answer: "",
                                    },
                                ]); // push and id ??
                            }}
                        >
                            Add a question
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateFaq;
