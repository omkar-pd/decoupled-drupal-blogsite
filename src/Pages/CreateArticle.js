import React, { useRef, useState, useEffect } from "react";
import { createArticle } from "../Services/create";
import { useNavigate } from "react-router-dom";
import { fetchTaxonomyTerms } from "../Services/fetchData";

export const CreateArticle = () => {
  const [image, setImage] = useState();
  const [term, SetTerm] = useState();
  const navigate = useNavigate();
  const titleRef = useRef();
  const bodyRef = useRef();
  const summaryRef = useRef();
  const categoryRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      title: titleRef.current.value,
      summary: summaryRef.current.value,
      body: bodyRef.current.value,
      image: image,
      category: categoryRef.current.value,
    };
    const res = await createArticle(data);
    if (res) {
      navigate(`/blog/${res.id}`);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetchTaxonomyTerms();
      SetTerm(res);
    }
    fetchData();
  }, []);

  const onFileUpload = async (e) => {
    const img = e.target.files[0];
    setImage(img);
  };
  return (
    <div className=" lg:w-4/6 mx-auto shadow-lg p-5 mt-20 bg-white">
      <h5 className="text-gray-900 font-bold text-2xl text-center tracking-tight mb-2">
        Create Blog
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
            required
          />
        </div>
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
            required
          ></textarea>
        </div>
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
          />
        </div>
        <div className="my-3 py-3">
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
            onChange={onFileUpload}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="my-3 py-3">
          <label htmlFor="underline_select">Select Category</label>
          <select
            id="underline_select"
            className="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            defaultValue={term && term[0].id}
            ref={categoryRef}
          >
            {term &&
              term.map((item, id) => {
                return (
                  <option key={id} value={item.id}>
                    {item.attributes.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="flex justify-center">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
