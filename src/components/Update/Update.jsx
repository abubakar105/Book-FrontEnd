import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const { id } = useParams();
    const [data, setData] = useState({ name: '', age: '', image: null, status: '' });
    let navigate = useNavigate();
    console.log("first", data.status)
    useEffect(() => {
        axios.get(`http://localhost:9000/book/${id}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleImageChange = (e) => {
        setData({ ...data, image: e.target.files[0] });
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const changeStatus = (e) => {
        setData({ ...data, status: e.target.value });

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('age', data.age);
        formData.append('image', data.image);
        formData.append("status", data.status)

        axios.patch(`http://localhost:9000/book/${id}`, formData)
            .then(res => {
                console.log(res.data);
                navigate('/')// navigate back to Home component
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" className="form-control" id="name" name="name" value={data.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Age:</label>
                                <input type="number" className="form-control" id="age" name="age" value={data.age} onChange={handleChange} required />
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputState">State</label>
                                <select id="inputState" className="form-control" value={data.status} onChange={changeStatus} name="status">
                                    <option value="Available">Available</option>
                                    <option value="UnAvailable">UnAvailable</option>
                                </select>

                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Profile Image:</label>
                                <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Update Book</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;
