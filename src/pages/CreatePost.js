import { useState } from 'react';
import { Form,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


import { Notyf } from 'notyf';

export default function AddPost(){

    const notyf = new Notyf();

    const navigate = useNavigate();


    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");

    function createPost(e){

        e.preventDefault();

        let token = localStorage.getItem('token');
        console.log(token);

        fetch('https://blogapp-server-fbcq.onrender.com/posts/',{

            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({

                title: title,
                content: content
            })
        })
        .then(res => res.json())
        .then(data => {

            if (data) {
                
                setTitle("")
                setContent("")

                notyf.success("Post Added")
                navigate("/blogs");
                

            } else {

                notyf.error("Error: Something Went Wrong.")

            }

        })

    }

    return (
            <>
                <h1 className="my-5 text-center">Add Post</h1>
                <Form onSubmit={e => createPost(e)}>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            required
                            value={title}
                            onChange={e => {setTitle(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Content"
                            required
                            value={content}
                            onChange={e => {setContent(e.target.value)}}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="my-5">Submit</Button>
                </Form>
            </>
           

    )


}