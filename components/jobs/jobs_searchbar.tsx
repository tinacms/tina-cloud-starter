import { useRouter } from "next/router";
import { useState } from "react";

const Searchbar = () => {
  const [inputText, setInputText] = useState("");
  const router = useRouter();
  let inputHandler = (e) => {
    setInputText(e.target.value.toLowerCase());
  };
  let submitHandler=() => {
    router.push(`/jobs/job_search/search?q=` + inputText.replace(/ /g,"+"), `/job_search/search?q=` + inputText.replace(/ /g,"+"), { shallow: true })
  };
  
  return (
    <form className="max-w-md mx-auto" onSubmit={submitHandler}>   
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
          <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Jobs..." defaultValue = {router.query.q} onChange={inputHandler} />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Search</button>
      </div>
    </form>
  );
};
export default Searchbar;