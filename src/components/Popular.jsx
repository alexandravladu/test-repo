import { useEffect, useState } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/react-splide/css';

// the carousel is going to be the Splide, and each component/card will be the splideslide



function Popular() {

const [popular, setPopular] = useState([]);




//Invoke the function and render this component get mounted?
// adding the empty [] so that it's only running when the component is mounted
useEffect(() => {
    getPopular();
},[]);   

//We want random recipes to be displayed and we create an async function as we have data to await for 
// The api key should not be visible when the code is pushed on github, don't forget to kill the server and restart after adding anything in the env file
// function currently being saved up in memory but not invoked 
// we want to store the fetch into the local storage: check if there is anything in local storage. If nothing is there, then we will set it
// if there is something in local storage, then we will set the state to it
// if there is already an item in local storage, I don't want the fetching to happen again, if no item, then fetch everything
const getPopular = async () => {

    const check = localStorage.getItem('popular');

    if(check) {
        setPopular(JSON.parse(check));
    } else {
        const api = await fetch(` https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=6`);
        const data = await api.json(); // gives a json format of the data
        // console.log(data); // check if it's working
        
        localStorage.setItem('popular', JSON.stringify(data.recipes))
        setPopular(data.recipes) // after console log, you see that is an object with recipes
        console.log(data.recipes)
    }
}
// In local storage, you can only save strings, that's why you need to use JSON.stringify you are taking the array of recipes, making it into a string and saving it that way 
// when we are pulling it back (because it already exists in the local storage), we have to use JSON.parse to convert it back from string to array 


// We take the popular from the useState variable and map through each recipe in order to display something on the screen
// In this case, the maximum number for recipes has been set to six in the api variable
// For now it will show the titles of six recipes, and it's meant to be random
// Don't forget to add an id, when checking the object in the browser, you can see that each recipe has an id, there you can pass the key as recipe.id
// return (
//     <div>
        
//       {popular.map((recipe) => {
//         return(
//             <div key={recipe.id}>
//                 <p> {recipe.title}</p>
//             </div>
//         );
//       })}
//     </div>
//   )
// }


return (
    <div>
       
           <Wrapper>
            <h3> Popular this week </h3>
            <Splide options={{ 
                perPage:5,
                arrows: false,
                pagination: false,
                drag: 'free',
                gap: '5rem'
            }}>
            {popular.map((recipe) => {
                return(
                    <SplideSlide key={recipe.id}>
                    <Card>
                        <p> {recipe.title} </p>
                        <img src={recipe.image} alt={recipe.title} />
                        <Gradient />
                    </Card>
                    </SplideSlide>
                )
            })}
            </Splide>
           </Wrapper>
      
    </div>
  )
}


const Wrapper = styled.div`
margin: 4rem 0rem;
`
const Card = styled.div`
min-height: 15rem;
border-radius: 2rem;
overflow:hidden;
position:relative;

img{
    border-radius: 2rem;
    position:absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

p {
    position:absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
}
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));

`




export default Popular;
