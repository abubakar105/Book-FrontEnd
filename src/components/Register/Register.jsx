import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({
        name: "",
        age: ""
    });
    const [status, setStatus] = useState("")
    const navigator = useNavigate()
    const [image, setImage] = useState("");
    const changeStatus = (e) => {
        setStatus(e.target.value)
    }
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const setProfile = (e) => {
        setImage(e.target.files[0])
    }
    const uploadData = (e) => {
        e.preventDefault();
        if (!image || !status || !data.name || !data.age) {
            alert("Please Complete The Form CareFully!");
            return ;
          }
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("age", data.age)
        formData.append("image", image)
        formData.append("status", status)
        console.log(status)
        const config = {
            "Content-Type": "multipart/form-data"
        }
        console.log("DATAAAAAAA", formData.status)
        axios.post('http://localhost:9000/book/', formData, config)
            .then((res) => {
                setData({
                    name: "",
                    age: "",
                    image: ""
                })
            })
            .catch((error) => {
                console.log("error", error)
            })
        navigator('/')
    }

    return (
        <div><div className='container'>
            <div className='row'>
                <div className='col-md-8 m-auto'>
                    <br />
                </div>
                <div className='col-md-8 m-auto'>
                    <h1 className='display-4 text-center'>Add Book</h1>
                    <p className='lead text-center'>Create new book</p>

                    <form onSubmit={uploadData}>
                        <div className='form-group'>
                            <input
                                type='text'
                                placeholder='Title of the Book'
                                name='name'
                                className='form-control'
                                value={data.name}
                                onChange={onChange}
                            />
                        </div>
                        <br />

                        <div className='form-group'>
                            <input
                                type='number'
                                placeholder='Price'
                                name='age'
                                className='form-control'
                                value={data.age}
                                onChange={onChange}
                            />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputState">State</label>
                            <select id="inputState" className="form-control" value={status} onChange={changeStatus} name="status">
                                <option >Select Status</option>
                                <option value="Available">Available</option>
                                <option value="UnAvailable">UnAvailable</option>
                            </select>

                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlFile1">Select Profile picture</label>
                            <input type="file" name='image' onChange={setProfile} class="form-control-file" id="exampleFormControlFile1" />
                        </div>
                        <button type="submit" style={{background:"blue"}} class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Register
