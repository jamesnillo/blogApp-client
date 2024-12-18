import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';

export default function AllPosts() {
    const { user } = useContext(UserContext);
    const [blogs, setBlogs] = useState([]);

    // Fetch blogs
    const fetchData = () => {
        fetch('https://blogapp-server-fbcq.onrender.com/posts/all', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("Blogs Data:", data);
            setBlogs(data);
        })
        .catch(err => console.error("Error fetching blogs:", err));
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    // Handle delete blog
    const handleDelete = (blogId) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            fetch(`https://blogapp-server-fbcq.onrender.com/posts/${blogId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log("Blog deleted:", data);
                // Refresh the blog list after deletion
                fetchData();
            })
            .catch(err => console.error("Error deleting blog:", err));
        }
    };

    return (
        <div className="container mt-4">
            <h2>Blogs</h2>
            {blogs.length === 0 ? (
                <p>No Blog has been posted.</p>
            ) : (
                <div className="row">
                    {blogs.map((blog, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{blog.title}</h5>
                                    <p className="card-text">Author: {blog.author}</p>
                                    <p className="card-text">Creation Date: {blog.creationDate}</p>
                                </div>
                                <div className="card-footer text-center">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(blog._id || blog.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
