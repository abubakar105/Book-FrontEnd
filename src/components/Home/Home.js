import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

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

  const getData=async()=>{

    axios
      .get(
        `https://lucky-bathing-suit-cow.cyclic.cloud/book/?name=${search}&status=${status}&page=${currentPage}&limit=3`
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
    }

  useEffect(() => {
    getData()
  }, [ currentPage]);
  
  useEffect(() => {
    setTimeout(()=>{

        getData()
    },1000)
  }, [search,status]);

  const changeStatus = (e) => {
    setStatus(e.target.value);
  };
  const deleteBook = (id) => {
    axios
      .delete(`https://lucky-bathing-suit-cow.cyclic.cloud/book/${id}`)
      .then((res) => {
        // navigate('/');
      })
      .catch((err) => {
        console.log("Error form ShowBookDetails_deleteClick");
      });
      getData()
  };
  const addUser = () => {
    navigate("/register");
  };
  const particlesInit = async (main) => {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const childVariants = {
    initial: {
      opacity: 0,
      y: "50px",
    },
    final: {
      opacity: 1,
      y: "0px",
      transition: {
        duration: 0.5,
        delay: 0.5,
      },
    },
  };
  return (
    <>
      <Particles
  id="tsparticles"
  init={particlesInit}
  options={{
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    particles: {
      number: {
        value: 10,
        density: {
          enable: false,
          value_area: 800,
        },
      },
      color: {
        value: "#0d47a1",
      },
      shape: {
        type: "star",
        options: {
          sides: 5,
        },
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 4,
        random: false,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      rotate: {
        value: 0,
        random: true,
        direction: "clockwise",
        animation: {
          enable: true,
          speed: 5,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 600,
        color: "#ffffff",
        opacity: 0.4,
        width: 2,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: ["grab"],
        },
        onclick: {
          enable: false,
          mode: "bubble",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
    background: {
      color: "#374151",
      image: "",
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover",
    },
  }}
/>
    <motion.div  variants={childVariants} initial="initial" animate="final"

    transition={{ duration: 1 }} className="container bg-gray-700 p-2 px-3">
     
      <div className="container ">
  <form className="flex flex-col  md:flex-row bg-gray-700 my-5 md:my-0">
    <input
      className="form-control  text-white bg-gray-700 focus:bg-gray-700 mt-4 md:my-2 md:w-1/4 align-center md:mr-2"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      type="search"
      placeholder="Search"
      aria-label="Search"
    />

    <div className="form-group col-md-4 text-white bg-gray-700">
      <label className="bg-gray-700 text-white md:mr-3" htmlFor="inputState">
        State
      </label>
      <select
        id="inputState"
        className="form-control text-white bg-gray-700 focus:bg-gray-900"
        value={status}
        onChange={changeStatus}
        name="status"
      >
        <option className="bg-gray-700" value="Available">
          Select
        </option>
        <option className="bg-gray-700" value="Available">
          Available
        </option>
        <option className="bg-gray-700" value="UnAvailable">
          UnAvailable
        </option>
      </select>
    </div>

    <button
      onClick={addUser}
      className="btn btn-primary mt-4 h-12 bg-gray-700 hover:bg-gray-900  md:mt-0"
    >
      <i className="fa-solid fa-plus"></i> Add Book
    </button>
  </form>
</div>


      <div className="responsive-table">
      <table className="table min-w-full">
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
            {
                data.length > 0 
                ? 
                <>
              {data &&
                data.map((d, index) => (
                  <tr class="bg-gray-800 py-2  hover:bg-gray-900">
                    <td class="p-2 px-4">
                      {/* <div class="flex align-items-center"> */}
                        <img
                          data-tw
                          style={{maxWidth: "none"}}
                          class="rounded-full mg h-24 w-24 object-cover"
                          src={d.image}
                          alt="unsplash image"
                        />
                        {/* {d.image} */}
                      {/* </div> */}
                    </td>
                    <td class="p-6 align-middle text-left my-4 text-white font-bold text-lg">
                      {d.name}
                    </td>
                    <td class="p-6 text-left my-4 align-middle text-white font-bold text-lg">
                      {d.age}$
                    </td>
                    <td class="p-6 align-middle">
                      <p
                        className={`${
                          d.status == "Available"
                            ? "bg-green-400"
                            : "bg-red-400"
                        } text-gray-50 text-center rounded-md px-4 py-2 my-4`}
                      >
                        {d.status == "Available"
                          ? "available"
                          : "not available"}
                      </p>
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
                :
                <h1 className="font-bold text-center p-4 text-align-center  text-white text-xl align-middle">No Books AvailAble</h1>
          }
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
      </div>
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
    </motion.div>
    </>
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
