import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from "../../fireBaseConfig"
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Update = () => {
    const { id } = useParams();
    const [data, setData] = useState({ name: '', age: '', image: null, status: '' });
    let navigate = useNavigate();
    useEffect(() => {
        axios.get(`https://lucky-bathing-suit-cow.cyclic.cloud/book/${id}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleImageChange = (e) => {
        setData({ ...data, image: e.target.files[0] });
    };

    const particlesInit = async (main) => {
  
      // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadFull(main);
    };
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const changeStatus = (e) => {
        setData({ ...data, status: e.target.value });

    }
  //   const handleSubmit = (e) => {
  //       e.preventDefault();
  //       // const formData = new FormData();
  //       // formData.append('name', data.name);
  //       // formData.append('age', data.age);
  //       // formData.append('image', data.image);
  //       // formData.append("status", data.status)
      
  // const formData={
  //   name:data.name,
  //   age:data.age,
  //   image:data.image,
  //   status:data.status,
  // }

  //       axios.patch(`http://localhost:9000/book/${id}`, formData)
  //           .then(res => {
  //               console.log(res.data);
  //               navigate('/')// navigate back to Home component
  //           })
  //           .catch(err => console.log(err));
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        name: data.name,
        age: data.age,
        image: data.image,
        status: data.status,
    };

    try {
        const response = await axios.get(`https://lucky-bathing-suit-cow.cyclic.cloud/book/${id}`);
        const oldFormData = response.data; // Assuming the response contains the existing data including the image URL

        // Compare old and new image URLs
        if (formData.image !== oldFormData.image) {
            const storageRef = ref(storage, `/${formData.image}`);
            const uploadTask = uploadBytesResumable(storageRef, formData.image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    // You can update a progress state if needed
                },
                (err) => {
                    console.log(err);
                },
                async () => {
                    try {
                        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                        const updatedFormData = { ...formData, image: imageUrl };

                        // Update the database with the new data
                        const patchResponse = await axios.patch(`https://lucky-bathing-suit-cow.cyclic.cloud/book/${id}`, updatedFormData);
                        navigate('/');
                    } catch (error) {
                        console.log("Error:", error);
                    }
                }
            );
        } else {
            // No image change, update the database without uploading the image
            const patchResponse = await axios.patch(`https://lucky-bathing-suit-cow.cyclic.cloud/book/${id}`, formData);
            navigate('/');
        }
    } catch (error) {
        console.log("Error:", error);
    }
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
        <motion.div  variants={childVariants} initial="initial" animate="final" className="fluid-container bg-neural-200 d-flex align-items-center justify-center  h-screen">
      <div style={{border:"2px solid #007BFF",boxShadow: "0 3px 10px rgb(0.3 0.3 0 / 0.9)"}} className="w-2/3 my-9 py-3 rounded-xl shadow-xl bg-gray-700 border-2">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
          </div>
          <div className="col-md-8 m-auto">
            <h1 style={{fontSize:"25px"}} className="text-lg text-gray-300 font-bold text-center mb-6">ADD BOOK</h1>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Book"
                  name="name"
                  className="form-control text-white bg-gray-700 focus:bg-gray-700"
                  value={data.name} onChange={handleChange} 
                />
              </div>
              <br />

              <div className="form-group">
                <input
                  type="number"
                  placeholder="Price"
                  name="age"
                  className="form-control  text-white bg-gray-700 focus:bg-gray-700"
                  value={data.age} onChange={handleChange} 
                />
              </div>
              <div class="form-group col-md-4">
                <label  className="font-bold text-lg text-gray-200" for="inputState">STATUS</label>
                <select
                  id="inputState"
                  className="form-control  text-white bg-gray-700 focus:bg-gray-700"
                  value={data.status} onChange={changeStatus} 
                  name="status"
                >
                  <option className=" text-white bg-gray-700 text-gray-200 focus:bg-gray-700">Select Status</option>
                  <option value="Available">Available</option>
                  <option value="UnAvailable">UnAvailable</option>
                </select>
              </div>
              <div class="form-group">
                <label className="font-bold text-gray-200 text-lg" for="exampleFormControlFile1">
                  Select Profile picture
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}                   class="form-control-file text-gray-200 font-bold text-lg"
                  id="exampleFormControlFile1"
                />
              </div>
              <button
                type="submit"
                // style={{ background: "blue" }}
                class="btn btn-primary  bg-gray-700 hover:bg-gray-900 active:bg-gray-900"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
        // <div>
        //     <div className="container">
        //         <div className="row">
        //             <div className="col-md-6 offset-md-3">
        //                 <form onSubmit={handleSubmit}>
        //                     <div className="form-group">
        //                         <label htmlFor="name">Name:</label>
        //                         <input type="text" className="form-control" id="name" name="name" value={data.name} onChange={handleChange} required />
        //                     </div>
        //                     <div className="form-group">
        //                         <label htmlFor="age">Age:</label>
        //                         <input type="number" className="form-control" id="age" name="age" value={data.age} onChange={handleChange} required />
        //                     </div>
        //                     <div class="form-group col-md-4">
        //                         <label for="inputState">State</label>
        //                         <select id="inputState" className="form-control" value={data.status} onChange={changeStatus} name="status">
        //                             <option value="Available">Available</option>
        //                             <option value="UnAvailable">UnAvailable</option>
        //                         </select>

        //                     </div>
        //                     <div className="form-group">
        //                         <label htmlFor="image">Profile Image:</label>
        //                         <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} />
        //                     </div>
        //                     <button type="submit" className="btn btn-primary">Update Book</button>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        
      </>
    );
};

export default Update;
