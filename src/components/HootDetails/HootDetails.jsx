import { useState, useEffect, useContext } from "react";
import { AuthedUserContext } from "../../App";

import { useParams, Link } from "react-router-dom";

import CommentForm from "../CommentForm/CommentForm";

import * as hootService from "../../services/hootService";

import styles from './HootDetails.module.css'

export default function HootDetails(props) {
  const [hoot, setHoot] = useState(null);

  // USING THE CONTEXT 
  // return the user object into this component without passing props
  // (note props are still basically passsed under the hood)
  // loggedInUser value is the user store in the App.js state
  const loggedInUser = useContext(AuthedUserContext)

  const { hootId } = useParams();
  console.log(hootId, "Hoot ID");

  useEffect(() => {
    async function getHoot() {
      // hootId comes from the params, and thats what are show
      // request needs in order to make the http request to express
      const hootData = await hootService.show(hootId);
      setHoot(hootData);
    }

    getHoot();
  }, [hootId]); // run our useEffect everytime the id in the url changes
  // so we get the hoot that represents that id from the server

  // <Route path='/hoots/:hootId' element={<HootDetails />} />
  // hootId comes from the route ^

  // lift the commentFormData from the comment form
  async function handleAddComment(commentFormData){
	const newHootDoc = await hootService.createComment(hootId, commentFormData)
	setHoot(newHootDoc)
	// // copy the hoot object
	// // selecting the comments property
	// // copying all the comments that are already in the comments property (...hoot.comments)
	// // adding the newCOmment that we recieve as a response from the server to that list
	// setHoot({...hoot, comments: [...hoot.comments, newComment]})
  }

  // check to see if the hoot is loaded
  if (!hoot) return <main>Loading....</main>;

  return (
    <main className={styles.container}>
      <header>
        <p>{hoot.category.toUpperCase()}</p>
        <h1>{hoot.title}</h1>
        <p>{hoot.author.username}</p>

		{/* {hootid is from the params (useParams)} */}
		{hoot.author._id === loggedInUser._id ? <button onClick={() => props.handleDeleteHoot(hootId)}>Delete</button> : ''}
		{hoot.author._id === loggedInUser._id ? <Link to={`/hoots/${hootId}/edit`}>Edit</Link> : ''}
      </header>
      <p>{hoot.text}</p>
      <section>
        <h2>comments</h2>
		<CommentForm handleAddComment={handleAddComment}/>
        {/* {hoot.comments.length === 0 ? <p>There are no comments</p> : (do the map in here for your comments)} */}
        {!hoot.comments.length && <p>There are no comments</p>}

        {hoot.comments.map((comment) => {
          return (
		  	<article key={comment._id}>
				<header>
					<p>{comment.author.username}</p>
				</header>
				<p>{comment.text}</p>
			</article>
			)
        })}
      </section>
    </main>
  );
}
