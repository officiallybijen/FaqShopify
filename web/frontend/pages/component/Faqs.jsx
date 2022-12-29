import { Fragment, useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useNavigate } from "@shopify/app-bridge-react";
import { mainurl } from "../url";
import { Button, Icon, Modal } from "@shopify/polaris";
import { DuplicateMinor } from "@shopify/polaris-icons";
const Faqs = () => {
    const navigate = useNavigate();
    const [faqs, setFaqs] = useState([]);
    const [links, setLinks] = useState([]);
    const [url, setUrl] = useState(mainurl + "/faq/nerd.store");
    const [refetch, setRefetch] = useState(true);
    //for modal
    const [active, setActive] = useState(false);
    const [tempactive, setTempactive] = useState(false); //temp active
    const [delId, setDelId] = useState(0);
    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setFaqs(data.data.data);
                setLinks(data.data.links);
            });
    }, [refetch, url]);
    const handleDelete = () => {
        const requestOptions = {
            method: "DELETE",
        };
        fetch(mainurl + "/faq/delete/" + delId, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setActive(false);
                setTempactive(true);
                setRefetch(!refetch);
            });
    };
    return (
        <>
            {/* modal for delete confirmation */}
            <Modal
                open={active}
                title="Are you want to delete this FAQ ?"
                onClose={() => {
                    setActive(false);
                }}
                primaryAction={{
                    content: "Yes",
                    onAction: () => handleDelete(),
                }}
                secondaryActions={{
                    content: "No",
                    onAction: () => setActive(false),
                }}
            ></Modal>
            <Modal
                open={tempactive}
                title="The FAQ have been deleted successfully"
                onClose={() => {
                    setTempactive(false);
                }}
                primaryAction={{
                    content: "Yes",
                    onAction: () => setTempactive(false),
                }}
            ></Modal>
            {/* <Modal
                title="FAQ have been deleted successfully."
                open={active}
                onClose={()=>{setActive(false)}}
                primaryAction={{
                    content: "Ok",
                }}
            ></Modal> */}
            {/* <Link to={`/createfaq`}> */}
            <button
                className="btn btn-secondary ms-3 mt-3"
                onClick={() => {
                    navigate("/createfaq");
                }}
            >
                Create new faq
            </button>
            {/* </Link> */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Content Title</th>
                        <th scope="col">Created on</th>
                        <th scope="col">Lastest Update on</th>
                        <th scope="col">Shortcode</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {faqs.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.content_title}</td>
                                    <td>
                                        {new Date(
                                            Date.parse(item.created_at)
                                        ).toLocaleDateString("en-us", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </td>
                                    <td>
                                        {new Date(
                                            Date.parse(item.updated_at)
                                        ).toLocaleDateString("hi-IN", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </td>
                                    <td>
                                        <span className="me-3">{item.shortcode}</span>
                                        <Button
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    item.shortcode
                                                );
                                            }}
                                        >
                                            <Icon
                                                source={DuplicateMinor}
                                                color="highlight"
                                            />
                                        </Button>
                                    </td>
                                    <td>
                                        {/* eye icon */}
                                        {/* temp navigation */}
                                        <a
                                            onClick={() => {
                                                navigate(
                                                    `/faqdetail/${item.id}`
                                                );
                                            }}
                                            className="me-2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                fill="currentColor"
                                                className="bi bi-eye"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                            </svg>
                                        </a>
                                        {/* bin icon */}
                                        <span
                                            onClick={() => {
                                                setDelId(item.id);
                                                setActive(true);
                                            }}
                                            className="text-danger"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                fill="currentColor"
                                                className="bi bi-trash"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path
                                                    fillRule="evenodd"
                                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                />
                                            </svg>
                                        </span>
                                    </td>
                                </tr>
                                {/* <h4>
              <Link to={`/faqdetail/${item.id}`}>{item.content_title}</Link>
              <button
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                Delete
              </button>
            </h4> */}
                            </Fragment>
                        );
                    })}
                </tbody>
            </table>
            {/* start of pagination */}
            <nav aria-label="...">
                <ul className="pagination">
                    {links.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={
                                    item.active
                                        ? "active page-item"
                                        : "page-item"
                                }
                            >
                                <button
                                    className="page-link"
                                    onClick={() => {
                                        setUrl(item.url);
                                    }}
                                >
                                    {ReactHtmlParser(item.label)}
                                </button>
                            </li>
                        );
                    })}
                    {/* <li class="page-item disabled">
            <button class="page-link btn btn-link" href="#" tabindex="-1">
              Previous
            </button>
          </li>
          <li class="page-item">
            <button class="page-link" href="#">
              1
            </button>
          </li>
          <li class="page-item">
            <button class="page-link" href="#">
              Next
            </button>
          </li> */}
                </ul>
            </nav>
            {/* end of pagination */}
        </>
    );
};

export default Faqs;
