import React from 'react'

const AddNewBlog = ({ onSubmit, valueTitle, valueAuthor, valueUrl, onChange }) => {
  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={onSubmit}>
        <div>
          Title:
          <input
            type="text"
            name="newBlogTitle"
            value={valueTitle}
            onChange={onChange}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            name="newBlogAuthor"
            value={valueAuthor}
            onChange={onChange}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            name="newBlogUrl"
            value={valueUrl}
            onChange={onChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}


export default AddNewBlog
