import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Notyf } from 'notyf';

export default function MyBlogs() {
    const notyf = new Notyf();
    const { user } = useContext(UserContext);
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

    const [editingBlog, setEditingBlog] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchData = () => {
        fetch('https://blogapp-server-fbcq.onrender.com/posts/getMyBlogs', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("API Response:", data);
            if (data && Array.isArray(data.blogs)) {
                setBlogs(data.blogs);
            } else {
                setBlogs([]);
                setError("No Blogs posted yet");
            }
        })
        .catch(err => {
            console.error("Error fetching blogs:", err.message);
            setError("Failed to fetch blogs. Please try again later.");
        });
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    const openEditModal = (blog) => {
        setEditingBlog(blog);
        setEditTitle(blog.title);
        setEditContent(blog.content);
        setShowEditModal(true);
    };

    const handleUpdate = () => {
        fetch(`https://blogapp-server-fbcq.onrender.com/posts/${editingBlog._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title: editTitle,
                content: editContent
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("Updated Blog:", data);
            setShowEditModal(false);
            fetchData();
        })
        .catch(err => {
            console.error("Error updating blog:", err.message);
        });
    };

    const handleDelete = (blogId) => {
        fetch(`https://blogapp-server-fbcq.onrender.com/posts/${blogId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(() => {
            notyf.success("Blog deleted");
            fetchData();
        })
        .catch(err => {
            notyf.error("Error deleting blog:", err.message);
        });
    };

    return (
        <div className="container mt-4">
            <h2>My Blogs</h2>

            {error && (
                <div className="alert alert-danger">
                    <p>{error}</p>
                </div>
            )}

            {blogs.length === 0 && !error ? (
                <p>No Blog has been posted.</p>
            ) : (
                <div className="row">
                    {blogs.map((blog, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{blog.title}</h5>
                                    <p className="card-text">Content: {blog.content}</p>
                                    <p className="card-text">Author: {blog.author}</p>
                                    <p className="card-text">Creation Date: {blog.creationDate}</p>
                                </div>
                                <div className="card-footer text-center">
                                    <button 
                                        className="btn btn-primary mr-2"
                                        onClick={() => openEditModal(blog)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(blog._id)} // Delete the blog
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Blog</h5>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Content</label>
                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleUpdate}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
