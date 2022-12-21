import { Modal, Spinner, TextContainer, TextField } from "@shopify/polaris";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mainurl } from "../url";
import CustomCard from "./CustomCard";

function FaqPage() {
    const { id } = useParams();

    const [active, setActive] = useState(false);
    const [msg, setMsg] = useState(""); //modal msg
    const [faq, setFaq] = useState([]);
    const [title, setTitle] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [refetch, setRefetch] = useState(false);
    const [titleModal, setTitleModal] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetch(mainurl + "/faq/getContent/" + id)
            .then((response) => response.json())
            .then((data) => {
                setFaq(data.data);
                console.log(faq);
                setTitle(data.title);
            });
    }, [id, refetch]);

    const updateClicked = () => {
        const senda = JSON.stringify({ content: faq });
        const requestOptions = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: senda,
        };
        fetch(mainurl + "/content/edit/" + id, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setMsg("FAQ have been updated successfully.");
                setActive(true);
            });
    };
    const handleDelete = (id) => {
        const newarr = faq.filter((item) => {
            return item.q_id !== id;
        });
        console.log(newarr);
        setFaq(newarr);
    };
    const handleEdit = () => {
        const data = JSON.stringify({ title: newTitle });
        const requestOptions = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data,
        };
        fetch(mainurl + "/faq/edit/" + id, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    setMsg("Title updated successfully.");
                    setActive(true);
                    setNewTitle("");
                    setRefetch(!refetch);
                }
            });
    };

    return (
        <div className="row container mt-4 m-auto">
            <Modal //general modal for notification
                open={active}
                onClose={() => {
                    setActive(false);
                }}
                title={msg}
                primaryAction={{
                    content: "Ok",
                    onAction: () => setActive(false),
                }}
            ></Modal>

            <Modal //specific modal for title update
                open={titleModal}
                title="Title update"
                onClose={() => {
                    setTitleModal(false);
                }}
                primaryAction={{
                    content: "Yes",
                    onAction: () => {
                        if (newTitle.trim().length === 0) {
                            setMsg("Title fields can't be empty");
                            setTitleModal(false);
                            setActive(true);
                        } else {
                            setTitleModal(false);
                            handleEdit();
                        }
                    },
                }}
                secondaryActions={{
                    content: "No",
                    onAction: () => setTitleModal(false),
                }}
            >
                <Modal.Section>
                    <TextField
                        label="Give a new title to FAQ: "
                        value={newTitle}
                        onChange={(value) => {
                            setNewTitle(value);
                        }}
                        autoComplete="off"
                    />
                </Modal.Section>
            </Modal>
            <h4>
                {title}
                <span>
                    {" "}
                    <span
                        onClick={() => {
                            setTitleModal(true);
                        }}
                        className="text-warning"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                        >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                                fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                        </svg>
                    </span>
                </span>
            </h4>
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
            <div className="row mb-5">
                <div>
                    <button
                        className="btn btn-secondary ms-3"
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
                    <button
                        onClick={() => {
                            updateClicked();
                        }}
                        className="btn btn-success ms-3"
                    >
                        {isLoading && <Spinner size="small" />} Update
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FaqPage;
