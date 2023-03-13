import styled from "styled-components";
import {motion} from 'framer-motion';
import {Link, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react'


function Cuisine() {

  const [cuisine, setCuisine] = useState([])
  let params = useParams();
  
  //since we want the search to be dynamic depending on the routing and pages created, when the getCuisine function will be invoked, we are going to pass the name for the cuisine
  // we also want the state
  // in order to invoke the useState function, we need useEffect

  const getCuisine = async (name) => {
  const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}&number=8`)
  const recipes = await data.json()
  setCuisine(recipes.results);
};

useEffect(() => {
  getCuisine(params.type)
  console.log(params.type)
}, [params.type]);

  return (
    <Grid>
    {cuisine.map((item) => {
      return(
        <Card key={item.id}>
            <img src={item.image} alt="" />
            <h4> {item.title} </h4>
        </Card>
      )
    })}
    </Grid>
  )
}


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;

`

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }

`
export default Cuisine;


// what useParams does it to allow us to put the keyword from the url, like /cuisine/italian, in this case 'italian' is the keyword
// when params changes, run useEffect again so you can navigate to different pages, since we passed a :type in Pages, we have to add it to the params as well
// now we want to create a different component that can open a new page depending on the recipe you click on in order to view the recipe details