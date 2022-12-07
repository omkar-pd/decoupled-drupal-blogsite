import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchDetailedArticle } from "../Services/fetchData";
import { update } from "../Services/update";
import { useNavigate } from "react-router-dom";

export const Update = () => {
  const regex = /(<([^>]+)>)/gi;
  const { id } = useParams();
  const navigate = useNavigate();
  const [detailedBlog, setDetailedBlog] = useState({});
  const titleRef = useRef();
  const bodyRef = useRef();
  const summaryRef = useRef();

  useEffect(() => {
    // eslint-disable-next-line
    function fetchData() {
      fetchDetailedArticle(id).then((res) => {
        setDetailedBlog({
          title: res.data.attributes.title,
          summary: res.data.attributes.body.summary.replace(regex, ""),
          body: res.data.attributes.body.value.replace(regex, ""),
        });
      });
    }
    fetchData();
    // eslint-disable-next-line
  }, [id]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const summary = summaryRef.current ? summaryRef.current.value : "";
    const data = {
      title: titleRef.current.value,
      summary: summary,
      body: bodyRef.current.value,
      id: id,
    };
    const res = await update(data);
    if (res) {
      navigate(`/blog/${res.id}`);
    }
  };
  return (
    <div className=" lg:w-4/6 mx-auto shadow-lg p-5">
      <h5 className="text-gray-900 font-bold text-2xl text-center tracking-tight mb-2">
        Update Blog
      </h5>
      <form onSubmit={onSubmitHandler} className="w-full">
        <div className="my-3 py-3">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ref={titleRef}
            defaultValue={detailedBlog.title}
            required
          />
        </div>
        {detailedBlog.summary && (
          <div className="my-3 py-3">
            <label
              htmlFor="summary"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Blog Summary
            </label>

            <textarea
              id="summary"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write you blog summary..."
              ref={summaryRef}
              defaultValue={detailedBlog.summary}
              required
            ></textarea>
          </div>
        )}
        <div className="my-3 py-3">
          <label
            htmlFor="body"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Blog Body
          </label>
          <textarea
            id="body"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write you blog body..."
            ref={bodyRef}
            required
            defaultValue={detailedBlog.body}
          />
        </div>
        {/* <div className="my-3 py-3">
          <label
            htmlFor="img"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select image:
          </label>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div> */}
        <div className="flex justify-center">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
