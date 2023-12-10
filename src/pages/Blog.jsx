import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function Blog() {
  const [url, setUrl] = useState("https://delightapi.ruby2d3dslotgame.monster/api/admin/blog-posts");
  let { data: blogs, page: links, loading, error } = useFetch(url);
//   console.log(localStorage.getItem('token'));

  return (
    <>
      {error && <div>{error}</div>}
      {loading && (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
        <div className='container my-3'>
          <div className="row">
          {blogs && blogs.map(blog => (
            <div className="col-md-4 mb-3" key={blog.id}>
              <div className="card border border-0 shadow">
                    <img src={blog.image} alt="" className="card-img-top" />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                      <p>
                          <i className="fas fa-calendar me-2"></i>
                          {new Date(blog.created_at).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            // hour: 'numeric',
                            // minute: 'numeric',
                            // second: 'numeric',
                            // hour12: true
                          })}
                        </p>
                        <p>
                          <img src={blog.users.profile} width={40} height={40} className='rounded-circle' alt="" />
                          <i className="fas fa-user-circle me-2"></i>
                          {blog.users.name}
                        </p>
                      </div>

                        <h3>{blog.title}</h3>
                        <p>{blog.desc}</p>
                        <div className="d-flex justify-content-between">
                          <div>
                            <button type="button" className="btn position-relative">
                              <i className="fas fa-heart"></i>
                              <span className="position-absolute top-0 start-75 translate-middle badge rounded-pill bg-danger">
                                {blog.likes_count}
                                <span className="visually-hidden">unread messages</span>
                              </span>
                            </button>
                            <button type="button" className="btn position-relative">
                              <i className="fas fa-comment"></i>
                              <span className="position-absolute top-0 start-75 translate-middle badge rounded-pill bg-danger">
                                {blog.comments_count}
                                <span className="visually-hidden">unread messages</span>
                              </span>
                            </button>
                          </div>
                          <div>
                            <Link className='btn btn-sm btn-secondary' to={`/api/blog/`+blog.id}>Read More</Link>
                          </div>
                        </div>
                    </div>
              </div>
            </div>
          ))}
          </div>
          <div className="d-flex justify-content-center">
            {links && links.map(link => (
              <div key={link.id} className='m-1'>
                <button className={`btn btn-sm btn-outline-secondary ${link.active ? 'active' : ''}`} onClick={() => setUrl(link.url)}>
                  {link.label === "&laquo; Previous" ? 'Previous' : link.label === "Next &raquo;" ? 'Next' : link.label}
                </button>
              </div>
            ))}
          </div>
        </div>
    </>
  )
}