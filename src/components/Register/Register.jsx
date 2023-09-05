import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from "../../fireBaseConfig"
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    age: "",
  });
  const [status, setStatus] = useState("");
  const navigator = useNavigate();
  const [image, setImage] = useState("");
  const changeStatus = (e) => {
    setStatus(e.target.value);
  };
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };
  


const uploadData = (e) => {
  e.preventDefault();
  if (!image || !status || !data.name || !data.age) {
    alert("Please Complete The Form CareFully!");
    return;
  }
  
  const formData={
    name:data.name,
    age:data.age,
    image:image,
    status:status,
  }

  // console.log("IMGAEEEEEEEEEE",formData.image.name)
  const storageRef = ref(storage, `/${formData.image.name}`);
  const uploadTask = uploadBytesResumable(storageRef, formData.image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (err) => {
      console.log(err);
    },
    async () => {
      try {
        
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        const updatedFormData = { ...formData,image: imageUrl };

        const response = await axios.post(
          "https://lucky-bathing-suit-cow.cyclic.cloud/book/",
          updatedFormData
        );
        setData({
          ...data,
          name: "",
          age:""
        });
        setImage("")
        setStatus("")
        navigator("/")

      } catch (error) {
        console.log("Error:", error);
      }
    }
  );
  // window.location.reload();
};

const particlesInit = async (main) => {

  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  // starting from v2 you can add only the features you need reducing the bundle size
  await loadFull(main);
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

            <form onSubmit={uploadData}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Book"
                  name="name"
                  className="form-control text-white bg-gray-700 focus:bg-gray-700"
                  value={data.name}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className="form-group">
                <input
                  type="number"
                  placeholder="Price"
                  name="age"
                  className="form-control  text-white bg-gray-700 focus:bg-gray-700"
                  value={data.age}
                  onChange={onChange}
                />
              </div>
              <div class="form-group col-md-4">
                <label  className="font-bold text-lg text-gray-200" for="inputState">STATUS</label>
                <select
                  id="inputState"
                  className="form-control  text-white bg-gray-700 focus:bg-gray-700"
                  value={status}
                  onChange={changeStatus}
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
                  onChange={setProfile}
                  class="form-control-file text-gray-200 font-bold text-lg"
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
    </>

  );
};

export default Register;
