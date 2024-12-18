import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';

export default function Blogs() {
    const { user } = useContext(UserContext);
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    const fetchBlogDetails = (blogId) => {
        console.log("Fetching blog details for ID:", blogId);
        fetch(`https://blogapp-server-fbcq.onrender.com/posts/specific/${blogId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("Blog Details:", data);
            setSelectedBlog(data);
            setShowModal(true);
        })
        .catch(err => console.error("Error fetching blog details:", err));
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBlog(null);
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
                                        className="btn btn-primary"
                                        onClick={() => fetchBlogDetails(blog._id || blog.id)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && selectedBlog && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedBlog.title}</h5>
                            </div>
                            <div className="modal-body">
                                <p><strong>Author:</strong> {selectedBlog.author}</p>
                                <p><strong>Content:</strong> {selectedBlog.content}</p>
                                <p><strong>Creation Date:</strong> {selectedBlog.creationDate}</p>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
