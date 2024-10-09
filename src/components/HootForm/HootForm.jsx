// src/components/HootForm/HootForm.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as hootService from "../../services/hootService";

const HootForm = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    category: "News",
  });

  // <Route path='/hoots/:hootId/edit' element={<HootForm />}/>
  // hootId comes from the route definition ^, the value comees from
  // the url http://localhost:5173/hoots/6706b049e9dc33c45f5d6de6/edit
  const { hootId } = useParams();

  useEffect(() => {
    async function fetchHoot() {
      // hootId comes from the params
      const hootData = await hootService.show(hootId);
      // prefill out the form with the hoot's data
      setFormData(hootData);
    }

    // we'll call fetchHoot, if there is an id in the url
    // <Route path='/hoots/new' element={<HootForm handleAddHoot={handleAddHoot}/>} />
    // ^^^^^^^ if we are createing this is the route
    // <Route path='/hoots/:hootId/edit' element={<HootForm />}/>
    // ^^^^^ if we are editing this is the route

    if (hootId) {
      fetchHoot();
    }
  }, [hootId]);

  const handleChange = (evt) => {
    console.log(evt.target.name);
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("formData", formData);

    if (hootId) {
      // update page
      props.handleUpdateHoot(hootId, formData);
    } else {
      // new page
      props.handleAddHoot(formData);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>{hootId ? "Edit Hoot" : "New Hoot"}</h1>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="text-input">Text</label>
        <textarea
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="News">News</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Television">Television</option>
        </select>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default HootForm;
