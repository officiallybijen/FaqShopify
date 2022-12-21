import { Modal } from "@shopify/polaris";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CustomCard = ({
    q_id,
    faq,
    setFaq,
    question,
    answer,
    index,
    handleDelete,
}) => {
    const [que, setQue] = useState(question);
    const [ans, setAns] = useState(answer);
    const [active, setActive] = useState(false);
    useEffect(() => {
        setQue(question);
    }, [question]);
    useEffect(() => {
        setAns(answer);
    }, [answer]);
    const updateQuestion = (value) => {
        const newdata = faq.map((item) => {
            if (item.q_id === q_id) {
                item.question = que;
            }
            return item;
        });
        console.log(newdata);
        setFaq(newdata);
    };
    const updateAnswer = (value) => {
        const newdata = faq.map((item) => {
            if (item.q_id === q_id) {
                item.answer = ans;
            }
            return item;
        });
        console.log(newdata);
        setFaq(newdata);
    };

    return (
        <div class="col-sm-6 mb-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Question {index + 1}: </h5>
                    <form>
                        <div class="mb-3">
                            <label
                                for="exampleInputEmail1"
                                className="form-label"
                            >
                                Question
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={que}
                                onChange={(value) => {
                                    setQue(value.target.value);
                                }}
                                onBlur={() => {
                                    updateQuestion();
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                for="exampleInputPassword1"
                                className="form-label"
                            >
                                Answer
                            </label>
                            <ReactQuill
                                theme="snow"
                                value={ans}
                                className="quill-answer"
                                onChange={(value) => {
                                    console.log(value);
                                    setAns(value);
                                }}
                                onKeyUp={() => {
                                    updateAnswer();
                                }}
                            />
                        </div>
                    </form>
                    {index !== 0 && (
                        <button
                            onClick={() => {
                                setActive(true);
                                if (res) handleDelete(q_id);
                            }}
                            className="btn btn-danger mb-2"
                            type="button"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>{" "}
            <Modal
                open={active}
                title="Are you want to delete the question ?"
                onClose={() => {
                    setActive(false);
                }}
                primaryAction={{
                    content: "Yes",
                    onAction: () => handleDelete(q_id),
                }}
                secondaryActions={{
                    content: "No",
                    onAction: () => setActive(false),
                }}
            ></Modal>
        </div>
    );
};

export default CustomCard;
