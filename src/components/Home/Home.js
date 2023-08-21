import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const [isData, setIsData] = useState(false);
  const tree = [1, 2, 3];
  const navigate = useNavigate();
  let i = 1;
  useEffect(() => {
    axios
      .get(
        `http://localhost:9000/book/?name=${search}&status=${status}&page=${currentPage}&limit=3`
      )
      .then((res) => {
        setData(res.data.book);
        setTotalPages(Math.ceil(res.data.count / 3));
        setTimeout(() => {
          setIsData(true);
        }, 2000);
      })
      .catch((error) => {
        console.log("Error from ShowBookList");
      });
  }, [search, currentPage, data]);
  const changeStatus = (e) => {
    setStatus(e.target.value);
  };
  const deleteBook = (id) => {
    axios
      .delete(`http://localhost:9000/book/${id}`)
      .then((res) => {
        // navigate('/');
      })
      .catch((err) => {
        console.log("Error form ShowBookDetails_deleteClick");
      });
  };
  const handleSearchChange = (e) => {
    setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
  };
  const addUser = () => {
    navigate("/register");
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container-fluid bg-gray-700 p-2 px-3">
      <div className="container">
        <form className="form-inline bg-gray-700 my-5 my-lg-0">
          <input
            className="form-control bg-gray-700 my-4 w-25 align-center mr-sm-2"
            value={search}
            // onChange={(e) => setSearch(e.target.value)}
            onChange={e =>handleSearchChange(e)}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />

          <div class="form-group col-md-4">
            <label className=" bg-gray-700 text-white mr-3" for="inputState">State</label>
            <select
              id="inputState"
              className="form-control  text-white bg-gray-700 hover:bg-gray-900"
              value={status}
              onChange={changeStatus}
              name="status"
            >
              <option className="bg-gray-700" value="Available">Select</option>
              <option className="bg-gray-700" value="Available">Available</option>
              <option className="bg-gray-700" value="UnAvailable">UnAvailable</option>
            </select>
          </div>
          <button onClick={addUser} className="btn btn-primary   bg-gray-700 hover:bg-gray-900">
            <i className="fa-solid fa-plus"></i> Add Book
          </button>
        </form>
      </div>
      <table className="table">
        <thead class="bg-gray-900 text-gray-500 hover:bg-gray-900">
          <tr>
            <th class="p-6">Image</th>
            <th class="p-6 text-left">Name</th>
            <th class="p-6 text-left">Price</th>
            <th class="p-6 text-left">Status</th>
            <th class="p-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {isData ? (
            <>
              {data &&
                data.map((d, index) => (
                  <tr class="bg-gray-800 py-2  hover:bg-gray-900">
                    <td class="p-2 px-4">
                      <div class="flex align-items-center">
                        <img
                          class="rounded-full h-24 w-24 object-cover"
                          src={`http://localhost:9000/${d.image}`}
                          alt="unsplash image"
                        />
                      </div>
                    </td>
                    <td class="p-6 align-middle text-left my-4 text-white font-bold text-lg">
                      {d.name}
                    </td>
                    <td class="p-6 text-left my-4 align-middle text-white font-bold text-lg">
                      {d.age}$
                    </td>
                    <td class="p-6 align-middle">
                      <span
                        className={`${
                          d.status == "Available"
                            ? "bg-green-400"
                            : "bg-red-400"
                        } text-gray-50 rounded-md px-4 py-2 my-4`}
                      >
                        {d.status == "Available"
                          ? "available"
                          : "not available"}
                      </span>
                    </td>
                    <td class="p-6 align-middle">
                    <a class="text-white hover:text-red-100 ml-4">
                    <i
                          onClick={() => {
                            deleteBook(d._id);
                          }}
                          class="cursor-pointer material-icons-round   tex hover:text-red-400"
                        >
                          delete_outline
                        </i>
                        <Link  to={`/edit/${d._id}`} >

                        <i
                          class="cursor-pointer material-icons-round  ml-4 tex hover:text-blue-400"
                        >
                          visibility
                        </i>
                        </Link>

                      </a>
                    </td>
                  </tr>
                ))}
            </>
          ) : (
            <>
              {tree.map(() => (
                <tr class="skeleton-row">
                  <td class="skeleton-cell">
                    <div class="animate-pulse rounded-full h-24 w-24 bg-gray-500"></div>
                  </td>
                  <td class="skeleton-cell align-middle">
                    <div  class="animate-pulse h-8 rounded-full w-24 bg-gray-500"></div>
                  </td>
                  <td class="skeleton-cell align-middle">
                    <div class="animate-pulse rounded-full h-8 w-24 bg-gray-500"></div>
                  </td>
                  <td class="skeleton-cell align-middle">
                    <div class="animate-pulse rounded-full h-8 w-24 bg-gray-500"></div>
                  </td>
                  <td class="skeleton-cell align-middle">
                    <div class="animate-pulse rounded-full h-8 w-24 bg-gray-500"></div>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <div className="container my-4 text-center d-flex justify-content-center">
        <nav aria-label="Page navigation example ">
          <ul className="pagination">
            <li
              className={`page-item text-white border-2 ${
                currentPage === 1 ? "disabled" : ""
              }`}
            >
              <button
                className="btn text-white border-2"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from(Array(totalPages), (item, index) => index + 1).map(
              (page) => (
                <li
                  key={page}
                  className={`border-2 text-white page-item ${
                    page === currentPage ? "active" : ""
                  }`}
                >
                  <button
                    className="btn text-white border-2   hover:bg-gray-900"
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              )
            )}
            <li
              className={`page-item text-white btn-gray-200 border-2 ${
                currentPage === totalPages ? "disabled text-white" : ""
              }`}
            >
              <button
                className="btn text-white border-2 btn-gray-200  hover:bg-gray-900"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;

{
  /* <tbody>
                    {
                        data.length ?
                            data && data.map((d) => {
                                return (
                                    <tr key={d._id}>
                                        <th scope="row">{i++}</th>
                                        <td>{d.name}</td>
                                        <td>{d.age}</td>
                                        <td>
                                            <img className='profileImage' src={`http://localhost:9000/${d.image}`} alt="profile" />
                                        </td>
                                        <td>
                                            <label for="inputState">State</label>
                                            <select id="inputState" className="form-control">
                                                <option>{d.status}</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button className='btn btn-danger mx-2' onClick={() => { deleteBook(d._id) }}><i class="fa-solid fa-trash"></i></button>
                                            <Link className='btn btn-primary' to={`/edit/${d._id}`} ><i class="fa-solid fa-eye"></i></Link>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <h2 className='text-center my-3'>
                                No Book Found
                            </h2>
                    }
                </tbody> */
}

{
  /* <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    {Array.from(Array(totalPages), (item, index) => index + 1).map((page) => (
                        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
                        </li>
                    ))}
                </ul>
            </nav> */
}
